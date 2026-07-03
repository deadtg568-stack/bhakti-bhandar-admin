import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Check } from 'lucide-react'
import SiteScaffold from '../components/site/SiteScaffold'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'

function AddToCartBtn({ product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleClick = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <button onClick={handleClick} className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body font-semibold transition-all duration-300 ${
      added
        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
        : 'bg-gold text-ink hover:bg-gold-light'
    }`}>
      {added ? (
        <><Check size={14} /> Added</>
      ) : (
        <><ShoppingBag size={14} /> Order Now</>
      )}
    </button>
  )
}

export default function HawanSamagriPage() {
  return (
    <SiteScaffold>
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <img src="/Hawan.png" alt="" className="absolute inset-0 w-full h-full object-cover object-top" style={{filter: 'brightness(1.15)'}} />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/60 to-ink/90" />
        <div className="relative z-10 text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl md:text-6xl font-heading font-semibold text-text-primary mb-4">
            Hawan <span className="text-gold">Samagri</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-text-secondary font-body">
            Home / <span className="text-gold">Hawan Samagri</span>
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-24">
            <p className="text-gold font-cinzel text-sm tracking-[4px] uppercase mb-3">Pure & Authentic</p>
            <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-text-primary">Our Products</h2>
            <div className="w-16 h-[2px] bg-gold/40 mx-auto mt-4" />
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-ink-secondary/80 border border-gold/10 rounded-xl overflow-hidden hover:border-gold/30 transition-all duration-300 group">
                <div className="h-48 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">{item.name}</h3>
                  <p className="text-text-secondary text-sm font-body mb-3">{item.desc}</p>
                  <p className="text-gold font-heading font-semibold text-xl mb-4">₹ {item.price.toLocaleString('en-IN')}</p>
                  <AddToCartBtn product={item} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SiteScaffold>
  )
}
