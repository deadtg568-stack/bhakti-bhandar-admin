import { useState } from 'react'
import { Send, Bell, Tag, Package, Megaphone } from 'lucide-react'
import { PageHeader } from '@/components/ui/Misc'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Field, Input, Select, Textarea } from '@/components/ui/Form'
import { notifications as initial } from '@/data/store'
import { formatDate } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'
import type { NotificationItem } from '@/types'

const typeIcon: Record<NotificationItem['type'], typeof Tag> = { Offer: Tag, Order: Package, General: Megaphone }

export default function Notifications() {
  const toast = useToast()
  const [items, setItems] = useState<NotificationItem[]>(initial)
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [type, setType] = useState<NotificationItem['type']>('Offer')
  const [audience, setAudience] = useState('All Customers')

  function send() {
    if (!title.trim() || !message.trim()) {
      toast('Please add a title and message', 'error')
      return
    }
    const n: NotificationItem = { id: `n${Date.now()}`, title, message, type, audience, sentAt: new Date().toISOString() }
    setItems((prev) => [n, ...prev])
    toast('Notification sent', 'success')
    setTitle('')
    setMessage('')
  }

  return (
    <div>
      <PageHeader title="Notifications" subtitle="Send offer, order, and general updates to customers" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Compose</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Type">
              <Select value={type} onChange={(e) => setType(e.target.value as NotificationItem['type'])}>
                <option value="Offer">Offer Notification</option>
                <option value="Order">Order Notification</option>
                <option value="General">General</option>
              </Select>
            </Field>
            <Field label="Audience">
              <Select value={audience} onChange={(e) => setAudience(e.target.value)}>
                <option>All Customers</option>
                <option>Order Subscribers</option>
                <option>Inactive Customers (30+ days)</option>
              </Select>
            </Field>
            <Field label="Title">
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Weekend Special Offer" />
            </Field>
            <Field label="Message">
              <Textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your message…" />
            </Field>
            <Button className="w-full" onClick={send}>
              <Send size={14} /> Send Notification
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sent History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {items.map((n) => {
              const Icon = typeIcon[n.type]
              return (
                <div key={n.id} className="flex items-start gap-3 rounded-lg border border-border p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold-dark dark:text-gold-light">
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate font-medium text-ink">{n.title}</p>
                      <span className="shrink-0 text-xs text-ink-muted">{formatDate(n.sentAt, true)}</span>
                    </div>
                    <p className="text-sm text-ink-muted">{n.message}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-ink-muted">
                      <Bell size={11} /> {n.audience}
                    </p>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
