import { useState } from 'react'
import { Plus, Pencil, Trash2, Image as ImageIcon, X } from 'lucide-react'
import { PageHeader } from '@/components/ui/Misc'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Field, Input, Label } from '@/components/ui/Form'
import { categories as initial } from '@/data/products'
import { useToast } from '@/context/ToastContext'
import type { Category } from '@/types'

const emptyCategory: Category = { id: '', name: '', icon: '🕉️', banner: '/placeholder-banner.jpg', subCategories: [], productCount: 0 }

export default function Categories() {
  const toast = useToast()
  const [items, setItems] = useState<Category[]>(initial)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [form, setForm] = useState<Category>(emptyCategory)
  const [subInput, setSubInput] = useState('')

  function openNew() {
    setEditing(null)
    setForm({ ...emptyCategory, id: `c${Date.now()}` })
    setOpen(true)
  }

  function openEdit(c: Category) {
    setEditing(c)
    setForm(c)
    setOpen(true)
  }

  function save() {
    setItems((prev) => {
      const exists = prev.some((c) => c.id === form.id)
      return exists ? prev.map((c) => (c.id === form.id ? form : c)) : [form, ...prev]
    })
    toast(editing ? 'Category updated' : 'Category added', 'success')
    setOpen(false)
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((c) => c.id !== id))
    toast('Category deleted', 'success')
  }

  function addSub() {
    if (!subInput.trim()) return
    setForm((f) => ({ ...f, subCategories: [...f.subCategories, subInput.trim()] }))
    setSubInput('')
  }

  return (
    <div>
      <PageHeader
        title="Categories"
        subtitle={`${items.length} categories`}
        actions={
          <Button size="sm" onClick={openNew}>
            <Plus size={14} /> Add Category
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <Card key={c.id}>
            <div className="flex h-28 items-center justify-center rounded-t-xl border-b border-border bg-surface2 text-ink-muted">
              <ImageIcon size={22} />
            </div>
            <CardContent>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xl leading-none">{c.icon}</span>
                <h3 className="font-medium text-ink">{c.name}</h3>
              </div>
              <p className="mb-3 text-xs text-ink-muted">{c.productCount} products</p>
              <div className="mb-4 flex flex-wrap gap-1.5">
                {c.subCategories.map((s) => (
                  <span key={s} className="rounded-full bg-surface2 px-2 py-0.5 text-[11px] text-ink-muted">
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => openEdit(c)}>
                  <Pencil size={13} /> Edit
                </Button>
                <Button variant="ghost" size="icon" onClick={() => remove(c.id)}>
                  <Trash2 size={15} className="text-danger" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? 'Edit Category' : 'Add Category'}
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={save}>{editing ? 'Save Changes' : 'Add Category'}</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category Name">
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Puja Thalis" />
            </Field>
            <Field label="Icon (emoji)">
              <Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="🪔" />
            </Field>
          </div>
          <div>
            <Label>Banner Image</Label>
            <button className="focus-ring flex h-28 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border text-sm text-ink-muted hover:border-gold/50 hover:text-gold-dark dark:hover:text-gold-light">
              <ImageIcon size={18} /> Upload banner image
            </button>
          </div>
          <div>
            <Label>Sub Categories</Label>
            <div className="mb-2 flex flex-wrap gap-1.5">
              {form.subCategories.map((s) => (
                <span key={s} className="flex items-center gap-1 rounded-full bg-surface2 px-2.5 py-1 text-xs text-ink">
                  {s}
                  <button onClick={() => setForm({ ...form, subCategories: form.subCategories.filter((x) => x !== s) })}>
                    <X size={11} className="text-ink-muted" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={subInput}
                onChange={(e) => setSubInput(e.target.value)}
                placeholder="Add sub category…"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSub())}
              />
              <Button variant="outline" onClick={addSub}>
                Add
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
