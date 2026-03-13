import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Stats from '@/components/Stats'
import Products from '@/components/Products'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import Testimonials from '@/components/Testimonials'
import CtaBanner from '@/components/CtaBanner'

export const metadata: Metadata = {
  title: 'Axon — Intelligence Wired Into Every Tool',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Stats />
      <Products />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CtaBanner />
    </>
  )
}
