import { useState } from 'react'
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react'
import { PageHeader } from '@/components/ui/Misc'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Field, Input, Select } from '@/components/ui/Form'
import { banners as initial } from '@/data/store'
import { useToast } from '@/context/ToastContext'
import type { Banner } from '@/types'

const types: Banner['type'][] = ['Homepage Slider', 'Offer Banner', 'Festival Banner', 'Popup Banner']

export default function Banners() {
  const toast = useToast()
  const [items, setItems] = useState<Banner[]>(initial)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<Banner>({ id: '', type: 'Homepage Slider', title: '', image: '/placeholder-banner.jpg', active: true })

  function toggleActive(id: string) {
    setItems((prev) => prev.map((b) => (b.id === id ? { ...b, active: !b.active } : b)))
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((b) => b.id !== id))
    toast('Banner removed', 'success')
  }

  function save() {
    setItems((prev) => [{ ...form, id: `b${Date.now()}` }, ...prev])
    toast('Banner added', 'success')
    setOpen(false)
    setForm({ id: '', type: 'Homepage Slider', title: '', image: '/placeholder-banner.jpg', active: true })
  }

  return (
    <div>
      <PageHeader
        title="Banners"
        subtitle="Manage homepage, offer, festival and popup banners"
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            <Plus size={14} /> Add Banner
          </Button>
        }
      />

      {types.map((type) => {
        const group = items.filter((b) => b.type === type)
        if (group.length === 0) return null
        return (
          <Card key={type} className="mb-4">
            <CardHeader>
              <CardTitle>{type}</CardTitle>
              <span className="text-xs text-ink-muted">{group.length} banner(s)</span>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.map((b) => (
                <div key={b.id} className="overflow-hidden rounded-lg border border-border">
                  <div className="flex h-28 items-center justify-center bg-surface2 text-ink-muted">
                    <ImageIcon size={20} />
                  </div>
                  <div className="p-3">
                    <p className="mb-2 truncate text-sm font-medium text-ink">{b.title}</p>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => toggleActive(b.id)}
                        className={`focus-ring rounded-full px-2.5 py-1 text-[11px] font-medium ${
                          b.active ? 'bg-success/15 text-success' : 'bg-surface2 text-ink-muted'
                        }`}
                      >
                        {b.active ? 'Active' : 'Inactive'}
                      </button>
                      <Button variant="ghost" size="icon" onClick={() => remove(b.id)}>
                        <Trash2 size={14} className="text-danger" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )
      })}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Add Banner"
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={save}>Add Banner</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Banner Type">
            <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Banner['type'] })}>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Title">
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Diwali Sale — Up to 40% Off" />
          </Field>
          <Field label="Link (optional)">
            <Input value={form.link ?? ''} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="/products" />
          </Field>
          <div>
            <button className="focus-ring flex h-32 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border text-sm text-ink-muted hover:border-gold/50 hover:text-gold-dark dark:hover:text-gold-light">
              <ImageIcon size={18} /> Upload banner image
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
