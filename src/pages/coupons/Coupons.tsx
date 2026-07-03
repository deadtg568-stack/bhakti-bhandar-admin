import { useState } from 'react'
import { Plus, Trash2, Percent, IndianRupee } from 'lucide-react'
import { PageHeader } from '@/components/ui/Misc'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Field, Input, Select } from '@/components/ui/Form'
import { Table, Thead, Th, Tr, Td } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { coupons as initial } from '@/data/store'
import { formatDate } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'
import type { Coupon } from '@/types'

const empty: Coupon = { id: '', code: '', type: 'flat', value: 0, expiryDate: '', usageLimit: 100, usedCount: 0, active: true }

export default function Coupons() {
  const toast = useToast()
  const [items, setItems] = useState<Coupon[]>(initial)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<Coupon>(empty)

  function save() {
    setItems((prev) => [{ ...form, id: `cp${Date.now()}` }, ...prev])
    toast('Coupon created', 'success')
    setOpen(false)
    setForm(empty)
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((c) => c.id !== id))
    toast('Coupon removed', 'success')
  }

  const isExpired = (date: string) => new Date(date) < new Date('2026-07-02')

  return (
    <div>
      <PageHeader
        title="Coupons"
        subtitle={`${items.length} coupons`}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            <Plus size={14} /> Create Coupon
          </Button>
        }
      />

      <Card>
        <Table>
          <Thead>
            <Tr>
              <Th>Code</Th>
              <Th>Discount</Th>
              <Th>Expiry</Th>
              <Th>Usage</Th>
              <Th>Status</Th>
              <Th className="text-right">Action</Th>
            </Tr>
          </Thead>
          <tbody>
            {items.map((c) => {
              const expired = isExpired(c.expiryDate)
              return (
                <Tr key={c.id}>
                  <Td>
                    <span className="rounded-md bg-surface2 px-2 py-1 font-mono text-xs font-semibold text-ink">{c.code}</span>
                  </Td>
                  <Td>
                    <span className="flex items-center gap-1">
                      {c.type === 'flat' ? <IndianRupee size={13} /> : <Percent size={13} />}
                      {c.value}
                      {c.type === 'percentage' ? '% off' : ' off'}
                    </span>
                  </Td>
                  <Td className={expired ? 'text-danger' : 'text-ink-muted'}>{formatDate(c.expiryDate)}</Td>
                  <Td>
                    {c.usedCount} / {c.usageLimit}
                  </Td>
                  <Td>
                    <Badge tone={!c.active ? 'neutral' : expired ? 'danger' : 'success'}>
                      {!c.active ? 'Disabled' : expired ? 'Expired' : 'Active'}
                    </Badge>
                  </Td>
                  <Td className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => remove(c.id)}>
                      <Trash2 size={15} className="text-danger" />
                    </Button>
                  </Td>
                </Tr>
              )
            })}
          </tbody>
        </Table>
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Create Coupon"
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={save}>Create Coupon</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Coupon Code">
            <Input
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
              placeholder="e.g. FESTIVE20"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Discount Type">
              <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Coupon['type'] })}>
                <option value="flat">Flat Discount (₹)</option>
                <option value="percentage">Percentage Discount (%)</option>
              </Select>
            </Field>
            <Field label="Value">
              <Input type="number" value={form.value} onChange={(e) => setForm({ ...form, value: Number(e.target.value) })} />
            </Field>
            <Field label="Expiry Date">
              <Input type="date" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} />
            </Field>
            <Field label="Usage Limit">
              <Input type="number" value={form.usageLimit} onChange={(e) => setForm({ ...form, usageLimit: Number(e.target.value) })} />
            </Field>
          </div>
        </div>
      </Modal>
    </div>
  )
}
