import { motion } from 'framer-motion'
import { ShoppingCart, Package, Truck } from 'lucide-react'
import SiteScaffold from '../components/site/SiteScaffold'
import { siteContent } from '../data/content'

const steps = [
  { icon: ShoppingCart, title: "Choose Products", desc: "Browse our collection of hawan samagri, puja items, and spiritual products." },
  { icon: Package, title: "Place Order", desc: "Send us your order list on WhatsApp with your delivery details." },
  { icon: Truck, title: "Doorstep Delivery", desc: "We pack and ship your order within 24 hours anywhere in India." }
]

export default function OnlinePurchasePage() {
  return (
    <SiteScaffold>
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url('https://images.unsplash.com/photo-1661142175513-a5f0871f1ad1?w=1920&q=85')`}} />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/60 to-ink" />
        <div className="relative z-10 text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl md:text-6xl font-heading font-semibold text-text-primary mb-4">
            Online <span className="text-gold">Purchase</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-text-secondary font-body">
            Home / <span className="text-gold">Online Purchase</span>
          </motion.p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-text-primary mb-4">How to Order</h2>
            <p className="text-text-secondary font-body max-w-2xl mx-auto">Simple 3-step process to get authentic hawan samagri delivered to your doorstep.</p>
            <div className="w-16 h-[2px] bg-gold/40 mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                  <div className="relative inline-flex mb-6">
                    <div className="w-20 h-20 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center">
                      <Icon size={32} className="text-gold" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 bg-gold text-ink rounded-full flex items-center justify-center text-xs font-bold font-body">{i + 1}</span>
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">{step.title}</h3>
                  <p className="text-text-secondary text-sm font-body">{step.desc}</p>
                </motion.div>
              )
            })}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-ink-secondary/80 border border-gold/20 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-heading font-semibold text-gold mb-4">Ready to Order?</h3>
            <p className="text-text-secondary font-body mb-6">Send us your requirement on WhatsApp and we'll help you choose the right products.</p>
            <a href={`https://wa.me/${siteContent.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gold text-ink px-6 py-3 rounded-full font-heading font-semibold hover:bg-gold-light transition-all">
              Order on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </SiteScaffold>
  )
}
