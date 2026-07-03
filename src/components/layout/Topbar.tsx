import { useState } from 'react'
import { Search, Sun, Moon, Bell, LogOut, ChevronDown } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { initials } from '@/lib/utils'

export function Topbar() {
  const { theme, toggle } = useTheme()
  const [profileOpen, setProfileOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-surface/80 px-6 backdrop-blur">
      <div className="relative flex-1 max-w-md">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
        <input
          type="text"
          placeholder="Search orders, products, customers…"
          className="focus-ring h-9 w-full rounded-lg border border-border bg-surface2/60 pl-9 pr-3 text-sm placeholder:text-ink-muted/70"
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <button
          onClick={toggle}
          className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted hover:bg-surface2 hover:text-ink"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        <button
          className="focus-ring relative flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted hover:bg-surface2 hover:text-ink"
          aria-label="Notifications"
        >
          <Bell size={17} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-gold ring-2 ring-surface" />
        </button>

        <div className="relative ml-1">
          <button
            onClick={() => setProfileOpen((o) => !o)}
            className="focus-ring flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 hover:bg-surface2"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 text-xs font-semibold text-gold-dark dark:text-gold-light">
              {initials('Admin User')}
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-sm font-medium leading-tight text-ink">Admin User</span>
              <span className="block text-[11px] leading-tight text-ink-muted">Super Admin</span>
            </span>
            <ChevronDown size={14} className="text-ink-muted" />
          </button>

          {profileOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
              <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-lg border border-border bg-surface p-1.5 shadow-card">
                <button
                  onClick={() => navigate('/security')}
                  className="focus-ring flex w-full items-center rounded-md px-3 py-2 text-left text-sm text-ink hover:bg-surface2"
                >
                  Activity Logs
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="focus-ring flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-danger hover:bg-danger/10"
                >
                  <LogOut size={14} /> Log Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
