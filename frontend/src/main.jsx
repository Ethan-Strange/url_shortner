import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UrlProvider } from '../context/urlContext.jsx'

createRoot(document.getElementById('root')).render(
  <UrlProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </UrlProvider>
)
