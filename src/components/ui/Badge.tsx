import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'gold'

const tones: Record<Tone, string> = {
  neutral: 'bg-surface2 text-ink-muted',
  success: 'bg-success/15 text-success',
  warning: 'bg-gold/15 text-gold-dark dark:text-gold-light',
  danger: 'bg-danger/15 text-danger',
  info: 'bg-info/15 text-info',
  gold: 'bg-gold/15 text-gold-dark dark:text-gold-light',
}

interface Props extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
  dot?: boolean
}

export function Badge({ tone = 'neutral', dot, className, children, ...props }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
        tones[tone],
        className
      )}
      {...props}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', tones[tone].split(' ')[1])} style={{ backgroundColor: 'currentColor' }} />}
      {children}
    </span>
  )
}

const ORDER_STATUS_TONE: Record<string, Tone> = {
  Pending: 'warning',
  Confirmed: 'info',
  Packed: 'info',
  Shipped: 'gold',
  Delivered: 'success',
  Cancelled: 'danger',
  'Return Requested': 'danger',
}

export function OrderStatusBadge({ status }: { status: string }) {
  return <Badge tone={ORDER_STATUS_TONE[status] ?? 'neutral'}>{status}</Badge>
}

const PAYMENT_STATUS_TONE: Record<string, Tone> = {
  'Pending Verification': 'warning',
  Verified: 'success',
  Rejected: 'danger',
}

export function PaymentStatusBadge({ status }: { status: string }) {
  return <Badge tone={PAYMENT_STATUS_TONE[status] ?? 'neutral'}>{status}</Badge>
}
