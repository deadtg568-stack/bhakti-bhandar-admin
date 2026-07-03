import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { useMusic } from '../../context/MusicContext'

export default function MusicControl() {
  const { isPlaying, isMuted, togglePlay, toggleMute } = useMusic()
  const [showTooltip, setShowTooltip] = useState(false)
  const timeoutRef = useRef(null)

  const handleClick = () => {
    if (isPlaying) {
      toggleMute()
    } else {
      togglePlay()
    }
  }

  const show = () => {
    clearTimeout(timeoutRef.current)
    setShowTooltip(true)
  }

  const hide = () => {
    timeoutRef.current = setTimeout(() => setShowTooltip(false), 300)
  }

  const isActive = isPlaying && !isMuted

  return (
    <div className="relative flex items-center">
      <button
        onClick={handleClick}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group"
        aria-label={isActive ? 'Mute music' : 'Play divine music'}
      >
        <span className={`absolute inset-0 rounded-full transition-all duration-500 ${
          isActive
            ? 'bg-gold/10 border border-gold/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
            : 'bg-white/[0.04] border border-white/[0.08] hover:border-gold/30 hover:bg-gold/5'
        }`} />

        {isActive && (
          <span className="absolute inset-0 rounded-full animate-ping bg-gold/20 opacity-20" style={{ animationDuration: '2.5s' }} />
        )}

        <motion.div
          key={isActive ? 'on' : 'off'}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative z-10"
        >
          {isActive ? (
            <Volume2 size={16} className="text-gold" />
          ) : (
            <VolumeX size={16} className="text-text-secondary group-hover:text-gold transition-colors" />
          )}
        </motion.div>
      </button>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md bg-ink-secondary border border-white/[0.08] text-[10px] font-body text-text-secondary pointer-events-none"
          >
            {isActive ? 'Mute Music' : 'Play Divine Music'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
