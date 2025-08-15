import { Toaster } from 'react-hot-toast';
import { RouterProvider } from '@tanstack/react-router';
import QueryClientProvider from './QueryClientProvider';
import ThemeProvider from './ThemeProvider';
import TranslationProvider from './TranslationProvider';
import router from '@/router';

function Providers() {
  return (
    <QueryClientProvider>
      <TranslationProvider>
        <ThemeProvider>
          <Toaster position='top-right' />
          <RouterProvider router={router} />
        </ThemeProvider>
      </TranslationProvider>
    </QueryClientProvider>
  )
}

export default Providers;