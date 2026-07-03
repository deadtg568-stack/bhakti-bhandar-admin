import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { CartProvider } from './context/CartContext'
import { MusicProvider } from './context/MusicContext'
import CartDrawer from './components/cart/CartDrawer'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MusicProvider>
        <CartProvider>
          <App />
          <CartDrawer />
        </CartProvider>
      </MusicProvider>
    </BrowserRouter>
  </React.StrictMode>
);