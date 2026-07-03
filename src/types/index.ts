export type ProductStatus = 'active' | 'draft' | 'out_of_stock'

export interface ProductVariant {
  id: string
  name: string
  sku: string
  stock: number
  mrp: number
  price: number
}

export interface Product {
  id: string
  name: string
  sku: string
  barcode: string
  category: string
  subCategory: string
  brand: string
  images: string[]
  video?: string
  mrp: number
  price: number
  discountPct: number
  gstPct: number
  stock: number
  status: ProductStatus
  variants: ProductVariant[]
  createdAt: string
}

export interface Category {
  id: string
  name: string
  icon: string
  banner: string
  subCategories: string[]
  productCount: number
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Return Requested'
export type PaymentStatus = 'Pending Verification' | 'Verified' | 'Rejected'

export interface OrderItem {
  productId: string
  name: string
  qty: number
  price: number
  image: string
}

export interface Order {
  id: string
  orderNo: string
  customerId: string
  customerName: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: 'UPI'
  utrNumber?: string
  screenshotUrl?: string
  address: string
  phone: string
  placedAt: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  totalOrders: number
  totalSpent: number
  blocked: boolean
  joinedAt: string
}

export interface Banner {
  id: string
  type: 'Homepage Slider' | 'Offer Banner' | 'Festival Banner' | 'Popup Banner'
  title: string
  image: string
  active: boolean
  link?: string
}

export interface Coupon {
  id: string
  code: string
  type: 'flat' | 'percentage'
  value: number
  expiryDate: string
  usageLimit: number
  usedCount: number
  active: boolean
}

export interface Review {
  id: string
  productName: string
  customerName: string
  rating: number
  comment: string
  status: 'pending' | 'approved' | 'rejected'
  reply?: string
  createdAt: string
}

export interface NotificationItem {
  id: string
  title: string
  message: string
  type: 'Offer' | 'Order' | 'General'
  sentAt: string
  audience: string
}

export interface ActivityLog {
  id: string
  actor: string
  action: string
  timestamp: string
  ip: string
}
