import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3
    }
  }
});

interface IQueryProviderProps {
  children: React.ReactNode;
}

const QueryProvider = ({ children }: IQueryProviderProps) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default React.memo(QueryProvider);
