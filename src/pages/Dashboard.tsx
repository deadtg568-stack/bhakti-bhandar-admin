import { Link } from 'react-router-dom'
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import {
  IndianRupee,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Package,
  PackageX,
  Plus,
  Tag,
  Bell,
  FileBarChart,
  ArrowUpRight,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/Misc'
import { Table, Thead, Th, Tr, Td } from '@/components/ui/Table'
import { OrderStatusBadge } from '@/components/ui/Badge'
import { orders, revenueSeries } from '@/data/store'
import { products } from '@/data/products'
import { formatINR, formatDate } from '@/lib/utils'

const today = new Date('2026-07-02')
const isSameDay = (iso: string) => new Date(iso).toDateString() === today.toDateString()

const totalSales = orders.reduce((s, o) => s + o.total, 0)
const todaysOrders = orders.filter((o) => isSameDay(o.placedAt)).length
const pendingOrders = orders.filter((o) => o.status === 'Pending').length
const completedOrders = orders.filter((o) => o.status === 'Delivered').length
const outOfStock = products.filter((p) => p.status === 'out_of_stock').length

const stats = [
  { label: 'Total Sales', value: formatINR(totalSales), icon: IndianRupee, tone: 'gold' },
  { label: "Today's Orders", value: todaysOrders, icon: ShoppingBag, tone: 'info' },
  { label: 'Pending Orders', value: pendingOrders, icon: Clock, tone: 'warning' },
  { label: 'Completed Orders', value: completedOrders, icon: CheckCircle2, tone: 'success' },
  { label: 'Total Products', value: products.length, icon: Package, tone: 'gold' },
  { label: 'Out of Stock', value: outOfStock, icon: PackageX, tone: 'danger' },
] as const

const toneClasses: Record<string, string> = {
  gold: 'bg-gold/10 text-gold-dark dark:text-gold-light',
  info: 'bg-info/10 text-info',
  warning: 'bg-gold/10 text-gold-dark dark:text-gold-light',
  success: 'bg-success/10 text-success',
  danger: 'bg-danger/10 text-danger',
}

const topProducts = [...products]
  .sort((a, b) => b.mrp - a.mrp)
  .slice(0, 5)
  .map((p, i) => ({ ...p, unitsSold: 180 - i * 27 }))

const recentOrders = [...orders].sort((a, b) => +new Date(b.placedAt) - +new Date(a.placedAt)).slice(0, 6)

const quickActions = [
  { label: 'Add Product', icon: Plus, to: '/products' },
  { label: 'New Coupon', icon: Tag, to: '/coupons' },
  { label: 'Send Notification', icon: Bell, to: '/notifications' },
  { label: 'View Reports', icon: FileBarChart, to: '/reports' },
]

export default function Dashboard() {
  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Welcome back — here's how Bhakti Bhandar is doing today." />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((s) => (
          <Card key={s.label} className="flame-edge">
            <CardContent className="p-4">
              <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${toneClasses[s.tone]}`}>
                <s.icon size={17} />
              </div>
              <p className="text-xl font-semibold tracking-tight text-ink">{s.value}</p>
              <p className="mt-0.5 text-xs text-ink-muted">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <span className="text-xs text-ink-muted">Last 6 months</span>
          </CardHeader>
          <CardContent className="pl-0">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={revenueSeries} margin={{ left: 8, right: 24, top: 10 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(var(--gold))" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="rgb(var(--gold))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgb(var(--border))" vertical={false} />
                <XAxis dataKey="month" stroke="rgb(var(--ink-muted))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="rgb(var(--ink-muted))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `₹${v / 1000}k`}
                />
                <Tooltip
                  formatter={(v: number) => formatINR(v)}
                  contentStyle={{
                    background: 'rgb(var(--surface))',
                    border: '1px solid rgb(var(--border))',
                    borderRadius: 8,
                    fontSize: 13,
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="rgb(var(--gold))" strokeWidth={2} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {quickActions.map((a) => (
              <Link
                key={a.label}
                to={a.to}
                className="focus-ring flex flex-col items-center gap-2 rounded-lg border border-border p-4 text-center text-xs font-medium text-ink-muted transition-colors hover:border-gold/40 hover:bg-gold/5 hover:text-gold-dark dark:hover:text-gold-light"
              >
                <a.icon size={18} />
                {a.label}
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <Link to="/orders" className="flex items-center gap-1 text-xs font-medium text-gold-dark hover:underline dark:text-gold-light">
              View all <ArrowUpRight size={13} />
            </Link>
          </CardHeader>
          <Table>
            <Thead>
              <Tr>
                <Th>Order</Th>
                <Th>Customer</Th>
                <Th>Status</Th>
                <Th className="text-right">Total</Th>
              </Tr>
            </Thead>
            <tbody>
              {recentOrders.map((o) => (
                <Tr key={o.id}>
                  <Td>
                    <Link to={`/orders/${o.id}`} className="font-medium text-ink hover:text-gold-dark dark:hover:text-gold-light">
                      {o.orderNo}
                    </Link>
                    <p className="text-xs text-ink-muted">{formatDate(o.placedAt, true)}</p>
                  </Td>
                  <Td>{o.customerName}</Td>
                  <Td>
                    <OrderStatusBadge status={o.status} />
                  </Td>
                  <Td className="text-right font-medium">{formatINR(o.total)}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topProducts.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-surface2 text-xs font-semibold text-ink-muted">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{p.name}</p>
                  <p className="text-xs text-ink-muted">{p.unitsSold} units sold</p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-ink">{formatINR(p.price)}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
