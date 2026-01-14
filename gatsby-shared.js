import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GitHubAuthProvider } from './src/contexts/GitHubAuthContext';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export const wrapRootElement = ({ element }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GitHubAuthProvider>{element}</GitHubAuthProvider>
    </QueryClientProvider>
  );
};
