import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

const MusicContext = createContext()

const LS_KEY = 'bb_music_muted'

export function MusicProvider({ children }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(() => localStorage.getItem(LS_KEY) === 'true')
  const [volume] = useState(0.4)
  const location = useLocation()
  const fadeIntervalRef = useRef(null)

  const clearFade = () => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current)
      fadeIntervalRef.current = null
    }
  }

  const fadeIn = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    clearFade()
    audio.volume = 0
    audio.play().catch(() => {})
    const target = isMuted ? 0 : volume
    fadeIntervalRef.current = setInterval(() => {
      if (audio.volume < target) {
        audio.volume = Math.min(audio.volume + 0.015, target)
      } else {
        clearFade()
      }
    }, 80)
  }, [volume, isMuted])

  const fadeOut = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    clearFade()
    fadeIntervalRef.current = setInterval(() => {
      if (audio.volume > 0.01) {
        audio.volume = Math.max(audio.volume - 0.02, 0)
      } else {
        audio.volume = 0
        audio.pause()
        clearFade()
      }
    }, 80)
  }, [])

  useEffect(() => {
    const audio = new Audio('/bg-music.mp3')
    audio.loop = true
    audio.volume = 0
    audio.preload = 'auto'
    audioRef.current = audio
    return () => {
      clearFade()
      audio.pause()
      audio.src = ''
    }
  }, [])

  useEffect(() => {
    if (location.pathname === '/' && !isPlaying) {
      const audio = audioRef.current
      if (!audio) return
      fadeIn()
      setIsPlaying(true)
    }
  }, [location.pathname, isPlaying, fadeIn])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    const next = !isMuted
    setIsMuted(next)
    localStorage.setItem(LS_KEY, String(next))
    if (next) {
      clearFade()
      fadeIntervalRef.current = setInterval(() => {
        if (audio.volume > 0.01) {
          audio.volume = Math.max(audio.volume - 0.025, 0)
        } else {
          audio.volume = 0
          clearFade()
        }
      }, 80)
    } else {
      if (!audio.paused) {
        fadeIn()
      } else if (isPlaying) {
        fadeIn()
      }
    }
  }, [isMuted, isPlaying, fadeIn])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      fadeOut()
      setIsPlaying(false)
    } else {
      fadeIn()
      setIsPlaying(true)
    }
  }, [isPlaying, fadeIn, fadeOut])

  return (
    <MusicContext.Provider value={{ isPlaying, isMuted, togglePlay, toggleMute }}>
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  const ctx = useContext(MusicContext)
  if (!ctx) throw new Error('useMusic must be used within MusicProvider')
  return ctx
}
