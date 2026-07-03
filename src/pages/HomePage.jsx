import { useEffect } from 'react'
import { motion } from 'framer-motion'
import SiteScaffold from '../components/site/SiteScaffold'
import HeroSection from '../components/site/HeroSection'
import DailyMantraSection from '../components/site/DailyMantraSection'
import SacredHavanSection from '../components/site/SacredHavanSection'
import ServicesSection from '../components/site/ServicesSection'
import TempleInfoSection from '../components/site/TempleInfoSection'
import FestivalsSection from '../components/site/FestivalsSection'
import GallerySection from '../components/site/GallerySection'
import FAQSection from '../components/site/FAQSection'

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: i * 0.08 }
  })
}

const sections = [
  { id: 'hero', Component: HeroSection },
  { id: 'mantra', Component: DailyMantraSection },
  { id: 'havan', Component: SacredHavanSection },
  { id: 'services', Component: ServicesSection },
  { id: 'temple', Component: TempleInfoSection },
  { id: 'festivals', Component: FestivalsSection },
  { id: 'gallery', Component: GallerySection },
  { id: 'faq', Component: FAQSection }
]

export default function HomePage() {
  return (
    <SiteScaffold>
      {sections.map(({ id, Component }, i) => (
        <motion.div
          key={id}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={sectionVariants}
        >
          <Component />
        </motion.div>
      ))}
    </SiteScaffold>
  )
}
