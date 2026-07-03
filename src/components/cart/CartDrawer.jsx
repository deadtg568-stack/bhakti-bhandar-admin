import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Trash2, ShoppingBag, Navigation, CreditCard, IndianRupee, Smartphone, Building, Banknote, ChevronLeft, Check } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { siteContent } from '../../data/content'

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

const drawerVariants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { type: 'spring', damping: 30, stiffness: 300 } },
  exit: { x: '100%', transition: { type: 'spring', damping: 30, stiffness: 300 } }
}

function formatPrice(n) {
  return '₹ ' + n.toLocaleString('en-IN')
}

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="flex gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] group"
    >
      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-ink-secondary">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-heading font-semibold text-text-primary truncate">
            {item.name}
          </h4>
          <button
            onClick={() => removeFromCart(item.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-500/20 rounded"
          >
            <Trash2 size={14} className="text-red-400" />
          </button>
        </div>
        <p className="text-gold font-heading font-semibold text-sm mt-1">
          {formatPrice(item.price)}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center border border-white/[0.08] rounded-lg overflow-hidden">
            <button
              onClick={() => item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)}
              className="p-1.5 hover:bg-white/5 transition-colors text-text-secondary hover:text-text-primary disabled:opacity-30"
              disabled={item.quantity <= 1}
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm font-body text-text-primary tabular-nums">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1.5 hover:bg-white/5 transition-colors text-text-secondary hover:text-text-primary"
            >
              <Plus size={14} />
            </button>
          </div>
          <span className="text-xs text-text-secondary/60 ml-auto">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      <div className="w-24 h-24 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center mb-6">
        <ShoppingBag size={40} className="text-gold/40" />
      </div>
      <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
        Your cart is empty
      </h3>
      <p className="text-text-secondary text-sm font-body text-center max-w-xs">
        Add items from our Hawan Samagri collection to get started.
      </p>
      <span className="mt-6 text-4xl text-gold/30">ॐ</span>
    </div>
  )
}

function CheckoutForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    notes: ''
  })
  const [detecting, setDetecting] = useState(false)
  const [locationError, setLocationError] = useState('')

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation not supported')
      return
    }
    setDetecting(true)
    setLocationError('')
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`
          )
          const data = await res.json()
          const addr = data.display_name || `${pos.coords.latitude}, ${pos.coords.longitude}`
          setForm(prev => ({
            ...prev,
            address: addr,
            city: data.address?.city || data.address?.town || data.address?.village || '',
            pincode: data.address?.postcode || ''
          }))
        } catch {
          setForm(prev => ({
            ...prev,
            address: `${pos.coords.latitude}, ${pos.coords.longitude}`
          }))
        }
        setDetecting(false)
      },
      () => {
        setLocationError('Could not detect location. Please enter manually.')
        setDetecting(false)
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  const isFormValid = form.name && form.mobile && form.address && form.city && form.pincode

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isFormValid) return
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        name="name"
        placeholder="Full Name *"
        value={form.name}
        onChange={handleChange}
        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-secondary/40 font-body outline-none focus:border-gold/50 transition-colors"
      />
      <div className="grid grid-cols-2 gap-3">
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number *"
          value={form.mobile}
          onChange={handleChange}
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-secondary/40 font-body outline-none focus:border-gold/50 transition-colors"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-secondary/40 font-body outline-none focus:border-gold/50 transition-colors"
        />
      </div>
      <div className="relative">
        <textarea
          name="address"
          placeholder="Delivery Address / Location *"
          value={form.address}
          onChange={handleChange}
          rows={2}
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-secondary/40 font-body outline-none focus:border-gold/50 transition-colors resize-none"
        />
        <button
          type="button"
          onClick={detectLocation}
          disabled={detecting}
          className="absolute right-2 bottom-2 p-1.5 bg-gold/10 hover:bg-gold/20 rounded-lg transition-colors"
          title="Auto-detect location"
        >
          <Navigation size={16} className={`text-gold ${detecting ? 'animate-spin' : ''}`} />
        </button>
      </div>
      {locationError && (
        <p className="text-red-400 text-xs font-body">{locationError}</p>
      )}
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          name="city"
          placeholder="City *"
          value={form.city}
          onChange={handleChange}
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-secondary/40 font-body outline-none focus:border-gold/50 transition-colors"
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode *"
          value={form.pincode}
          onChange={handleChange}
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-secondary/40 font-body outline-none focus:border-gold/50 transition-colors"
        />
      </div>
      <textarea
        name="notes"
        placeholder="Notes / Instructions (optional)"
        value={form.notes}
        onChange={handleChange}
        rows={2}
        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-secondary/40 font-body outline-none focus:border-gold/50 transition-colors resize-none"
      />
      <button
        type="submit"
        disabled={!isFormValid}
        className="w-full bg-gold text-ink py-3 rounded-xl font-heading font-semibold text-base hover:bg-gold-light transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <IndianRupee size={16} />
        Place Order
      </button>
    </form>
  )
}

const paymentMethods = [
  { id: 'gpay', label: 'Google Pay', icon: Smartphone, desc: 'Pay via GPay UPI' },
  { id: 'phonepe', label: 'PhonePe', icon: Smartphone, desc: 'Pay via PhonePe UPI' },
  { id: 'paytm', label: 'Paytm', icon: Smartphone, desc: 'Pay via Paytm UPI' },
  { id: 'bank', label: 'Bank Transfer', icon: Building, desc: 'Direct bank transfer / UPI ID' },
  { id: 'cod', label: 'Cash on Delivery', icon: Banknote, desc: 'Pay when you receive' }
]

function PaymentMethodStep({ form, total, subtotal, deliveryCharge, items, onBack, onConfirm }) {
  const [selected, setSelected] = useState(null)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-heading font-semibold text-text-primary">
          Select Payment Method
        </h3>
        <button onClick={onBack} className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors">
          <ChevronLeft size={14} /> Change Details
        </button>
      </div>

      <div className="space-y-2">
        {paymentMethods.map(method => {
          const Icon = method.icon
          const isSelected = selected === method.id
          return (
            <button
              key={method.id}
              onClick={() => setSelected(method.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left ${
                isSelected
                  ? 'border-gold/50 bg-gold/5'
                  : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                isSelected ? 'bg-gold/20 text-gold' : 'bg-white/[0.04] text-text-secondary'
              }`}>
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-heading font-semibold text-text-primary">{method.label}</p>
                <p className="text-xs text-text-secondary/60 font-body">{method.desc}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                isSelected ? 'border-gold bg-gold' : 'border-white/20'
              }`}>
                {isSelected && <Check size={12} className="text-ink" />}
              </div>
            </button>
          )
        })}
      </div>

      <div className="border-t border-white/[0.06] pt-3 space-y-2 text-sm font-body">
        <div className="flex justify-between text-text-secondary">
          <span>Total Payable</span>
          <span className="text-gold font-heading font-semibold">{formatPrice(total)}</span>
        </div>
      </div>

      <button
        onClick={() => selected && onConfirm(selected)}
        disabled={!selected}
        className="w-full bg-gold text-ink py-3 rounded-xl font-heading font-semibold text-base hover:bg-gold-light transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <IndianRupee size={16} />
        Confirm & Send Order
      </button>
    </div>
  )
}

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, subtotal, deliveryCharge, total, clearCart } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)
  const [paymentData, setPaymentData] = useState(null)

  const handlePlaceOrder = (form) => {
    setPaymentData(form)
  }

  const handlePaymentConfirm = (methodId) => {
    const form = paymentData
    const methodLabel = paymentMethods.find(m => m.id === methodId)?.label || methodId

    const orderItems = items.map(i =>
      `${i.name} x${i.quantity} - ${formatPrice(i.price * i.quantity)}`
    ).join('\n')

    const message = `*New Order from Bhakti Bhandar*%0A%0A*Items:*%0A${encodeURIComponent(orderItems)}%0A%0A*Subtotal:* ${formatPrice(subtotal)}%0A*Delivery:* ${deliveryCharge === 0 ? 'Free' : formatPrice(deliveryCharge)}%0A*Total:* ${formatPrice(total)}%0A*Payment Method:* ${methodLabel}%0A%0A*Customer Details:*%0AName: ${form.name}%0AMobile: ${form.mobile}%0AEmail: ${form.email || 'N/A'}%0AAddress: ${form.address}%0ACity: ${form.city}%0APincode: ${form.pincode}%0ANotes: ${form.notes || 'N/A'}`

    window.open(`https://wa.me/${siteContent.whatsapp}?text=${message}`, '_blank')
    clearCart()
    closeDrawer()
    setShowCheckout(false)
    setPaymentData(null)
  }

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] z-[70] bg-ink-secondary border-l border-white/[0.06] shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ShoppingBag size={20} className="text-gold" />
                  {items.length > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold text-ink text-[10px] font-bold rounded-full flex items-center justify-center">
                      {items.length}
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-heading font-semibold text-text-primary">
                  Your Cart
                </h2>
                {items.length > 0 && (
                  <span className="text-xs text-text-secondary/50 font-body">
                    ({items.reduce((s, i) => s + i.quantity, 0)} items)
                  </span>
                )}
              </div>
              <button
                onClick={closeDrawer}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X size={18} className="text-text-secondary" />
              </button>
            </div>

            {items.length === 0 ? (
              <EmptyCart />
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin">
                  <AnimatePresence mode="popLayout">
                    {items.map(item => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </AnimatePresence>
                </div>

                <div className="border-t border-white/[0.06] p-4 space-y-3">
                  {!showCheckout ? (
                    <>
                      <div className="space-y-2 text-sm font-body">
                        <div className="flex justify-between text-text-secondary">
                          <span>Subtotal</span>
                          <span>{formatPrice(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-text-secondary">
                          <span>Delivery</span>
                          <span className={deliveryCharge === 0 ? 'text-green-400' : ''}>
                            {deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}
                          </span>
                        </div>
                        {subtotal < 500 && (
                          <p className="text-[11px] text-text-secondary/40">
                            Add items worth {formatPrice(500 - subtotal)} more for free delivery
                          </p>
                        )}
                        <div className="flex justify-between text-text-primary font-heading font-semibold text-base pt-2 border-t border-white/[0.06]">
                          <span>Total</span>
                          <span className="text-gold">{formatPrice(total)}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowCheckout(true)}
                        className="w-full bg-gold text-ink py-3 rounded-xl font-heading font-semibold text-base hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <CreditCard size={16} />
                        Proceed to Checkout
                      </button>
                    </>
                  ) : !paymentData ? (
                    <>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-heading font-semibold text-text-primary">
                          Delivery Details
                        </h3>
                        <button
                          onClick={() => setShowCheckout(false)}
                          className="text-xs text-gold hover:text-gold-light transition-colors"
                        >
                          Back
                        </button>
                      </div>
                      <div className="flex justify-between text-sm font-body text-text-secondary mb-3 pb-3 border-b border-white/[0.06]">
                        <span>Total Payable</span>
                        <span className="text-gold font-heading font-semibold">
                          {formatPrice(total)}
                        </span>
                      </div>
                      <CheckoutForm onSubmit={handlePlaceOrder} />
                    </>
                  ) : (
                    <PaymentMethodStep
                      form={paymentData}
                      total={total}
                      subtotal={subtotal}
                      deliveryCharge={deliveryCharge}
                      items={items}
                      onBack={() => setPaymentData(null)}
                      onConfirm={handlePaymentConfirm}
                    />
                  )}
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
