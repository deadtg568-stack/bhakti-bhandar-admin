import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, MapPin, Droplets, Trees } from 'lucide-react'
import SiteScaffold from '../components/site/SiteScaffold'

const highlights = [
  {
    icon: BookOpen,
    title: "Miraculous Havan",
    desc: "The famous Mirchi Havan performed here is known for its miraculous results in overcoming legal issues, enemies, and obstacles."
  },
  {
    icon: MapPin,
    title: "Pandava Era",
    desc: "It is believed that the Pandavas performed tapasya here during their agyatavas and received the blessings of victory."
  },
  {
    icon: Droplets,
    title: "Lakhundar River",
    desc: "The temple sits on the banks of the sacred Lakhundar River, whose waters are said to carry divine energy."
  },
  {
    icon: Trees,
    title: "Sacred Trees",
    desc: "Bel leaves, Champa, white Ankada, Amla, Neem and Peepal trees grow together, creating a unique spiritual ecosystem."
  }
]

export default function AboutPage() {
  return (
    <SiteScaffold>
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden pt-20">
         <div
           className="absolute inset-0 bg-contain bg-no-repeat"
           style={{
             backgroundImage: `url('/AboutImage - Copy.png')`,
             backgroundPosition: 'center',
             filter: 'brightness(1.2)'
           }}
         />
         <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/60 to-ink" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-semibold text-text-primary mb-4"
          >
            About <span className="text-gold">Mandir</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary font-body"
          >
            Home / <span className="text-gold">About</span>
          </motion.p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden border border-gold/20">
                 <img
                   src="/Maa.jpg"
                   alt="Temple"
                   className="w-full h-[400px] object-cover"
                 />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gold text-ink px-6 py-3 rounded-xl font-heading font-bold text-lg">
                5000+ Years Old
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-gold font-cinzel text-sm tracking-[4px] uppercase mb-3">
                Ancient Siddha Peeth
              </p>
              <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-text-primary mb-6">
                The Divine Abode of <span className="text-gold">Maa Baglamukhi</span>
              </h2>
              <p className="text-text-secondary font-body leading-relaxed mb-4">
                Located on the banks of the Lakhundar River, the Maa Baglamukhi Temple of Nalkheda
                is not just a temple — it is a Siddha Peeth where sadhana, tantra, and divine
                intervention have been experienced for centuries.
              </p>
              <p className="text-text-secondary font-body leading-relaxed mb-4">
                The temple is believed to be over 5,000 years old, making it one of the three
                mukhya (primary) Baglamukhi Siddha Peethas in the world. The idol itself is
                {' '}<strong className="text-gold-light">Swayambhu</strong> (self-manifested),
                radiating a golden aura that can be felt the moment one enters the inner sanctum.
              </p>
              <p className="text-text-secondary font-body leading-relaxed mb-8">
                What makes Nalkheda unique is the presence of the 'Tri-Shakti' — the divine triad
                of Maa Baglamukhi, Maa Lakshmi, and Maa Saraswati.
              </p>
              <Link
                to="/book-puja"
                className="inline-flex items-center gap-2 bg-gold text-ink px-6 py-3 rounded-full font-heading font-semibold hover:bg-gold-light transition-all"
              >
                Book a Pooja <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-ink-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-gold font-cinzel text-sm tracking-[4px] uppercase mb-3">
              What Makes This Place Special
            </p>
            <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-text-primary">
              Temple Significance
            </h2>
            <div className="w-16 h-[2px] bg-gold/40 mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-ink border border-gold/10 rounded-xl p-6 text-center hover:border-gold/30 transition-all duration-300 group"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/10 group-hover:scale-110 transition-all duration-300">
                    <Icon size={28} className="text-gold" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm font-body leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-gold font-cinzel text-sm tracking-[4px] uppercase mb-3">
                Divine Triad
              </p>
              <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-text-primary mb-6">
                Trishakti <span className="text-gold">Virajman</span>
              </h2>
              <p className="text-text-secondary font-body leading-relaxed mb-4">
                The temple is uniquely blessed with the presence of three divine energies:
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  { title: "Maa Baglamukhi", desc: "Provides Stambhan — the power to stop negativity" },
                  { title: "Maa Mahalakshmi", desc: "Provides Vriddhi — growth and prosperity" },
                  { title: "Maa Saraswati", desc: "Provides Buddhi — wisdom and knowledge" }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0" />
                    <div>
                      <strong className="text-gold-light">{item.title}</strong>
                      <p className="text-text-secondary text-sm font-body">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                to="/book-puja"
                className="inline-flex items-center gap-2 bg-gold text-ink px-6 py-3 rounded-full font-heading font-semibold hover:bg-gold-light transition-all"
              >
                Book a Pooja Now <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden border border-gold/20">
                <img
                  src="https://images.unsplash.com/photo-1774020039814-c5bdab09e1cf?w=600&q=80"
                  alt="Puja"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </SiteScaffold>
  )
}
