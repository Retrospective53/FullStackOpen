import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from './App'

const queryCLient = new QueryClient

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryCLient}>
    <App />
  </QueryClientProvider>
)