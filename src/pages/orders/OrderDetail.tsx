import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Printer, User, MapPin, Phone, QrCode, XCircle, RotateCcw, ImageOff } from 'lucide-react'
import { PageHeader } from '@/components/ui/Misc'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Form'
import { OrderStatusBadge, PaymentStatusBadge } from '@/components/ui/Badge'
import { orders } from '@/data/store'
import { formatINR, formatDate } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'
import type { OrderStatus } from '@/types'

const flow: OrderStatus[] = ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered']

export default function OrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const order = orders.find((o) => o.id === id)
  const [status, setStatus] = useState<OrderStatus>(order?.status ?? 'Pending')
  const [paymentStatus, setPaymentStatus] = useState(order?.paymentStatus ?? 'Pending Verification')

  if (!order) {
    return (
      <div>
        <Button variant="ghost" onClick={() => navigate('/orders')}>
          <ArrowLeft size={15} /> Back to Orders
        </Button>
        <p className="mt-6 text-sm text-ink-muted">Order not found.</p>
      </div>
    )
  }

  const currentStep = flow.indexOf(status)
  const isTerminalOther = status === 'Cancelled' || status === 'Return Requested'

  return (
    <div>
      <Link to="/orders" className="mb-2 inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink">
        <ArrowLeft size={14} /> Back to Orders
      </Link>
      <PageHeader
        title={order.orderNo}
        subtitle={`Placed on ${formatDate(order.placedAt, true)}`}
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer size={14} /> Print Invoice
            </Button>
            {!isTerminalOther && (
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  setStatus('Cancelled')
                  toast('Order cancelled', 'success')
                }}
              >
                <XCircle size={14} /> Cancel Order
              </Button>
            )}
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {!isTerminalOther && (
            <Card>
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
                <OrderStatusBadge status={status} />
              </CardHeader>
              <CardContent>
                <div className="mb-5 flex items-center">
                  {flow.map((s, i) => (
                    <div key={s} className="flex flex-1 items-center last:flex-none">
                      <div className="flex flex-col items-center gap-1.5">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold ${
                            i <= currentStep
                              ? 'border-gold bg-gold/15 text-gold-dark dark:text-gold-light'
                              : 'border-border text-ink-muted'
                          }`}
                        >
                          {i + 1}
                        </div>
                        <span className={`text-[11px] ${i <= currentStep ? 'font-medium text-ink' : 'text-ink-muted'}`}>{s}</span>
                      </div>
                      {i < flow.length - 1 && (
                        <div className={`mx-2 h-0.5 flex-1 ${i < currentStep ? 'bg-gold' : 'bg-border'}`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <Select value={status} onChange={(e) => setStatus(e.target.value as OrderStatus)} className="max-w-xs">
                    {flow.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Select>
                  <Button
                    size="sm"
                    onClick={() => toast(`Status updated to "${status}"`, 'success')}
                  >
                    Update Status
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setStatus('Return Requested')
                      toast('Marked as return requested', 'info')
                    }}
                  >
                    <RotateCcw size={14} /> Return Request
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-surface2 text-ink-muted">
                    <ImageOff size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{item.name}</p>
                    <p className="text-xs text-ink-muted">Qty: {item.qty}</p>
                  </div>
                  <p className="font-medium text-ink">{formatINR(item.qty * item.price)}</p>
                </div>
              ))}
              <div className="flex justify-between pt-2 text-sm">
                <span className="text-ink-muted">Subtotal</span>
                <span className="font-medium">{formatINR(order.total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink-muted">Delivery</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-base">
                <span className="font-semibold">Total</span>
                <span className="font-semibold text-gold-dark dark:text-gold-light">{formatINR(order.total)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <User size={15} className="text-ink-muted" /> {order.customerName}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={15} className="text-ink-muted" /> {order.phone}
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0 text-ink-muted" /> {order.address}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment (UPI)</CardTitle>
              <PaymentStatusBadge status={paymentStatus} />
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-muted">UTR Number</span>
                <span className="font-medium">{order.utrNumber ?? '—'}</span>
              </div>
              {order.screenshotUrl && (
                <div>
                  <p className="mb-1.5 text-ink-muted">Payment Screenshot</p>
                  <div className="flex h-28 items-center justify-center rounded-lg border border-border bg-surface2 text-ink-muted">
                    <QrCode size={22} />
                  </div>
                </div>
              )}
              {paymentStatus === 'Pending Verification' && (
                <div className="flex gap-2 pt-1">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      setPaymentStatus('Verified')
                      toast('Payment verified — order confirmed', 'success')
                    }}
                  >
                    Verify
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      setPaymentStatus('Rejected')
                      toast('Payment rejected', 'error')
                    }}
                  >
                    Reject
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
