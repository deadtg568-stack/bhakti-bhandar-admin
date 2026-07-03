import { useState } from 'react'
import { Save, Image as ImageIcon } from 'lucide-react'
import { PageHeader } from '@/components/ui/Misc'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Field, Input, Textarea } from '@/components/ui/Form'
import { useToast } from '@/context/ToastContext'

export default function WebsiteSettings() {
  const toast = useToast()
  const [form, setForm] = useState({
    name: 'Bhakti Bhandar',
    tagline: 'Your trusted store for puja essentials',
    contactEmail: 'support@bhaktibhandar.com',
    contactPhone: '+91 98765 43210',
    address: 'Indore, Madhya Pradesh, India',
    facebook: 'https://facebook.com/bhaktibhandar',
    instagram: 'https://instagram.com/bhaktibhandar',
    whatsapp: 'https://wa.me/919876543210',
    aboutUs: 'Bhakti Bhandar has been serving devotees with authentic puja samagri, idols and spiritual essentials since generations.',
    privacyPolicy: '',
    terms: '',
  })

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function save() {
    toast('Website settings saved', 'success')
  }

  return (
    <div>
      <PageHeader
        title="Website Settings"
        subtitle="Branding, contact details, social links & policy pages"
        actions={
          <Button size="sm" onClick={save}>
            <Save size={14} /> Save Changes
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Website Name">
                  <Input value={form.name} onChange={(e) => set('name', e.target.value)} />
                </Field>
                <Field label="Tagline">
                  <Input value={form.tagline} onChange={(e) => set('tagline', e.target.value)} />
                </Field>
              </div>
              <Field label="About Us">
                <Textarea rows={3} value={form.aboutUs} onChange={(e) => set('aboutUs', e.target.value)} />
              </Field>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Field label="Support Email">
                <Input type="email" value={form.contactEmail} onChange={(e) => set('contactEmail', e.target.value)} />
              </Field>
              <Field label="Phone Number">
                <Input value={form.contactPhone} onChange={(e) => set('contactPhone', e.target.value)} />
              </Field>
              <div className="col-span-2">
                <Field label="Store Address">
                  <Input value={form.address} onChange={(e) => set('address', e.target.value)} />
                </Field>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field label="Facebook">
                <Input value={form.facebook} onChange={(e) => set('facebook', e.target.value)} />
              </Field>
              <Field label="Instagram">
                <Input value={form.instagram} onChange={(e) => set('instagram', e.target.value)} />
              </Field>
              <Field label="WhatsApp">
                <Input value={form.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} />
              </Field>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Policy Pages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field label="Privacy Policy">
                <Textarea rows={4} placeholder="Write your privacy policy…" value={form.privacyPolicy} onChange={(e) => set('privacyPolicy', e.target.value)} />
              </Field>
              <Field label="Terms & Conditions">
                <Textarea rows={4} placeholder="Write your terms & conditions…" value={form.terms} onChange={(e) => set('terms', e.target.value)} />
              </Field>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Logo</CardTitle>
            </CardHeader>
            <CardContent>
              <button className="focus-ring flex h-28 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border text-ink-muted hover:border-gold/50 hover:text-gold-dark dark:hover:text-gold-light">
                <ImageIcon size={20} />
                <span className="text-xs">Upload logo</span>
              </button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Favicon</CardTitle>
            </CardHeader>
            <CardContent>
              <button className="focus-ring flex h-20 w-20 items-center justify-center gap-2 rounded-lg border border-dashed border-border text-ink-muted hover:border-gold/50 hover:text-gold-dark dark:hover:text-gold-light">
                <ImageIcon size={16} />
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
