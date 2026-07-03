import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { siteContent } from '../../data/content'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="py-24 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold font-cinzel text-sm tracking-[4px] uppercase mb-3">
            Have Questions?
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold text-text-primary">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-[2px] bg-gold/40 mx-auto mt-4" />
        </motion.div>

        <div className="space-y-3">
          {siteContent.faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-ink-secondary/80 border border-white/5 rounded-xl overflow-hidden hover:border-gold/20 transition-all duration-300"
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-text-primary font-body font-semibold pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-gold shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="px-5 pb-5 text-text-secondary text-sm font-body leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
