import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NexusProvider } from './context-api/ContextAPI.jsx'


createRoot(document.getElementById('root')).render(
   <NexusProvider>
       <App />
   </NexusProvider>
)
