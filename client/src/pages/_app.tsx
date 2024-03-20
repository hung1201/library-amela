import { AppProps } from 'next/app';
import * as React from 'react';
import 'tailwindcss/tailwind.css';
import { AuthProvider } from '../services/Auth.context';
import QueryClientProvider from '../services/QueryClient';

import './global.css';
import { NextPageWithLayout } from '../components/layout/LayoutContainers';
import { ModalProvider } from '../services/ModalProvider';
import ModalVerifyAction from '../components/ModalVerifyAction';
import ThemeProvider from '../services/ThemeProvider';
import { SnackbarProvider } from 'notistack';
export interface IAppProps extends Omit<AppProps, 'Component'> {
  pageProps: { [key: string]: any };
  Component: NextPageWithLayout;
}
function MyApp({ Component, pageProps }: IAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <QueryClientProvider>
      <ThemeProvider>
        <AuthProvider>
          <SnackbarProvider
            autoHideDuration={3000}
            disableWindowBlurListener={true}
            maxSnack={2}
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
          >
            <ModalProvider>
              {getLayout(<Component {...(pageProps as any)} />)}
              <ModalVerifyAction />
            </ModalProvider>
          </SnackbarProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
