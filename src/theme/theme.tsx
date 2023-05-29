import { createTheme } from '@nextui-org/react';

export const lightTheme = createTheme({
   type: 'light',
   theme: {
      colors: {},
   },
});

export const darkTheme = createTheme({
   type: 'dark',
   theme: {
      colors: {
         white: '#ffffff',
         black: '#000000',
         background: '#080808',
         backgroundAlpha: 'rgba(8, 8, 8, 0.8)',
         foreground: '#fafafa',
         backgroundContrast: '#080808',
      },
   },
});
