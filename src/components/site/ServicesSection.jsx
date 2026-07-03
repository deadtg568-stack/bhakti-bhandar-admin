import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Flame, Shirt, Bed, Heart, ArrowRight } from 'lucide-react'
import { siteContent } from '../../data/content'

const iconMap = {
  Flame, Shirt, Bed, Heart
}

export default function ServicesSection() {
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
            Our Services
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold text-text-primary">
            Divine Services
          </h2>
          <div className="w-16 h-[2px] bg-gold/40 mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteContent.services.map((service, i) => {
            const Icon = iconMap[service.icon] || Heart
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-ink-secondary/80 border border-gold/10 rounded-xl p-8 text-center hover:border-gold/40 hover:shadow-[0_0_40px_rgba(245,158,11,0.08)] transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/10 group-hover:border-gold/40 group-hover:scale-110 transition-all duration-300">
                  <Icon size={28} className="text-gold" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-3">
                  {service.title}
                </h3>
                <p className="text-text-secondary text-sm font-body leading-relaxed mb-5">
                  {service.desc}
                </p>
                <Link
                  to={i < 3 ? "/book-puja" : "/donate"}
                  className="inline-flex items-center gap-1 text-gold text-sm font-body font-semibold hover:gap-2 transition-all"
                >
                  {i < 3 ? 'Book Now' : 'Donate Now'} <ArrowRight size={14} />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
