import { useState } from 'react'
import { Save } from 'lucide-react'
import { PageHeader } from '@/components/ui/Misc'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Field, Input, Textarea } from '@/components/ui/Form'
import { useToast } from '@/context/ToastContext'

export default function GeneralSettings() {
  const toast = useToast()
  const [form, setForm] = useState({
    gstNumber: '23AAAAA0000A1Z5',
    defaultGst: 5,
    deliveryTime: '3–5 business days',
    businessOpen: '09:00',
    businessClose: '20:00',
    metaTitle: 'Bhakti Bhandar — Puja Samagri, Idols & Spiritual Essentials',
    metaDescription: 'Shop authentic puja thalis, hawan samagri, idols, incense and more — delivered across India.',
  })

  function set<K extends keyof typeof form>(key: K, value: string | number) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  return (
    <div>
      <PageHeader
        title="General Settings"
        subtitle="GST, shipping, delivery time, business hours & SEO"
        actions={
          <Button size="sm" onClick={() => toast('Settings saved', 'success')}>
            <Save size={14} /> Save Changes
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tax & Shipping</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="GST Number (GSTIN)">
              <Input value={form.gstNumber} onChange={(e) => set('gstNumber', e.target.value)} />
            </Field>
            <Field label="Default GST Rate (%)">
              <Input type="number" value={form.defaultGst} onChange={(e) => set('defaultGst', Number(e.target.value))} />
            </Field>
            <Field label="Estimated Delivery Time">
              <Input value={form.deliveryTime} onChange={(e) => set('deliveryTime', e.target.value)} />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Hours</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Field label="Opens At">
              <Input type="time" value={form.businessOpen} onChange={(e) => set('businessOpen', e.target.value)} />
            </Field>
            <Field label="Closes At">
              <Input type="time" value={form.businessClose} onChange={(e) => set('businessClose', e.target.value)} />
            </Field>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Meta Title">
              <Input value={form.metaTitle} onChange={(e) => set('metaTitle', e.target.value)} />
            </Field>
            <Field label="Meta Description">
              <Textarea rows={3} value={form.metaDescription} onChange={(e) => set('metaDescription', e.target.value)} />
            </Field>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
