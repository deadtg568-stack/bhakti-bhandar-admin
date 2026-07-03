import { motion } from 'framer-motion'
import { Calendar, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
}

const CheckCircleIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-ink">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink to-ink-secondary" />

      {/* Ambient Orbs */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(ellipse at 75% 40%, rgba(245,158,11,0.1) 0%, transparent 50%),
          radial-gradient(ellipse at 25% 60%, rgba(245,158,11,0.05) 0%, transparent 40%)
        `,
      }} />

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F59E0B' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Bokeh Effects */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`bokeh-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${4 + Math.random() * 8}px`,
            height: `${4 + Math.random() * 8}px`,
            left: `${10 + Math.random() * 80}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, rgba(245,158,11,${0.1 + Math.random() * 0.2}), transparent)`,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -(15 + Math.random() * 25), 0],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 6 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Ambient Glows */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`glow-${i}`}
          className="absolute w-40 h-40 rounded-full bg-gold/5 blur-[90px]"
          style={{
            left: `${40 + Math.random() * 50}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Full-Height Background Image (aligned right on desktop) */}
      <div className="absolute top-0 right-0 w-full lg:w-[52%] xl:w-[56%] h-full z-0 overflow-hidden pointer-events-none">
        <img
          src="/temple_shrine.png"
          alt="Maa Baglamukhi Temple Shrine"
          className="w-full h-full object-cover object-center opacity-90"
        />
        {/* Mobile dark cover-up overlay */}
        <div className="absolute inset-0 bg-ink/80 lg:hidden z-10" />

        {/* Desktop left-to-right gradient cover-up overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/65 to-transparent hidden lg:block z-10" />

        {/* Top & Bottom gradients to blend edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent to-transparent z-10" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-24">
          {/* Left Column - Content */}
          <div className="max-w-xl text-left">
            {/* Tagline */}
            <motion.div
              variants={itemVariants}
              className="text-gold font-devanagari text-base sm:text-lg tracking-wider mb-2 text-left"
            >
              ॥ जय माँ बगलामुखी ॥
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-devanagari font-bold text-text-primary leading-[1.15] mb-2 text-left"
            >
              श्री माँ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold">
                बगलामुखी पूजा
              </span>
            </motion.h1>

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 my-4 justify-start"
            >
              <div className="h-[1px] w-12 bg-gold/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <div className="h-[1px] w-12 bg-gold/40" />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-text-secondary text-base sm:text-lg font-body leading-relaxed mb-8 text-left max-w-md"
            >
              Experience divine blessings through sacred rituals and spiritual offerings.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-start mb-10"
            >
              <Link
                to="/book-puja"
                className="group relative flex items-center justify-center gap-2.5 bg-gold text-ink px-7 py-3.5 rounded-full font-heading font-semibold text-base overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.35)]"
              >
                <Calendar size={18} />
                Book Puja
              </Link>
              <Link
                to="/about"
                className="flex items-center justify-center gap-2.5 border border-gold/30 text-gold-light px-7 py-3.5 rounded-full font-heading text-base hover:bg-gold/5 hover:border-gold/50 transition-all duration-300"
              >
                <BookOpen size={18} className="text-gold-light" />
                Read More About Maa Baglamukhi
              </Link>
            </motion.div>

            {/* Features/Attributes Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {[
                { label: 'Authentic Temple Rituals' },
                { label: 'Live Darshan Streaming' },
                { label: 'Learn Vedic Chants' },
                { label: 'Divine Blessings & Prosperity' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gold/15 bg-ink/40 backdrop-blur-sm hover:border-gold/30 hover:bg-white/[0.02] transition-all duration-300 text-left"
                >
                  <CheckCircleIcon className="w-5 h-5 text-gold-light shrink-0" />
                  <span className="text-text-secondary font-body text-sm leading-tight">
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Spacer for desktop (image is absolute background on right) */}
          <div className="hidden lg:block h-20" />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-5 h-9 rounded-full border border-white/15 flex items-start justify-center p-1">
          <motion.div
            className="w-1 h-2.5 bg-gold/60 rounded-full"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
