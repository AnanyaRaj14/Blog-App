import React from 'react'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
   
      <BrowserRouter>
         <CookiesProvider>
            <App/>
         </CookiesProvider>
      </BrowserRouter>
   
    

)
