import { type ClassValue, clsx } from 'clsx'

/** Merge class names safely */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

/** Copy text to clipboard and run a callback */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/** Format bytes to human-readable string */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/** Animate a number from 0 to target using requestAnimationFrame */
export function animateNumber(
  target: number,
  onUpdate: (value: number) => void,
  duration = 1200
) {
  const start = performance.now()
  function tick(now: number) {
    const progress = Math.min((now - start) / duration, 1)
    const ease = 1 - Math.pow(1 - progress, 3) // ease-out cubic
    onUpdate(Math.round(ease * target))
    if (progress < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}
