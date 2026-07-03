import { useState } from 'react'
import { QrCode, Save, Check, X, ExternalLink } from 'lucide-react'
import { PageHeader, EmptyState } from '@/components/ui/Misc'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Field, Input } from '@/components/ui/Form'
import { PaymentStatusBadge } from '@/components/ui/Badge'
import { orders as initialOrders } from '@/data/store'
import { formatINR, formatDate } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'

export default function PaymentSettings() {
  const toast = useToast()
  const [upiId, setUpiId] = useState('bhaktibhandar@upi')
  const [orders, setOrders] = useState(initialOrders)

  const queue = orders.filter((o) => o.paymentStatus === 'Pending Verification')

  function verify(id: string, approve: boolean) {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, paymentStatus: approve ? 'Verified' : 'Rejected' } : o))
    )
    toast(approve ? 'Payment verified — order confirmed' : 'Payment rejected', approve ? 'success' : 'error')
  }

  return (
    <div>
      <PageHeader title="UPI Payments" subtitle="Manual UPI verification — no gateway fees" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>UPI Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Your UPI ID">
              <Input value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="yourname@upi" />
            </Field>
            <div>
              <p className="mb-1.5 text-xs font-medium text-ink-muted">QR Code</p>
              <button className="focus-ring flex h-40 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border text-ink-muted hover:border-gold/50 hover:text-gold-dark dark:hover:text-gold-light">
                <QrCode size={28} />
                <span className="text-xs">Upload QR code image</span>
              </button>
              <p className="mt-1.5 text-[11px] text-ink-muted">Shown to customers at checkout.</p>
            </div>
            <Button className="w-full" onClick={() => toast('UPI settings saved', 'success')}>
              <Save size={14} /> Save Settings
            </Button>

            <div className="rounded-lg bg-surface2 p-3 text-xs text-ink-muted">
              <p className="mb-1 font-medium text-ink">How it works</p>
              <ol className="list-decimal space-y-1 pl-4">
                <li>Customer scans your QR &amp; pays via UPI</li>
                <li>They enter the UTR number &amp; upload screenshot</li>
                <li>You verify here — order confirms automatically</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pending Verification</CardTitle>
            <span className="text-xs text-ink-muted">{queue.length} awaiting review</span>
          </CardHeader>
          {queue.length === 0 ? (
            <EmptyState title="All caught up" subtitle="No payments waiting for verification." />
          ) : (
            <CardContent className="space-y-3">
              {queue.map((o) => (
                <div key={o.id} className="flex flex-col gap-3 rounded-lg border border-border p-4 sm:flex-row sm:items-center">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-surface2 text-ink-muted">
                    <QrCode size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-ink">{o.orderNo}</p>
                      <PaymentStatusBadge status={o.paymentStatus} />
                    </div>
                    <p className="text-xs text-ink-muted">
                      {o.customerName} · {formatDate(o.placedAt, true)}
                    </p>
                    <p className="mt-1 text-xs text-ink-muted">
                      UTR: <span className="font-mono text-ink">{o.utrNumber ?? '—'}</span> · Amount:{' '}
                      <span className="font-medium text-ink">{formatINR(o.total)}</span>
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink size={13} /> View Screenshot
                    </Button>
                    <Button size="sm" onClick={() => verify(o.id, true)}>
                      <Check size={13} /> Verify
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => verify(o.id, false)}>
                      <X size={13} /> Reject
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
