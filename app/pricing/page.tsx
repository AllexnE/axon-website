import type { Metadata } from 'next'
import Pricing from '@/components/Pricing'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Start free. Grow with Axon. All core intelligence is free forever.',
}

export default function PricingPage() {
  return (
    <div className="page-inner">
      <Pricing standalone />
    </div>
  )
}
