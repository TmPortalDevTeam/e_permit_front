import type { ReactNode } from 'react';
import { QueryClientProvider as TanStackQueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib';

type QueryClientProviderProps = {
   children: ReactNode;
};

function QueryClientProvider(props: QueryClientProviderProps) {
   const { children } = props;
   return (
      <TanStackQueryClientProvider client={queryClient}>
         {children}
      </TanStackQueryClientProvider>
   );
}

export default QueryClientProvider;