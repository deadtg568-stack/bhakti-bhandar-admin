import { motion } from 'framer-motion'

export default function DailyMantraSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink-secondary to-ink" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/5 backdrop-blur-xl border border-gold/20 rounded-2xl p-8 sm:p-12 shadow-[0_0_60px_rgba(245,158,11,0.05)]"
        >
          <p className="text-text-secondary text-sm font-body uppercase tracking-[3px] mb-4">
            Daily Mantra
          </p>
          <h2 className="font-devanagari text-2xl sm:text-3xl md:text-4xl text-gold-light leading-relaxed mb-6">
            ॐ ह्लीं बगलामुखि सर्वदुष्टानां वाचं मुखं पदं स्तम्भय
            जिह्वां कीलय बुद्धिं विनाशय ह्रीं ॐ स्वाहा
          </h2>
          <p className="text-text-secondary text-sm font-body italic">
            — Maa Baglamukhi Mantra for protection, victory, and removal of obstacles
          </p>
        </motion.div>
      </div>
    </section>
  )
}
