import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { siteContent } from '../../data/content'

const FacebookIcon = ({ size = 18, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const InstagramIcon = ({ size = 18, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const YoutubeIcon = ({ size = 18, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
}

const colVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

export default function Footer() {
  return (
    <footer className="bg-ink-secondary border-t border-gold/20 pt-16 pb-8">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <motion.div
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: '-50px' }}
           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
         >
          <motion.div variants={colVariants}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl font-heading font-semibold text-gold">ॐ</span>
              <div>
                <h3 className="text-lg font-heading font-semibold text-text-primary">
                  Maa Baglamukhi Mandir
                </h3>
              </div>
            </div>
             <p className="text-text-secondary text-sm leading-relaxed">
               Maa Baglamukhi Mandir<br />
               {siteContent.address.line1}<br />
               {siteContent.address.line2}<br />
               {siteContent.address.city}<br />
               {siteContent.address.state}
             </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://www.facebook.com/share/17gL2NVp1u/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-secondary hover:bg-gold hover:text-ink transition-all duration-300"
                aria-label="Facebook"
              >
                <FacebookIcon size={18} />
              </a>
              <a
                href="https://www.instagram.com/maa_baglamukhi_blessings_108?utm_source=qr&igsh=aGgyOGJ3bWVnc3I1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-secondary hover:bg-gold hover:text-ink transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-secondary hover:bg-gold hover:text-ink transition-all duration-300"
                aria-label="Youtube"
              >
                <YoutubeIcon size={18} />
              </a>
            </div>
          </motion.div>

          <motion.div variants={colVariants}>
            <h3 className="text-lg font-heading font-semibold text-gold mb-5 border-b border-gold/20 pb-2 inline-block">
              Quick Links
            </h3>
            <div className="space-y-3">
              {siteContent.navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-text-secondary hover:text-gold transition-colors text-sm font-body"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div variants={colVariants}>
            <h3 className="text-lg font-heading font-semibold text-gold mb-5 border-b border-gold/20 pb-2 inline-block">
              Temple Services
            </h3>
            <div className="space-y-3">
              {siteContent.services.map((service, i) => (
                <p key={i} className="text-text-secondary text-sm font-body">
                  {service.title}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.div variants={colVariants}>
            <h3 className="text-lg font-heading font-semibold text-gold mb-5 border-b border-gold/20 pb-2 inline-block">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <a href={`tel:${siteContent.phone}`} className="flex items-center gap-3 text-text-secondary hover:text-gold transition-colors text-sm">
                <Phone size={14} className="text-gold shrink-0" />
                {siteContent.phone}
              </a>
              <a href={`tel:${siteContent.phoneAlt1}`} className="flex items-center gap-3 text-text-secondary hover:text-gold transition-colors text-sm">
                <Phone size={14} className="text-gold shrink-0" />
                {siteContent.phoneAlt1}
              </a>
              <a href={`tel:${siteContent.phoneAlt2}`} className="flex items-center gap-3 text-text-secondary hover:text-gold transition-colors text-sm">
                <Phone size={14} className="text-gold shrink-0" />
                {siteContent.phoneAlt2}
              </a>
              <a href={`mailto:${siteContent.email}`} className="flex items-center gap-3 text-text-secondary hover:text-gold transition-colors text-sm">
                <Mail size={14} className="text-gold shrink-0" />
                {siteContent.email}
              </a>
               <div className="flex items-start gap-3 text-text-secondary text-sm">
                 <MapPin size={14} className="text-gold shrink-0 mt-1" />
                 <div className="whitespace-pre-line">
                   ॐ<br />
                   Maa Baglamukhi Mandir<br />
                   {siteContent.address.line1}<br />
                   {siteContent.address.line2}<br />
                   {siteContent.address.city}<br />
                   {siteContent.address.state}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="border-t border-white/5 mt-12 pt-6 text-center"
        >
          <p className="text-text-secondary/60 text-xs font-body">
            &copy; {new Date().getFullYear()} Maa Baglamukhi Mandir Trust. All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
