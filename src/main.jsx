import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MyStoreProvider } from './MyStoreContext.jsx'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClinet = new QueryClient();
createRoot(document.getElementById('root')).render(
  <MyStoreProvider>
    <QueryClientProvider client={queryClinet}>
         <App />
    </QueryClientProvider>
    
  </MyStoreProvider>
)
