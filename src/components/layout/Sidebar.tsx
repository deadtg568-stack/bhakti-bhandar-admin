import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  Image,
  Ticket,
  Star,
  Bell,
  BarChart3,
  QrCode,
  Globe,
  Truck,
  ShieldCheck,
  Settings,
  ChevronLeft,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { FlameMark } from '@/components/ui/Misc'

const nav = [
  {
    section: 'Overview',
    items: [{ to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true }],
  },
  {
    section: 'Catalog',
    items: [
      { to: '/products', label: 'Products', icon: Package },
      { to: '/categories', label: 'Categories', icon: FolderTree },
    ],
  },
  {
    section: 'Sales',
    items: [
      { to: '/orders', label: 'Orders', icon: ShoppingCart },
      { to: '/customers', label: 'Customers', icon: Users },
      { to: '/coupons', label: 'Coupons', icon: Ticket },
    ],
  },
  {
    section: 'Marketing',
    items: [
      { to: '/banners', label: 'Banners', icon: Image },
      { to: '/reviews', label: 'Reviews', icon: Star },
      { to: '/notifications', label: 'Notifications', icon: Bell },
    ],
  },
  {
    section: 'Payments',
    items: [{ to: '/payments', label: 'UPI Verification', icon: QrCode }],
  },
  {
    section: 'Insights',
    items: [{ to: '/reports', label: 'Reports', icon: BarChart3 }],
  },
  {
    section: 'Configuration',
    items: [
      { to: '/settings/website', label: 'Website Settings', icon: Globe },
      { to: '/settings/delivery', label: 'Delivery Charges', icon: Truck },
      { to: '/settings/general', label: 'General Settings', icon: Settings },
      { to: '/security', label: 'Security', icon: ShieldCheck },
    ],
  },
]

export function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-40 flex flex-col border-r border-border bg-surface transition-[width] duration-200',
        collapsed ? 'w-[72px]' : 'w-64'
      )}
    >
      <div className="flex h-16 shrink-0 items-center gap-2.5 border-b border-border px-4">
        <FlameMark className="h-7 w-7 shrink-0" />
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate font-display text-base font-semibold leading-tight text-ink">Bhakti Bhandar</p>
            <p className="truncate text-[11px] font-medium uppercase tracking-wider text-ink-muted">Admin Panel</p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {nav.map((group) => (
          <div key={group.section} className="mb-5">
            {!collapsed && (
              <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-ink-muted/70">
                {group.section}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={'end' in item ? item.end : false}
                  className={({ isActive }) =>
                    cn(
                      'flame-edge focus-ring relative flex items-center gap-3 overflow-hidden rounded-lg px-2.5 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-gold/10 text-gold-dark dark:text-gold-light [&::before]:opacity-100'
                        : 'text-ink-muted hover:bg-surface2 hover:text-ink [&::before]:opacity-0'
                    )
                  }
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon size={18} className="shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <button
        onClick={onToggle}
        className="focus-ring flex h-12 shrink-0 items-center justify-center gap-2 border-t border-border text-ink-muted hover:bg-surface2 hover:text-ink"
      >
        <ChevronLeft size={16} className={cn('transition-transform', collapsed && 'rotate-180')} />
        {!collapsed && <span className="text-xs font-medium">Collapse</span>}
      </button>
    </aside>
  )
}
