import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { AuthContextProvider } from './contexts/AuthContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { UrlsContextProvider } from './contexts/UrlsContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <UrlsContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UrlsContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
