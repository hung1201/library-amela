import { AppProps } from 'next/app';
import * as React from 'react';
import 'tailwindcss/tailwind.css';
import { AuthProvider } from '../services/Auth.context';
import { GlobalMessagingProvider } from '../services/GlobalMessaging.context';
import QueryClientProvider from '../services/QueryClient';

import './global.css';
import { NextPageWithLayout } from '../components/layout/LayoutContainers';
export interface IAppProps extends Omit<AppProps, 'Component'> {
  pageProps: { [key: string]: any };
  Component: NextPageWithLayout;
}
function MyApp({ Component, pageProps }: IAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <QueryClientProvider>
      <AuthProvider>
        <GlobalMessagingProvider>
          {getLayout(<Component {...(pageProps as any)} />)}
        </GlobalMessagingProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
