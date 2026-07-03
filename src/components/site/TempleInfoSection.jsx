import { motion } from 'framer-motion'
import { Clock, Flame, Calendar, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { siteContent } from '../../data/content'

export default function TempleInfoSection() {
  return (
    <section className="py-24 relative">
      <div
        className="absolute inset-0 bg-cover bg-fixed bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1547992039-47e365bcaee7?w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-secondary/95 to-ink/95" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 sm:p-10"
          >
            <h3 className="text-2xl sm:text-3xl font-heading font-semibold text-gold mb-8 border-b border-white/10 pb-4">
              Shop Timings
            </h3>

            <div className="mb-6 text-center">
              <p className="text-text-secondary text-xs sm:text-sm font-body uppercase tracking-wider mb-2">
                Morning Hours
              </p>
              <p className="text-3xl sm:text-4xl font-heading font-semibold text-gold-light">
                {siteContent.timings.open} — {siteContent.timings.close}
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Clock, text: `Open: ${siteContent.timings.open} to ${siteContent.timings.close}` },
                { icon: Calendar, text: 'Open all 7 days' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-text-secondary text-sm font-body">
                  <item.icon size={16} className="text-gold shrink-0" />
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold text-text-primary mb-8">
              Welcome to <span className="text-gold">Nalkheda</span>
            </h2>
            <p className="text-text-secondary font-body leading-relaxed mb-6">
              Maa Baglamukhi Mandir is a spiritual powerhouse located on the banks of the
              Lakhundar River. This ancient temple is one of the most significant
              {' '}<strong className="text-gold-light">Siddha Peeths</strong> for Tantric Sadhana.
            </p>
            <p className="text-text-secondary font-body leading-relaxed mb-8">
              Devotees from across the globe visit here to perform the famous
              {' '}<strong className="text-gold-light">Mirchi Havan</strong> for victory over obstacles,
              legal matters, and spiritual protection.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-gold text-ink px-6 py-3 rounded-full font-heading font-semibold hover:bg-gold-light transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.2)]"
            >
              Read History <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
