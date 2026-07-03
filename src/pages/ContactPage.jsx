import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react'
import SiteScaffold from '../components/site/SiteScaffold'
import Footer from '../components/site/Footer'
import { siteContent } from '../data/content'

const contactCards = [
  {
    icon: Phone,
    title: "Phone Numbers",
    info: siteContent.phone,
    detail: `${siteContent.phoneAlt1} / ${siteContent.phoneAlt2}`,
    href: `tel:${siteContent.phone}`
  },
  {
    icon: Mail,
    title: "Email Address",
    info: siteContent.email,
    detail: "Send us your query anytime",
    href: `mailto:${siteContent.email}`
  },
  {
    icon: MapPin,
    title: "Location",
    info: "Maa Baglamukhi Mandir, Nalkheda",
    detail: "Agar Malwa, Madhya Pradesh"
  },
  {
    icon: Clock,
    title: "Shop Timing",
    info: `Morning: ${siteContent.timings.manglaAarti} - ${siteContent.timings.sandhyaAarti}`,
    detail: `Open all 7 days`
  }
]

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    city: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = `Jai Maa Baglamukhi 🙏\n\n*Name:* ${form.name}\n*City:* ${form.city}\n*Subject:* ${form.subject}\n*Message:* ${form.message}`
    window.open(`https://wa.me/${siteContent.whatsapp}?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <SiteScaffold showFooter={false}>
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1698153210197-5a1027c6c5e8?w=1920&q=85')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/60 to-ink" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-semibold text-text-primary mb-4"
          >
            Contact <span className="text-gold">Us</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary font-body"
          >
            Home / <span className="text-gold">Contact</span>
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactCards.map((card, i) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-ink-secondary/80 border border-gold/10 rounded-xl p-6 text-center hover:border-gold/30 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/10 group-hover:scale-110 transition-all duration-300">
                    <Icon size={24} className="text-gold" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                    {card.title}
                  </h3>
                  {card.href ? (
                    <a href={card.href} className="block text-gold text-sm font-body hover:underline">
                      {card.info}
                    </a>
                  ) : (
                    <p className="text-text-secondary text-sm font-body">{card.info}</p>
                  )}
                  <p className="text-text-secondary/60 text-xs font-body mt-1">{card.detail}</p>
                </motion.div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-ink-secondary/80 border border-gold/10 rounded-2xl p-6 sm:p-8"
            >
              <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
                Send a Message
              </h2>
              <p className="text-text-secondary text-sm font-body mb-8">
                We will get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-ink border border-white/10 rounded-xl px-4 py-3 text-text-primary font-body focus:outline-none focus:border-gold/50 transition-colors"
                      placeholder="Your Name *"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                      className="w-full bg-ink border border-white/10 rounded-xl px-4 py-3 text-text-primary font-body focus:outline-none focus:border-gold/50 transition-colors"
                      placeholder="City / Location *"
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-ink border border-white/10 rounded-xl px-4 py-3 text-text-primary font-body focus:outline-none focus:border-gold/50 transition-colors"
                    placeholder="Subject (e.g., Pooja Enquiry) *"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-ink border border-white/10 rounded-xl px-4 py-3 text-text-primary font-body focus:outline-none focus:border-gold/50 transition-colors resize-none"
                    placeholder="Write your message here... *"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gold text-ink py-4 rounded-xl font-heading font-semibold text-lg hover:bg-gold-light transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                >
                  <Send size={18} />
                  Send on WhatsApp
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl overflow-hidden border border-gold/20 h-[500px]"
            >
              <iframe
                src={siteContent.mapEmbed}
                className="w-full h-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Temple Location"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </SiteScaffold>
  )
}
