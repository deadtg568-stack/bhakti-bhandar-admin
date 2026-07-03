import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Search } from 'lucide-react'
import { siteContent } from '../../data/content'

export default function GallerySection() {
  const [selected, setSelected] = useState(null)

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
            Visual Journey
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold text-text-primary">
            Photo Gallery
          </h2>
          <div className="w-16 h-[2px] bg-gold/40 mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {siteContent.galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer"
              onClick={() => setSelected(img)}
            >
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="flex items-center justify-between w-full">
                  <p className="text-text-primary text-sm font-body">{img.caption}</p>
                  <Search size={16} className="text-gold" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {selected && (
          <div
            className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button
              className="absolute top-6 right-6 text-text-primary hover:text-gold transition-colors"
              onClick={() => setSelected(null)}
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden border border-gold/20"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selected.src} alt={selected.caption} className="w-full h-auto max-h-[80vh] object-contain" />
              <div className="bg-ink p-4 text-center">
                <p className="text-text-primary font-body">{selected.caption}</p>
                <p className="text-text-secondary text-sm font-body">{selected.category}</p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}
