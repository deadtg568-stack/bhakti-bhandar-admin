import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import { ToastProvider } from '@/context/ToastContext'
import { AdminLayout } from '@/components/layout/AdminLayout'

import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import ProductList from '@/pages/products/ProductList'
import Categories from '@/pages/categories/Categories'
import OrderList from '@/pages/orders/OrderList'
import OrderDetail from '@/pages/orders/OrderDetail'
import Customers from '@/pages/customers/Customers'
import Banners from '@/pages/banners/Banners'
import Coupons from '@/pages/coupons/Coupons'
import Reviews from '@/pages/reviews/Reviews'
import Notifications from '@/pages/notifications/Notifications'
import Reports from '@/pages/reports/Reports'
import PaymentSettings from '@/pages/payments/PaymentSettings'
import WebsiteSettings from '@/pages/settings/WebsiteSettings'
import DeliverySettings from '@/pages/settings/DeliverySettings'
import GeneralSettings from '@/pages/settings/GeneralSettings'
import Security from '@/pages/security/SecurityLogs'

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<AdminLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/orders" element={<OrderList />} />
              <Route path="/orders/:id" element={<OrderDetail />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/banners" element={<Banners />} />
              <Route path="/coupons" element={<Coupons />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/payments" element={<PaymentSettings />} />
              <Route path="/settings/website" element={<WebsiteSettings />} />
              <Route path="/settings/delivery" element={<DeliverySettings />} />
              <Route path="/settings/general" element={<GeneralSettings />} />
              <Route path="/security" element={<Security />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  )
}
