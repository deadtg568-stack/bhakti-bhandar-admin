import { motion } from 'framer-motion'
import { Flame, Info, Sparkles } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const havans = [
  {
    id: '01',
    title: 'Haldi Havan (Yellow Havan)',
    desc: 'The most common and auspicious havan.',
    materials: 'Turmeric, ghee, yellow mustard, chana dal, etc.',
    purpose: 'Protection, success, obstacle removal, general wishes.'
  },
  {
    id: '02',
    title: 'Lal Mirch Havan (Chilli Havan)',
    desc: 'Among the most renowned and powerful tantric havans for defense and shielding against negativity.'
  },
  {
    id: '03',
    title: 'Shatru Stambhan Havan',
    desc: 'Linked directly to Maa Baglamukhi’s stambhana shakti, seeking peace, resolution, and restraint of adversaries.'
  },
  {
    id: '04',
    title: 'Vidya-Vani / Victory Havan',
    desc: 'Perform this sacred ritual to gain clarity of speech, intellect, academic achievement, and absolute triumph.'
  },
  {
    id: '05',
    title: 'Business Growth / Wealth Havan',
    desc: 'For drawing prosperity, wealth, clearing business blockages, and ensuring stable financial progress.'
  },
  {
    id: '06',
    title: 'Graha Shanti & Obstacle Removal Havan',
    desc: 'Often combined with Baglamukhi worship to pacify planetary afflictions and clear karmic hurdles.'
  },
  {
    id: '07',
    title: 'Maha Yajna / Special Ritual Havan',
    desc: 'Large-scale, grand sacred ceremonies conducted by multiple high priests for universal well-being and exceptional desires.'
  }
]

export default function SacredHavanSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-ink">
      {/* Background radial gradient glow representing fire warmth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-gold font-devanagari text-base tracking-widest mb-3 flex items-center justify-center gap-2">
            <span>✦</span> SACRED HAVAN <span>✦</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold text-text-primary mb-4 leading-tight">
            Maa Baglamukhi Havan & Special Rituals
          </h2>
          <p className="text-text-secondary text-base sm:text-lg font-body max-w-2xl mx-auto">
            Traditional Vedic and tantric havans according to diverse spiritual purposes
          </p>
          <div className="w-16 h-[2px] bg-gold/40 mx-auto mt-6" />
        </motion.div>

        {/* Feature Quote Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-ink-secondary/60 border border-gold/15 rounded-3xl p-6 sm:p-8 md:p-10 mb-16 shadow-[0_0_50px_rgba(245,158,11,0.03)] hover:border-gold/30 transition-all duration-500"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 text-center md:text-left">
              <div className="inline-flex p-3 rounded-full bg-gold/5 border border-gold/15 mb-4 text-gold-light">
                <Flame size={24} className="animate-pulse" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading italic font-medium text-gold-light mb-4">
                “Sacred fire — the living heart of every havan”
              </h3>
              <p className="text-text-secondary font-body leading-relaxed max-w-xl">
                Through the sacred fire (Agni), prayers and offerings are directly carried to Maa Baglamukhi. Each havan is a precise blend of Vedic chants, specialized herbs, and focused intention to align your energy with divine protection.
              </p>
            </div>
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/3] rounded-2xl overflow-hidden border border-gold/20 shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                <img
                  src="/sacred_havan.png"
                  alt="Sacred Yajna Fire"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-secondary/80 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Havans Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {havans.map((havan, idx) => {
            const isFullWidth = idx === 6 // Maha Yajna is last, make it full-width or larger on grid
            return (
              <motion.div
                key={havan.id}
                variants={itemVariants}
                className={`group bg-ink-secondary/40 border border-gold/10 rounded-2xl p-6 sm:p-8 hover:border-gold/30 hover:bg-ink-secondary/70 hover:shadow-[0_0_30px_rgba(245,158,11,0.05)] transition-all duration-500 ${
                  isFullWidth ? 'lg:col-span-3 lg:max-w-2xl lg:mx-auto lg:w-full' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="font-cinzel text-xl text-gold/30 group-hover:text-gold/60 transition-colors duration-300">
                    {havan.id}
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 text-gold-light transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    <Sparkles size={16} />
                  </div>
                </div>

                <h4 className="text-xl font-heading font-semibold text-text-primary mb-3">
                  {havan.title}
                </h4>

                <p className="text-text-secondary text-sm sm:text-base font-body leading-relaxed mb-4">
                  {havan.desc}
                </p>

                {/* Specific details for Haldi Havan */}
                {havan.materials && (
                  <div className="space-y-2 mt-4 pt-4 border-t border-gold/10">
                    <div className="text-xs">
                      <span className="text-gold font-medium">Materials: </span>
                      <span className="text-text-secondary font-body">{havan.materials}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-gold font-medium">Purpose: </span>
                      <span className="text-text-secondary font-body">{havan.purpose}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>

        {/* Note Disclaimer Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 flex gap-4 p-5 rounded-2xl border border-gold/15 bg-white/[0.01] max-w-3xl mx-auto items-start"
        >
          <Info className="w-5 h-5 text-gold shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="text-gold font-heading text-sm font-semibold uppercase tracking-wider">
              Please note
            </h5>
            <p className="text-text-secondary font-body text-xs sm:text-sm leading-relaxed">
              Various traditions exist regarding ‘red chilli havan’ and certain other tantric havans. Method and purpose may differ according to temple, lineage and acharya.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
