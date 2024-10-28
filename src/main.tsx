import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GoogleSignInButton from "./components/authpage.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <GoogleSignInButton />
  </StrictMode>,
)
