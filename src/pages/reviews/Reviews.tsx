import { useState } from 'react'
import { Star, Check, X, Reply } from 'lucide-react'
import { PageHeader, EmptyState } from '@/components/ui/Misc'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Form'
import { reviews as initial } from '@/data/store'
import { formatDate } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'
import type { Review } from '@/types'

const tabs = [
  { key: 'pending', label: 'Pending' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
] as const

export default function Reviews() {
  const toast = useToast()
  const [items, setItems] = useState<Review[]>(initial)
  const [tab, setTab] = useState<Review['status']>('pending')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')

  const filtered = items.filter((r) => r.status === tab)

  function updateStatus(id: string, status: Review['status']) {
    setItems((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
    toast(status === 'approved' ? 'Review approved' : 'Review rejected', status === 'approved' ? 'success' : 'error')
  }

  function submitReply(id: string) {
    setItems((prev) => prev.map((r) => (r.id === id ? { ...r, reply: replyText } : r)))
    toast('Reply posted', 'success')
    setReplyingTo(null)
    setReplyText('')
  }

  return (
    <div>
      <PageHeader title="Reviews" subtitle="Moderate customer feedback on your products" />

      <div className="mb-4 flex gap-1 rounded-lg border border-border bg-surface p-1 w-fit">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`focus-ring rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              tab === t.key ? 'bg-gold/10 text-gold-dark dark:text-gold-light' : 'text-ink-muted hover:text-ink'
            }`}
          >
            {t.label} ({items.filter((r) => r.status === t.key).length})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card>
          <EmptyState title="No reviews here" subtitle="Nothing to moderate in this category right now." />
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((r) => (
            <Card key={r.id}>
              <CardContent>
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-ink">{r.productName}</p>
                    <p className="text-xs text-ink-muted">
                      {r.customerName} · {formatDate(r.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5 text-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} fill={i < r.rating ? 'currentColor' : 'none'} className={i >= r.rating ? 'text-border' : ''} />
                    ))}
                  </div>
                </div>
                <p className="mb-3 text-sm text-ink">{r.comment}</p>

                {r.reply && (
                  <div className="mb-3 rounded-lg bg-surface2 p-3 text-sm">
                    <p className="mb-0.5 text-xs font-semibold text-gold-dark dark:text-gold-light">Admin reply</p>
                    <p className="text-ink-muted">{r.reply}</p>
                  </div>
                )}

                {replyingTo === r.id ? (
                  <div className="space-y-2">
                    <Textarea rows={2} value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write a reply…" />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => submitReply(r.id)}>
                        Post Reply
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    {tab === 'pending' && (
                      <>
                        <Button size="sm" onClick={() => updateStatus(r.id, 'approved')}>
                          <Check size={13} /> Approve
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => updateStatus(r.id, 'rejected')}>
                          <X size={13} /> Reject
                        </Button>
                      </>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setReplyingTo(r.id)
                        setReplyText(r.reply ?? '')
                      }}
                    >
                      <Reply size={13} /> {r.reply ? 'Edit Reply' : 'Reply'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
