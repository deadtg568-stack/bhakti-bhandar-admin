import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import SiteScaffold from '../components/site/SiteScaffold'

export default function LiveDarshanPage() {
  return (
    <SiteScaffold>
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1597122582304-97edf3b0ff69?w=1920&q=85')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/60 to-ink" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-semibold text-text-primary mb-4"
          >
            Live <span className="text-gold">Darshan</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary font-body"
          >
            Home / <span className="text-gold">Live Darshan</span>
          </motion.p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-ink-secondary/80 border border-gold/20 rounded-2xl overflow-hidden"
          >
            <div className="relative">
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-body font-semibold">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                LIVE NOW
              </div>
              <div className="aspect-video bg-ink flex items-center justify-center">
                <iframe
                  src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1"
                  title="Live Darshan"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
                Shri Maa Baglamukhi Aarti
              </h2>
              <p className="text-text-secondary text-sm font-body">
                Live from Maa Baglamukhi Siddha Peeth, Nalkheda
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-ink-secondary/80 border border-white/5 rounded-xl p-6"
            >
              <h3 className="text-xl font-heading font-semibold text-gold mb-4 border-b border-white/10 pb-3">
                Aarti Lyrics (आरती)
              </h3>
              <div className="text-text-secondary font-devanagari text-sm leading-relaxed space-y-2 max-h-[300px] overflow-y-auto">
                <p>ॐ जय बगलामुखी माता, जय बगलामुखी माता।</p>
                <p>भक्तों के दुख हरनी, सुख सम्पत्ति दाता॥</p>
                <p>पीताम्बर धारिणी, सुभगा सुखदायिनी।</p>
                <p>शत्रु विनाश करिणी, भव भय हारिणी॥</p>
                <p>ॐ जय बगलामुखी माता, जय बगलामुखी माता॥</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gold/5 border border-gold/20 rounded-xl p-6"
            >
              <h3 className="text-xl font-heading font-semibold text-gold mb-4 border-b border-gold/20 pb-3">
                Aarti Schedule
              </h3>
              <div className="space-y-4">
                {[
                  { name: "Mangla Aarti", time: "06:00 AM" },
                  { name: "Bhog Aarti", time: "12:00 PM" },
                  { name: "Sandhya Aarti", time: "07:30 PM" },
                  { name: "Shayan Aarti", time: "10:00 PM" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-text-primary font-body">{item.name}</span>
                    <span className="text-gold font-heading font-semibold">{item.time}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-gold text-ink px-5 py-2.5 rounded-full text-sm font-heading font-semibold hover:bg-gold-light transition-all"
                >
                  Plan Your Visit <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </SiteScaffold>
  )
}
