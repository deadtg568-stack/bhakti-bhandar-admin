import React, { Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const HomePage = React.lazy(() => import('./pages/HomePage'))
const AboutPage = React.lazy(() => import('./pages/AboutPage'))
const BookPujaPage = React.lazy(() => import('./pages/BookPujaPage'))
const LiveDarshanPage = React.lazy(() => import('./pages/LiveDarshanPage'))
const FestivalsPage = React.lazy(() => import('./pages/FestivalsPage'))
const GalleryPage = React.lazy(() => import('./pages/GalleryPage'))
const DonatePage = React.lazy(() => import('./pages/DonatePage'))
const ContactPage = React.lazy(() => import('./pages/ContactPage'))
const HawanSamagriPage = React.lazy(() => import('./pages/HawanSamagriPage'))
const OnlinePurchasePage = React.lazy(() => import('./pages/OnlinePurchasePage'))
const PrintingPage = React.lazy(() => import('./pages/PrintingPage'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function RouteFallback() {
  return (
    <div className="min-h-screen bg-ink flex items-center justify-center">
      <div className="text-center">
        <span className="text-4xl font-heading font-semibold text-gold">ॐ</span>
        <p className="text-text-secondary font-body mt-4">Loading...</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.4 } }} exit={{ opacity: 0, transition: { duration: 0.2 } }}>
                <HomePage />
              </motion.div>
            } />
            <Route path="/about" element={
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }} exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}>
                <AboutPage />
              </motion.div>
            } />
            <Route path="/book-puja" element={
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }} exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}>
                <BookPujaPage />
              </motion.div>
            } />
            <Route path="/live-darshan" element={
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }} exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}>
                <LiveDarshanPage />
              </motion.div>
            } />
            <Route path="/festivals" element={
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }} exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}>
                <FestivalsPage />
              </motion.div>
            } />
            <Route path="/gallery" element={
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }} exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}>
                <GalleryPage />
              </motion.div>
            } />
            <Route path="/donate" element={
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }} exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}>
                <DonatePage />
              </motion.div>
            } />
            <Route path="/contact" element={
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }} exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}>
                <ContactPage />
              </motion.div>
            } />
            <Route path="/hawan-samagri" element={
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }} exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}>
                <HawanSamagriPage />
              </motion.div>
            } />
            <Route path="/online-purchase" element={
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }} exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}>
                <OnlinePurchasePage />
              </motion.div>
            } />
            <Route path="/printing" element={
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }} exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}>
                <PrintingPage />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </div>
  )
}
