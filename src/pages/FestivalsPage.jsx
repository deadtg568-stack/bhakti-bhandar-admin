import { motion } from 'framer-motion'
import { Flame, Crown, Sparkles, Moon } from 'lucide-react'
import SiteScaffold from '../components/site/SiteScaffold'
import { siteContent } from '../data/content'

const iconMap = { Flame, Crown, Sparkles, Moon }

export default function FestivalsPage() {
  return (
    <SiteScaffold>
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1661142175513-a5f0871f1ad1?w=1920&q=85')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/60 to-ink" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-semibold text-text-primary mb-4"
          >
            Festivals & <span className="text-gold">Events</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary font-body"
          >
            Home / <span className="text-gold">Festivals</span>
          </motion.p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-text-primary mb-4">
              Sacred Occasions at the Temple
            </h2>
            <p className="text-text-secondary font-body max-w-2xl mx-auto">
              Celebrate divine festivals at Maa Baglamukhi Siddha Peeth with special rituals, 
              havans, and cultural programs.
            </p>
            <div className="w-16 h-[2px] bg-gold/40 mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {siteContent.festivals.map((fest, i) => {
              const Icon = iconMap[fest.icon] || Sparkles
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-ink-secondary/80 border border-white/5 rounded-xl p-8 flex gap-6 hover:border-gold/20 transition-all duration-300 group"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center shrink-0 group-hover:bg-gold/10 group-hover:scale-110 transition-all duration-300">
                    <Icon size={28} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-text-primary mb-1">
                      {fest.name}
                    </h3>
                    <p className="text-gold text-sm font-body mb-2">{fest.date}</p>
                    <p className="text-text-secondary text-sm font-body leading-relaxed">
                      {fest.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-ink-secondary/80 border border-gold/10 rounded-2xl p-8 sm:p-10 text-center"
          >
            <h3 className="text-2xl font-heading font-semibold text-gold mb-4">
              Plan Your Visit During Festivals
            </h3>
            <p className="text-text-secondary font-body max-w-2xl mx-auto mb-6">
              The temple is beautifully decorated during festivals with special aarti, 
              havan, and prasadam for all devotees. Contact us to know more about 
              upcoming events and special arrangements.
            </p>
            <a
              href={`https://wa.me/${siteContent.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold text-ink px-6 py-3 rounded-full font-heading font-semibold hover:bg-gold-light transition-all"
            >
              Contact Us for Details
            </a>
          </motion.div>
        </div>
      </section>
    </SiteScaffold>
  )
}
