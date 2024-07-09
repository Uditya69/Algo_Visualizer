import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <style>
      @import
      url('https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap');
    </style>
    <App />
  </React.StrictMode>,
)
