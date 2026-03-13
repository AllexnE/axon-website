import type { Metadata } from 'next'
import Docs from '@/components/Docs'

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Everything documented. Nothing assumed. Axon Struct reference and guides.',
}

export default function DocsPage() {
  return (
    <div className="page-inner">
      <Docs standalone />
    </div>
  )
}
