import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Vercel Web Analytics, plain-script setup (no package). Vercel serves the
// script once Analytics is enabled for the project; production builds only.
if (import.meta.env.PROD) {
  const w = window as unknown as { va?: (...args: unknown[]) => void; vaq?: unknown[] }
  w.va = w.va || ((...args: unknown[]) => { (w.vaq = w.vaq || []).push(args) })
  const s = document.createElement('script')
  s.src = '/_vercel/insights/script.js'
  s.defer = true
  document.head.appendChild(s)
}

createRoot(document.getElementById('root')!).render(<App />)
