import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import { siteContent } from '../../data/content'
import { useCart } from '../../context/CartContext'
import MusicControl from './MusicControl'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { itemCount, openDrawer } = useCart()

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-ink/90 backdrop-blur-xl shadow-[0_1px_0_rgba(245,158,11,0.1)]' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-heading font-semibold text-gold">
              ॐ
            </span>
            <div className="hidden sm:block">
              <span className="text-lg font-heading font-semibold text-text-primary">
                Bhakti Bhandar
              </span>
              <span className="block text-[10px] tracking-[2px] text-text-secondary uppercase font-body">
                Hawan Samagri & Services
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {siteContent.navLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-body tracking-wider uppercase transition-colors relative group ${
                    isActive ? 'text-gold' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gold transition-all duration-300 ${
                      isActive ? 'w-3/4' : 'w-0 group-hover:w-3/4'
                    }`}
                  />
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <MusicControl />
            <button onClick={openDrawer} className="relative p-2.5 text-text-secondary hover:text-gold transition-colors group">
              <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gold text-ink text-[11px] font-bold rounded-full flex items-center justify-center font-body">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>
            <a href={`tel:${siteContent.phone}`} className="hidden lg:flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold px-3 py-1.5 rounded-full text-xs font-body font-semibold hover:bg-gold hover:text-ink transition-all duration-300">
              <Phone size={12} />
              {siteContent.phone}
            </a>
            <button className="lg:hidden text-text-primary p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-ink/95 backdrop-blur-xl z-40 lg:hidden" onClick={() => setIsOpen(false)}>
          <nav className="flex flex-col items-center justify-center h-full gap-6" onClick={(e) => e.stopPropagation()}>
            {siteContent.navLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl font-heading transition-colors ${
                    isActive ? 'text-gold' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <a
              href={`tel:${siteContent.phone}`}
              className="mt-8 flex items-center gap-2 bg-gold text-ink px-6 py-3 rounded-full text-lg font-semibold"
              onClick={() => setIsOpen(false)}
            >
              <Phone size={18} />
              {siteContent.phone}
            </a>
          </nav>
        </div>
      )}
    </motion.header>
  )
}
