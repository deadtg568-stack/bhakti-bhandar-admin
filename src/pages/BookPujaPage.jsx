import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, MessageCircle, Phone, Mail, MapPin } from 'lucide-react'
import SiteScaffold from '../components/site/SiteScaffold'
import { siteContent } from '../data/content'

export default function BookPujaPage() {
  const [form, setForm] = useState({
    name: '',
    gotra: '',
    phone: '',
    date: '',
    pujaType: '',
    message: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = `Jai Maa Baglamukhi 🙏\n\n*New Pooja Booking*\n\n*Name:* ${form.name}\n*Gotra:* ${form.gotra}\n*Phone:* ${form.phone}\n*Date:* ${form.date}\n*Pooja Type:* ${form.pujaType}\n*Message:* ${form.message}`

    window.open(`https://wa.me/${siteContent.whatsapp}?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <SiteScaffold>
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1774020039814-c5bdab09e1cf?w=1920&q=85')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/60 to-ink" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-semibold text-text-primary mb-4"
          >
            Pooja <span className="text-gold">Booking</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary font-body"
          >
            Home / <span className="text-gold">Pooja Booking</span>
          </motion.p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-ink-secondary/80 border border-gold/10 rounded-2xl p-6 sm:p-8"
              >
                <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
                  Book a Pooja
                </h2>
                <p className="text-text-secondary text-sm font-body mb-8">
                  Fill the form below and we will contact you to confirm your booking.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-text-secondary text-sm font-body mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-ink border border-white/10 rounded-xl px-4 py-3 text-text-primary font-body focus:outline-none focus:border-gold/50 transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-text-secondary text-sm font-body mb-2">Gotra</label>
                      <input
                        type="text"
                        name="gotra"
                        value={form.gotra}
                        onChange={handleChange}
                        className="w-full bg-ink border border-white/10 rounded-xl px-4 py-3 text-text-primary font-body focus:outline-none focus:border-gold/50 transition-colors"
                        placeholder="Your gotra (optional)"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-text-secondary text-sm font-body mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="w-full bg-ink border border-white/10 rounded-xl px-4 py-3 text-text-primary font-body focus:outline-none focus:border-gold/50 transition-colors"
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-text-secondary text-sm font-body mb-2">Preferred Date</label>
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="w-full bg-ink border border-white/10 rounded-xl px-4 py-3 text-text-primary font-body focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-text-secondary text-sm font-body mb-2">Pooja Type *</label>
                    <select
                      name="pujaType"
                      value={form.pujaType}
                      onChange={handleChange}
                      required
                      className="w-full bg-ink border border-white/10 rounded-xl px-4 py-3 text-text-primary font-body focus:outline-none focus:border-gold/50 transition-colors"
                    >
                      <option value="">Select a pooja type</option>
                      {siteContent.pujaTypes.map((type, i) => (
                        <option key={i} value={type} className="bg-ink">{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-text-secondary text-sm font-body mb-2">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-ink border border-white/10 rounded-xl px-4 py-3 text-text-primary font-body focus:outline-none focus:border-gold/50 transition-colors resize-none"
                      placeholder="Any special requirements or messages..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gold text-ink py-4 rounded-xl font-heading font-semibold text-lg hover:bg-gold-light transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                  >
                    <Send size={18} />
                    Book on WhatsApp
                  </button>
                </form>
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-ink-secondary/80 border border-gold/20 rounded-2xl p-6 sm:p-8"
              >
                <h3 className="text-xl font-heading font-semibold text-gold mb-5 border-b border-gold/20 pb-3">
                  Contact Info
                </h3>

                <div className="space-y-3">
                  <a href={`tel:${siteContent.phone}`} className="flex items-center gap-3 text-text-secondary hover:text-gold transition-colors text-sm">
                    <div className="w-10 h-10 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center shrink-0">
                      <Phone size={16} className="text-gold" />
                    </div>
                    <span className="font-body">{siteContent.phone}</span>
                  </a>
                  <a href={`tel:${siteContent.phoneAlt1}`} className="flex items-center gap-3 text-text-secondary hover:text-gold transition-colors text-sm ml-[52px]">
                    <span className="font-body">{siteContent.phoneAlt1}</span>
                  </a>
                  <a href={`tel:${siteContent.phoneAlt2}`} className="flex items-center gap-3 text-text-secondary hover:text-gold transition-colors text-sm ml-[52px]">
                    <span className="font-body">{siteContent.phoneAlt2}</span>
                  </a>
                  <a href={`mailto:${siteContent.email}`} className="flex items-center gap-3 text-text-secondary hover:text-gold transition-colors text-sm">
                    <div className="w-10 h-10 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center shrink-0">
                      <Mail size={16} className="text-gold" />
                    </div>
                    <span className="font-body break-all">{siteContent.email}</span>
                  </a>
                  <div className="flex items-start gap-3 text-text-secondary text-sm">
                    <div className="w-10 h-10 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center shrink-0 mt-1">
                      <MapPin size={16} className="text-gold" />
                    </div>
                    <span className="font-body">{siteContent.address.full}</span>
                  </div>
                </div>

                <h3 className="text-xl font-heading font-semibold text-gold mt-8 mb-4 border-b border-gold/20 pb-3">
                  Temple Services
                </h3>
                <ul className="space-y-2">
                  {[
                    "Daily Aarti",
                    "Mirchi Havan",
                    "Deep Daan",
                    "Tantric Anushthan",
                    "Special Pooja"
                  ].map((service, i) => (
                    <li key={i} className="flex items-center gap-2 text-text-secondary text-sm font-body">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                      {service}
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/${siteContent.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-body font-semibold hover:bg-[#20bd5a] transition-colors"
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </SiteScaffold>
  )
}
