import { useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppFloat from './WhatsAppFloat'

export default function SiteScaffold({ children, showFooter = true }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />
      <main className="pt-16 sm:pt-20">
        {children}
      </main>
      {showFooter && <Footer />}
      <WhatsAppFloat />
    </div>
  )
}
