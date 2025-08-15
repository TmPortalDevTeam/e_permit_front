import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Provider from './providers';
import router from '../router'
import "@/assets/boxicons-2.0.7/css/boxicons.min.css";
import '@/shared/index.css';

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider />
  </StrictMode>,
);
