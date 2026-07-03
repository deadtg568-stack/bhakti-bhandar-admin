import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Search } from 'lucide-react'
import SiteScaffold from '../components/site/SiteScaffold'
import { siteContent } from '../data/content'

const categories = ['All', 'Temple', 'Pooja', 'Events']

export default function GalleryPage() {
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All'
    ? siteContent.galleryImages
    : siteContent.galleryImages.filter(img => img.category === filter)

  return (
    <SiteScaffold>
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
            Photo <span className="text-gold">Gallery</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary font-body"
          >
            Home / <span className="text-gold">Gallery</span>
          </motion.p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-body transition-all duration-300 ${
                  filter === cat
                    ? 'bg-gold text-ink font-semibold'
                    : 'bg-white/5 text-text-secondary border border-white/10 hover:border-gold/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img, i) => (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
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

          {filtered.length === 0 && (
            <p className="text-center text-text-secondary font-body py-12">
              No images found for this category.
            </p>
          )}
        </div>
      </section>

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
    </SiteScaffold>
  )
}
