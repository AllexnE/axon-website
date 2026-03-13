import type { Metadata } from 'next'
import Download from '@/components/Download'

export const metadata: Metadata = {
  title: 'Download',
  description: 'Download Axon for Windows, macOS, or Linux. Native installer. No JRE required.',
}

export default function DownloadPage() {
  return (
    <div className="page-inner">
      <Download standalone />
    </div>
  )
}
