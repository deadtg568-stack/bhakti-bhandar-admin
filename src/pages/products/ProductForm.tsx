import { useEffect, useState } from 'react'
import { ImagePlus, Video, Plus, X } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Field, Input, Select, Textarea, Label } from '@/components/ui/Form'
import { categories } from '@/data/products'
import type { Product, ProductVariant } from '@/types'

interface Props {
  open: boolean
  product: Product | null
  onClose: () => void
  onSave: (product: Product) => void
}

const empty: Product = {
  id: '',
  name: '',
  sku: '',
  barcode: '',
  category: categories[0].name,
  subCategory: categories[0].subCategories[0],
  brand: '',
  images: [],
  mrp: 0,
  price: 0,
  discountPct: 0,
  gstPct: 5,
  stock: 0,
  status: 'active',
  variants: [],
  createdAt: new Date().toISOString(),
}

export function ProductFormModal({ open, product, onClose, onSave }: Props) {
  const [form, setForm] = useState<Product>(product ?? empty)

  useEffect(() => {
    setForm(product ?? { ...empty, id: `p${Date.now()}` })
  }, [product, open])

  function update<K extends keyof Product>(key: K, value: Product[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function addVariant() {
    const v: ProductVariant = { id: `v${Date.now()}`, name: '', sku: '', stock: 0, mrp: form.mrp, price: form.price }
    update('variants', [...form.variants, v])
  }

  function updateVariant(id: string, patch: Partial<ProductVariant>) {
    update(
      'variants',
      form.variants.map((v) => (v.id === id ? { ...v, ...patch } : v))
    )
  }

  function removeVariant(id: string) {
    update('variants', form.variants.filter((v) => v.id !== id))
  }

  const selectedCategory = categories.find((c) => c.name === form.category) ?? categories[0]

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={product ? 'Edit Product' : 'Add Product'}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() =>
              onSave({
                ...form,
                id: form.id || `p${Date.now()}`,
                price: form.mrp - (form.mrp * form.discountPct) / 100,
              })
            }
          >
            {product ? 'Save Changes' : 'Add Product'}
          </Button>
        </>
      }
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Product Name">
            <Input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="e.g. Brass Ganesh Murti" />
          </Field>
          <Field label="Brand">
            <Input value={form.brand} onChange={(e) => update('brand', e.target.value)} placeholder="e.g. Divine Crafts" />
          </Field>
          <Field label="SKU">
            <Input value={form.sku} onChange={(e) => update('sku', e.target.value)} placeholder="BB-1000" />
          </Field>
          <Field label="Barcode">
            <Input value={form.barcode} onChange={(e) => update('barcode', e.target.value)} placeholder="8901234560001" />
          </Field>
          <Field label="Category">
            <Select
              value={form.category}
              onChange={(e) => {
                const cat = categories.find((c) => c.name === e.target.value)!
                update('category', cat.name)
                update('subCategory', cat.subCategories[0])
              }}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Sub Category">
            <Select value={form.subCategory} onChange={(e) => update('subCategory', e.target.value)}>
              {selectedCategory.subCategories.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <div>
          <Label>Product Images</Label>
          <div className="flex flex-wrap gap-3">
            {form.images.map((_, i) => (
              <div key={i} className="relative flex h-20 w-20 items-center justify-center rounded-lg border border-border bg-surface2 text-ink-muted">
                <ImagePlus size={18} />
                <button
                  onClick={() => update('images', form.images.filter((_, idx) => idx !== i))}
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-danger text-white"
                >
                  <X size={11} />
                </button>
              </div>
            ))}
            <button
              onClick={() => update('images', [...form.images, `/placeholder-${form.images.length}.jpg`])}
              className="focus-ring flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border text-ink-muted hover:border-gold/50 hover:text-gold-dark dark:hover:text-gold-light"
            >
              <ImagePlus size={17} />
              <span className="text-[10px]">Add</span>
            </button>
          </div>
        </div>

        <Field label="Product Video (optional)">
          <div className="flex items-center gap-2">
            <Video size={16} className="text-ink-muted" />
            <Input placeholder="Video URL" value={form.video ?? ''} onChange={(e) => update('video', e.target.value)} />
          </div>
        </Field>

        <div className="grid grid-cols-4 gap-4">
          <Field label="MRP (₹)">
            <Input type="number" value={form.mrp} onChange={(e) => update('mrp', Number(e.target.value))} />
          </Field>
          <Field label="Discount (%)">
            <Input type="number" value={form.discountPct} onChange={(e) => update('discountPct', Number(e.target.value))} />
          </Field>
          <Field label="Selling Price (₹)">
            <Input type="number" value={Math.round(form.mrp - (form.mrp * form.discountPct) / 100)} readOnly className="bg-surface2/60" />
          </Field>
          <Field label="GST (%)">
            <Select value={form.gstPct} onChange={(e) => update('gstPct', Number(e.target.value))}>
              {[0, 5, 12, 18, 28].map((g) => (
                <option key={g} value={g}>
                  {g}%
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Stock Quantity">
            <Input type="number" value={form.stock} onChange={(e) => update('stock', Number(e.target.value))} />
          </Field>
          <Field label="Status">
            <Select value={form.status} onChange={(e) => update('status', e.target.value as Product['status'])}>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="out_of_stock">Out of Stock</option>
            </Select>
          </Field>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <Label className="mb-0">Variants</Label>
            <Button variant="outline" size="sm" onClick={addVariant}>
              <Plus size={13} /> Add Variant
            </Button>
          </div>
          {form.variants.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-ink-muted">
              No variants — this product will use the base price and stock above.
            </p>
          ) : (
            <div className="space-y-2">
              {form.variants.map((v) => (
                <div key={v.id} className="grid grid-cols-[1fr_1fr_80px_90px_36px] items-center gap-2">
                  <Input placeholder="Variant name" value={v.name} onChange={(e) => updateVariant(v.id, { name: e.target.value })} />
                  <Input placeholder="SKU" value={v.sku} onChange={(e) => updateVariant(v.id, { sku: e.target.value })} />
                  <Input
                    type="number"
                    placeholder="Stock"
                    value={v.stock}
                    onChange={(e) => updateVariant(v.id, { stock: Number(e.target.value) })}
                  />
                  <Input
                    type="number"
                    placeholder="Price"
                    value={v.price}
                    onChange={(e) => updateVariant(v.id, { price: Number(e.target.value) })}
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeVariant(v.id)}>
                    <X size={14} className="text-danger" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Field label="Description (optional)">
          <Textarea rows={3} placeholder="Product description shown on the storefront…" />
        </Field>
      </div>
    </Modal>
  )
}
