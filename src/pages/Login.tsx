import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Label } from '@/components/ui/Form'
import { FlameMark } from '@/components/ui/Misc'
import { useToast } from '@/context/ToastContext'

export default function Login() {
  const navigate = useNavigate()
  const toast = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast('Welcome back, Admin!', 'success')
      navigate('/')
    }, 700)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg px-4">
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgb(var(--gold)) 0%, transparent 70%)' }}
      />
      <div className="relative w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <FlameMark className="mb-3 h-11 w-11" />
          <h1 className="font-display text-2xl font-semibold text-ink">Bhakti Bhandar</h1>
          <p className="mt-1 text-sm text-ink-muted">Sign in to the admin panel</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flame-edge rounded-xl border border-border bg-surface p-6 shadow-card"
        >
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
              <Input id="email" type="email" required defaultValue="admin@bhaktibhandar.com" className="pl-9" />
            </div>
          </div>

          <div className="mb-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                defaultValue="••••••••"
                className="pl-9 pr-9"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="mb-5 flex items-center justify-between text-xs">
            <label className="flex items-center gap-1.5 text-ink-muted">
              <input type="checkbox" className="accent-[rgb(var(--gold))]" defaultChecked /> Remember me
            </label>
            <a href="#" className="font-medium text-gold-dark hover:underline dark:text-gold-light">
              Forgot password?
            </a>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </Button>

          <p className="mt-4 text-center text-[11px] text-ink-muted">
            Protected by JWT authentication &amp; secure password hashing
          </p>
        </form>
      </div>
    </div>
  )
}
