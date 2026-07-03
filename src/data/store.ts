import type {
  Order,
  Customer,
  Banner,
  Coupon,
  Review,
  NotificationItem,
  ActivityLog,
  OrderStatus,
  PaymentStatus,
} from '@/types'
import { products } from './products'

function seedRandom(seed: number) {
  let value = seed
  return () => {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }
}
const rand = seedRandom(7)

const firstNames = ['Aarav', 'Priya', 'Rohan', 'Ananya', 'Vikram', 'Sneha', 'Karan', 'Meera', 'Aditya', 'Divya', 'Rajesh', 'Pooja']
const lastNames = ['Sharma', 'Verma', 'Iyer', 'Gupta', 'Nair', 'Reddy', 'Joshi', 'Mehta', 'Rao', 'Kapoor']
const cities = ['Indore, MP', 'Ujjain, MP', 'Bhopal, MP', 'Jaipur, RJ', 'Varanasi, UP', 'Mathura, UP', 'Pune, MH', 'Ahmedabad, GJ']

export const customers: Customer[] = Array.from({ length: 30 }).map((_, i) => {
  const name = `${firstNames[i % firstNames.length]} ${lastNames[(i * 3) % lastNames.length]}`
  const totalOrders = Math.round(rand() * 18)
  return {
    id: `cu${i + 1}`,
    name,
    email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
    phone: `9${Math.floor(100000000 + rand() * 899999999)}`,
    address: `${Math.round(rand() * 200) + 1}, ${cities[i % cities.length]}`,
    totalOrders,
    totalSpent: totalOrders * Math.round(300 + rand() * 1500),
    blocked: rand() > 0.92,
    joinedAt: new Date(2025, i % 12, (i % 27) + 1).toISOString(),
  }
})

const orderStatuses: OrderStatus[] = ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered']
const paymentStatuses: PaymentStatus[] = ['Pending Verification', 'Verified', 'Verified', 'Rejected']

export const orders: Order[] = Array.from({ length: 40 }).map((_, i) => {
  const customer = customers[i % customers.length]
  const itemCount = 1 + Math.floor(rand() * 3)
  const items = Array.from({ length: itemCount }).map((__, j) => {
    const p = products[(i + j * 5) % products.length]
    const qty = 1 + Math.floor(rand() * 3)
    return { productId: p.id, name: p.name, qty, price: p.price, image: p.images[0] }
  })
  const total = items.reduce((s, it) => s + it.qty * it.price, 0)
  const isCancelled = rand() > 0.9
  const isReturn = !isCancelled && rand() > 0.93
  const status: OrderStatus = isCancelled ? 'Cancelled' : isReturn ? 'Return Requested' : orderStatuses[i % orderStatuses.length]
  return {
    id: `o${i + 1}`,
    orderNo: `BB${(20260000 + i * 7).toString()}`,
    customerId: customer.id,
    customerName: customer.name,
    items,
    total,
    status,
    paymentStatus: paymentStatuses[i % paymentStatuses.length],
    paymentMethod: 'UPI',
    utrNumber: rand() > 0.2 ? `UTR${Math.floor(100000000000 + rand() * 899999999999)}` : undefined,
    screenshotUrl: rand() > 0.2 ? '/placeholder-screenshot.jpg' : undefined,
    address: customer.address,
    phone: customer.phone,
    placedAt: new Date(2026, 5, (i % 28) + 1, (i % 12) + 8, (i * 7) % 60).toISOString(),
  }
})

export const banners: Banner[] = [
  { id: 'b1', type: 'Homepage Slider', title: 'Shravan Maas Special — Up to 30% Off', image: '/placeholder-banner.jpg', active: true, link: '/hawan-samagri' },
  { id: 'b2', type: 'Homepage Slider', title: 'New Arrivals: Panchdhatu Idols', image: '/placeholder-banner.jpg', active: true, link: '/products' },
  { id: 'b3', type: 'Offer Banner', title: 'Free Delivery Above ₹999', image: '/placeholder-banner.jpg', active: true },
  { id: 'b4', type: 'Festival Banner', title: 'Ganesh Chaturthi Collection', image: '/placeholder-banner.jpg', active: false, link: '/festivals' },
  { id: 'b5', type: 'Popup Banner', title: 'First Order? Get ₹100 Off', image: '/placeholder-banner.jpg', active: true },
]

export const coupons: Coupon[] = [
  { id: 'cp1', code: 'SHRAVAN30', type: 'percentage', value: 30, expiryDate: '2026-08-15', usageLimit: 500, usedCount: 214, active: true },
  { id: 'cp2', code: 'FLAT100', type: 'flat', value: 100, expiryDate: '2026-07-31', usageLimit: 1000, usedCount: 812, active: true },
  { id: 'cp3', code: 'WELCOME50', type: 'flat', value: 50, expiryDate: '2026-12-31', usageLimit: 2000, usedCount: 356, active: true },
  { id: 'cp4', code: 'DIWALI25', type: 'percentage', value: 25, expiryDate: '2025-11-05', usageLimit: 800, usedCount: 800, active: false },
]

export const reviews: Review[] = Array.from({ length: 14 }).map((_, i) => {
  const p = products[i % products.length]
  const c = customers[(i * 2) % customers.length]
  const statuses: Review['status'][] = ['pending', 'approved', 'approved', 'rejected']
  return {
    id: `rv${i + 1}`,
    productName: p.name,
    customerName: c.name,
    rating: 3 + Math.floor(rand() * 3),
    comment:
      i % 3 === 0
        ? 'Very good quality, exactly as shown. Delivery was on time and packaging was excellent.'
        : i % 3 === 1
        ? 'Product achha hai, lekin box thoda damaged aaya tha. Overall satisfied.'
        : 'Perfect for our puja needs. Will order again for the next festival.',
    status: statuses[i % statuses.length],
    reply: i % 4 === 1 ? 'Thank you for your kind words! 🙏' : undefined,
    createdAt: new Date(2026, 5, (i % 28) + 1).toISOString(),
  }
})

export const notifications: NotificationItem[] = [
  { id: 'n1', title: 'Shravan Special Offer', message: 'Get up to 30% off on all Hawan Samagri this Shravan Maas.', type: 'Offer', sentAt: '2026-06-28T10:00:00Z', audience: 'All Customers' },
  { id: 'n2', title: 'Order Shipped', message: 'Your order BB20260056 has been shipped.', type: 'Order', sentAt: '2026-06-30T14:22:00Z', audience: 'Order Subscribers' },
  { id: 'n3', title: 'App Update', message: 'New Rudraksha collection now live — check it out!', type: 'General', sentAt: '2026-07-01T09:05:00Z', audience: 'All Customers' },
]

export const activityLogs: ActivityLog[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `al${i + 1}`,
  actor: i % 3 === 0 ? 'Admin (Ramesh)' : 'Admin (Priya)',
  action: ['Logged in', 'Updated product stock', 'Changed order status', 'Verified payment', 'Added new coupon', 'Blocked customer'][i % 6],
  timestamp: new Date(2026, 6, 2 - Math.floor(i / 2), 9 + i).toISOString(),
  ip: `103.21.${i}.${(i * 13) % 255}`,
}))

export const revenueSeries = [
  { month: 'Feb', revenue: 82000 },
  { month: 'Mar', revenue: 94500 },
  { month: 'Apr', revenue: 88200 },
  { month: 'May', revenue: 121000 },
  { month: 'Jun', revenue: 143500 },
  { month: 'Jul', revenue: 61200 },
]
