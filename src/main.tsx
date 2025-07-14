import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { Toaster } from '@/components/ui/toaster'
import { MenuProvider } from './contexts/MenuContext' // Import MenuProvider

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <CartProvider>
      <MenuProvider> {/* Wrap with MenuProvider */}
        <App />
        <Toaster />
      </MenuProvider>
    </CartProvider>
  </AuthProvider>
);
