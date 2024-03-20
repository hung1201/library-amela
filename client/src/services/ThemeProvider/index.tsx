import { ThemeProvider as ThemeProviderMui, createTheme } from '@material-ui/core';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
  return (
    <ThemeProviderMui
      theme={createTheme({
        palette: {
          primary: {
            main: '#1C1E53',
            light: '#4b4d7e',
            dark: '#000027',
            contrastText: '#fff'
          },
          secondary: {
            main: '#FCD980',
            light: '#ffebc3',
            dark: '#d7ab52',
            contrastText: '#000'
          }
        }
      })}
    >
      {children}
    </ThemeProviderMui>
  );
};

export default ThemeProvider;
