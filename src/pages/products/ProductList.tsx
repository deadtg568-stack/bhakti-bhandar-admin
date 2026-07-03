import { useMemo, useState } from 'react'
import { Plus, Search, Upload, Download, Trash2, Pencil, ImageOff } from 'lucide-react'
import { PageHeader } from '@/components/ui/Misc'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Select, Checkbox } from '@/components/ui/Form'
import { Badge } from '@/components/ui/Badge'
import { Table, Thead, Th, Tr, Td } from '@/components/ui/Table'
import { Pagination } from '@/components/ui/Pagination'
import { EmptyState } from '@/components/ui/Misc'
import { products as allProducts, categories } from '@/data/products'
import { formatINR } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'
import { ProductFormModal } from './ProductForm'
import type { Product } from '@/types'

const PAGE_SIZE = 10

const statusTone: Record<Product['status'], 'success' | 'neutral' | 'danger'> = {
  active: 'success',
  draft: 'neutral',
  out_of_stock: 'danger',
}
const statusLabel: Record<Product['status'], string> = {
  active: 'Active',
  draft: 'Draft',
  out_of_stock: 'Out of Stock',
}

export default function ProductList() {
  const toast = useToast()
  const [items, setItems] = useState<Product[]>(allProducts)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [status, setStatus] = useState('all')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)

  const filtered = useMemo(() => {
    return items.filter((p) => {
      const matchesQuery =
        query.trim() === '' ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.sku.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === 'all' || p.category === category
      const matchesStatus = status === 'all' || p.status === status
      return matchesQuery && matchesCategory && matchesStatus
    })
  }, [items, query, category, status])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function toggleAll() {
    if (selected.size === pageItems.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(pageItems.map((p) => p.id)))
    }
  }

  function toggleOne(id: string) {
    const next = new Set(selected)
    next.has(id) ? next.delete(id) : next.add(id)
    setSelected(next)
  }

  function bulkDelete() {
    setItems((prev) => prev.filter((p) => !selected.has(p.id)))
    toast(`Deleted ${selected.size} product(s)`, 'success')
    setSelected(new Set())
  }

  function saveProduct(product: Product) {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === product.id)
      return exists ? prev.map((p) => (p.id === product.id ? product : p)) : [product, ...prev]
    })
    toast(editing ? 'Product updated' : 'Product added', 'success')
    setFormOpen(false)
    setEditing(null)
  }

  return (
    <div>
      <PageHeader
        title="Products"
        subtitle={`${items.length} products in catalog`}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Upload size={14} /> Bulk Import
            </Button>
            <Button variant="outline" size="sm">
              <Download size={14} /> Export
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setEditing(null)
                setFormOpen(true)
              }}
            >
              <Plus size={14} /> Add Product
            </Button>
          </>
        }
      />

      <Card>
        <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
          <div className="relative min-w-[220px] flex-1">
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
            <Input
              placeholder="Search by name or SKU…"
              className="pl-9"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setPage(1)
              }}
            />
          </div>
          <Select
            className="w-48"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value)
              setPage(1)
            }}
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </Select>
          <Select
            className="w-40"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
              setPage(1)
            }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="out_of_stock">Out of Stock</option>
          </Select>

          {selected.size > 0 && (
            <Button variant="danger" size="sm" onClick={bulkDelete}>
              <Trash2 size={14} /> Delete ({selected.size})
            </Button>
          )}
        </div>

        {pageItems.length === 0 ? (
          <EmptyState title="No products found" subtitle="Try adjusting your search or filters." icon={<ImageOff size={20} />} />
        ) : (
          <Table>
            <Thead>
              <Tr>
                <Th className="w-10">
                  <Checkbox checked={selected.size === pageItems.length} onChange={toggleAll} />
                </Th>
                <Th>Product</Th>
                <Th>SKU</Th>
                <Th>Category</Th>
                <Th>Stock</Th>
                <Th>Price</Th>
                <Th>Status</Th>
                <Th className="text-right">Actions</Th>
              </Tr>
            </Thead>
            <tbody>
              {pageItems.map((p) => (
                <Tr key={p.id}>
                  <Td>
                    <Checkbox checked={selected.has(p.id)} onChange={() => toggleOne(p.id)} />
                  </Td>
                  <Td>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface2 text-ink-muted">
                        <ImageOff size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-ink">{p.name}</p>
                        <p className="text-xs text-ink-muted">{p.brand}</p>
                      </div>
                    </div>
                  </Td>
                  <Td className="text-ink-muted">{p.sku}</Td>
                  <Td>{p.category}</Td>
                  <Td>
                    <span className={p.stock === 0 ? 'font-medium text-danger' : ''}>{p.stock}</span>
                  </Td>
                  <Td>
                    <span className="font-medium">{formatINR(p.price)}</span>
                    {p.discountPct > 0 && <span className="ml-1.5 text-xs text-ink-muted line-through">{formatINR(p.mrp)}</span>}
                  </Td>
                  <Td>
                    <Badge tone={statusTone[p.status]}>{statusLabel[p.status]}</Badge>
                  </Td>
                  <Td className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditing(p)
                        setFormOpen(true)
                      }}
                    >
                      <Pencil size={15} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setItems((prev) => prev.filter((x) => x.id !== p.id))
                        toast('Product deleted', 'success')
                      }}
                    >
                      <Trash2 size={15} className="text-danger" />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}

        <Pagination page={page} totalPages={totalPages} onChange={setPage} totalItems={filtered.length} pageSize={PAGE_SIZE} />
      </Card>

      <ProductFormModal
        open={formOpen}
        product={editing}
        onClose={() => {
          setFormOpen(false)
          setEditing(null)
        }}
        onSave={saveProduct}
      />
    </div>
  )
}
