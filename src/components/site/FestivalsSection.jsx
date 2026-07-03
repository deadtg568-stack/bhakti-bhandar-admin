import { motion } from 'framer-motion'
import { Flame, Crown, Sparkles, Moon } from 'lucide-react'
import { siteContent } from '../../data/content'

const iconMap = { Flame, Crown, Sparkles, Moon }

export default function FestivalsSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold font-cinzel text-sm tracking-[4px] uppercase mb-3">
            Sacred Occasions
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold text-text-primary">
            Festivals & Events
          </h2>
          <div className="w-16 h-[2px] bg-gold/40 mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteContent.festivals.map((fest, i) => {
            const Icon = iconMap[fest.icon] || Sparkles
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-ink-secondary/80 border border-white/5 rounded-xl p-6 text-center hover:border-gold/20 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-gold" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                  {fest.name}
                </h3>
                <p className="text-gold text-sm font-body mb-2">{fest.date}</p>
                <p className="text-text-secondary text-sm font-body leading-relaxed">
                  {fest.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
