import { MessageCircle } from 'lucide-react'
import { siteContent } from '../../data/content'

export default function WhatsAppFloat() {
  const whatsappUrl = `https://wa.me/${siteContent.whatsapp}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:rotate-6 transition-all duration-300 animate-[pulse_2s_ease-in-out_infinite]"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} className="text-white" />
    </a>
  )
}
