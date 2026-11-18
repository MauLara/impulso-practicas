import React from 'react'
import ReactDOM from 'react-dom/client'
import { install } from '@twind/core'
import config from './core/theme/twind.config'
import App from './App'

install(config)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
