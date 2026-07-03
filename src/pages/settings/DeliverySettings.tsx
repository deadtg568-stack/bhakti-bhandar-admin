import { useState } from 'react'
import { Save, Truck } from 'lucide-react'
import { PageHeader } from '@/components/ui/Misc'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Field, Input } from '@/components/ui/Form'
import { useToast } from '@/context/ToastContext'

export default function DeliverySettings() {
  const toast = useToast()
  const [form, setForm] = useState({ freeLimit: 999, deliveryCharge: 49, codCharge: 25 })

  return (
    <div>
      <PageHeader
        title="Delivery Charges"
        subtitle="Configure free delivery threshold and shipping charges"
        actions={
          <Button size="sm" onClick={() => toast('Delivery settings saved', 'success')}>
            <Save size={14} /> Save Changes
          </Button>
        }
      />

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Shipping Configuration</CardTitle>
          <Truck size={18} className="text-ink-muted" />
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Free Delivery Above (₹)">
            <Input
              type="number"
              value={form.freeLimit}
              onChange={(e) => setForm({ ...form, freeLimit: Number(e.target.value) })}
            />
          </Field>
          <Field label="Delivery Charge (₹)">
            <Input
              type="number"
              value={form.deliveryCharge}
              onChange={(e) => setForm({ ...form, deliveryCharge: Number(e.target.value) })}
            />
          </Field>
          <Field label="COD Charge (₹)">
            <Input
              type="number"
              value={form.codCharge}
              onChange={(e) => setForm({ ...form, codCharge: Number(e.target.value) })}
            />
          </Field>
        </CardContent>
        <div className="border-t border-border px-5 py-3 text-xs text-ink-muted">
          Orders above <span className="font-medium text-ink">₹{form.freeLimit}</span> get free delivery. Orders below
          this pay <span className="font-medium text-ink">₹{form.deliveryCharge}</span> shipping, plus{' '}
          <span className="font-medium text-ink">₹{form.codCharge}</span> extra for Cash on Delivery.
        </div>
      </Card>
    </div>
  )
}
