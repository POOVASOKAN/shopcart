import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
//20.Importing the Cart Context Provider
import { CartProvider } from './context/Cart.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
    <App />
    </CartProvider>
  </React.StrictMode>,
)
