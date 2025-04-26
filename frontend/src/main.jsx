import React from 'react'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './components/context/Appcontext.jsx'



createRoot(document.getElementById('root')).render(
   <AppProvider>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </AppProvider>
)
