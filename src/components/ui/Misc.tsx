import { type ReactNode } from 'react'
import { Inbox } from 'lucide-react'

export function EmptyState({ title, subtitle, icon }: { title: string; subtitle?: string; icon?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
      <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-surface2 text-ink-muted">
        {icon ?? <Inbox size={20} />}
      </div>
      <p className="font-medium text-ink">{title}</p>
      {subtitle && <p className="max-w-xs text-sm text-ink-muted">{subtitle}</p>}
    </div>
  )
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">{title}</h1>
        {subtitle && <p className="mt-0.5 text-sm text-ink-muted">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}

export function FlameMark({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2c1.2 2.4-.6 3.6-1.6 5C9 9 8.5 10.6 9 12.2c-1.3-.8-2-2.2-2-3.7C4.9 10.4 4 12.7 4 15c0 4.4 3.6 7 8 7s8-2.6 8-7c0-3.2-1.6-5.9-4-7.6.2 1.3-.2 2.4-1 3.1.2-2.3-.7-4.3-3-6.5Z"
        fill="url(#flameGradient)"
      />
      <defs>
        <linearGradient id="flameGradient" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FCD34D" />
          <stop offset="0.55" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#B45309" />
        </linearGradient>
      </defs>
    </svg>
  )
}
