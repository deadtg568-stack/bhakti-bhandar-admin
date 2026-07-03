import { motion } from 'framer-motion'
import { Heart, Shield, Home, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SiteScaffold from '../components/site/SiteScaffold'
import { siteContent } from '../data/content'

const donationOptions = [
  {
    icon: Heart,
    title: "Anna Daan",
    desc: "Support daily food distribution to devotees and the needy at the temple.",
    items: ["Feed 1 person for a day - ₹51", "Feed a family for a day - ₹501", "Sponsor weekly Annadan - ₹3,501"]
  },
  {
    icon: Shield,
    title: "Temple Development",
    desc: "Contribute to the ongoing renovation and beautification of the temple premises.",
    items: ["General donation - any amount", "Sponsor a pillar - ₹1,001", "Sponsor a section - ₹10,001"]
  },
  {
    icon: Home,
    title: "Gau Seva",
    desc: "Help maintain and care for the cows at the temple gaushala.",
    items: ["Feed a cow for a day - ₹101", "Monthly cow care - ₹2,001", "Sponsor a cow annually - ₹11,001"]
  }
]

const bankDetails = {
  bank: "State Bank of India",
  account: "12345678901234",
  ifsc: "SBIN0012345",
  branch: "Nalkheda",
  name: "Maa Baglamukhi Mandir Trust"
}

export default function DonatePage() {
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
            Make a <span className="text-gold">Donation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary font-body"
          >
            Home / <span className="text-gold">Donate</span>
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
            <p className="text-gold font-cinzel text-sm tracking-[4px] uppercase mb-3">
              Support the Temple
            </p>
            <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-text-primary mb-4">
              Your Generosity Matters
            </h2>
            <p className="text-text-secondary font-body max-w-2xl mx-auto">
              Your donations help us maintain the temple, serve devotees, and preserve 
              ancient traditions. Every contribution is deeply appreciated.
            </p>
            <div className="w-16 h-[2px] bg-gold/40 mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {donationOptions.map((option, i) => {
              const Icon = option.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-ink-secondary/80 border border-gold/10 rounded-xl p-6 hover:border-gold/30 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center mb-4">
                    <Icon size={24} className="text-gold" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                    {option.title}
                  </h3>
                  <p className="text-text-secondary text-sm font-body mb-4">
                    {option.desc}
                  </p>
                  <ul className="space-y-2">
                    {option.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-text-secondary text-sm font-body">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-lg mx-auto bg-ink-secondary/80 border border-gold/20 rounded-2xl p-8"
          >
            <h3 className="text-xl font-heading font-semibold text-gold mb-6 text-center">
              Bank Account Details
            </h3>
            <div className="space-y-3">
              {[
                { label: "Account Name", value: bankDetails.name },
                { label: "Bank", value: bankDetails.bank },
                { label: "Account Number", value: bankDetails.account },
                { label: "IFSC Code", value: bankDetails.ifsc },
                { label: "Branch", value: bankDetails.branch }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <span className="text-text-secondary text-sm font-body">{item.label}</span>
                  <span className="text-text-primary text-sm font-body font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-text-secondary font-body mb-4">
              For UPI or other payment methods, please contact us directly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/${siteContent.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold text-ink px-6 py-3 rounded-full font-heading font-semibold hover:bg-gold-light transition-all"
              >
                Donate via WhatsApp
              </a>
              <a
                href={`tel:${siteContent.phone}`}
                className="inline-flex items-center gap-2 border border-white/20 text-text-primary px-6 py-3 rounded-full font-heading font-semibold hover:bg-white/5 transition-all"
              >
                Call for Details
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </SiteScaffold>
  )
}
