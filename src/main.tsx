import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Every route is prerendered to static HTML (scripts/prerender.ts), so hydrate
// that markup instead of throwing it away and re-rendering — re-rendering made
// the hero image (the LCP element) wait for the whole JS bundle to load.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
