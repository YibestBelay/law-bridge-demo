'use client'

import Layout from '@/components/shared/layout'
import Hero from '@/components/Hero'
import ValueProposition from '@/components/ValueProposition'
import HowItWorks from '@/components/HowItWorks'
import FeaturedLawyers from '@/components/FeaturedLawyers'
import CTABanner from '@/components/CTABanner'
import Footer from '@/components/Footer'
import MobileNav from '@/components/MobileNav'

export default function Home() {
  return (
    <Layout>
      <div className="min-h-screen bg-white pb-16 md:pb-0">
        <Hero />
        <ValueProposition />
        <HowItWorks />
        <FeaturedLawyers />
  
      
        
        <CTABanner />
        <Footer />
        <MobileNav />
      </div>
    </Layout>
  )
}

