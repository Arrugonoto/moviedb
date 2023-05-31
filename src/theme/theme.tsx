import { createTheme } from '@nextui-org/react';

export const lightTheme = createTheme({
   type: 'light',
   theme: {
      colors: {
         // primary
         violet100: '#FACDF0',
         violet200: '#F59DE8',
         violet300: '#E268DA',
         violet400: '#C340C5',
         violet500: '#9210A0',
         violet600: '#730B89',
         violet700: '#730B89',
         violet800: '#3E055C',
         violet900: '#2D034C',

         // secondary
         secondary100: '#F8F9FE',
         secondary200: '#F1F3FE',
         secondary300: '#EAEDFE',
         secondary400: '#E4E8FE',
         secondary500: '#DCE0FE',
         secondary600: '#A0A6DA',
         secondary700: '#6E75B6',
         secondary800: '#464C93',
         secondary900: '#2A2F79',

         // accent
         accent100: '#D7FAFD',
         accent200: '#B0F0FB',
         accent300: '#86DDF3',
         accent400: '#66C4E7',
         accent500: '#37A2D7',
         accent600: '#287FB8',
         accent700: '#1B609A',
         accent800: '#11447C',
         accent900: '#0A3067',

         // color variables/ branding color
         primaryLight: '$violet200',
         primaryLightHover: '$violet300', // commonly used on hover state
         primaryLightActive: '$violet400', // commonly used on pressed state
         primaryLightContrast: '$violet600', // commonly used for text inside the component
         primary: '$violet500',
         primaryBorder: '$violet500',
         primaryBorderHover: '$violet600',
         primarySolidHover: '$violet700',
         primarySolidContrast: '$white', // commonly used for text inside the component
         primaryShadow: '$violet500',
      },
   },
});

export const darkTheme = createTheme({
   type: 'dark',
   theme: {
      colors: {
         // neutral text and background
         white: '#ffffff',
         black: '#000000',

         // background colors
         background: '#080808',
         backgroundAlpha: 'rgba(8, 8, 8, 0.8)',
         foreground: '#fafafa',
         backgroundContrast: '#080808',

         // primary
         violet100: '#FACDF0',
         violet200: '#F59DE8',
         violet300: '#E268DA',
         violet400: '#C340C5',
         violet500: '#9210A0',
         violet600: '#730B89',
         violet700: '#730B89',
         violet800: '#3E055C',
         violet900: '#2D034C',

         // secondary
         secondary100: '#F8F9FE',
         secondary200: '#F1F3FE',
         secondary300: '#EAEDFE',
         secondary400: '#E4E8FE',
         secondary500: '#DCE0FE',
         secondary600: '#A0A6DA',
         secondary700: '#6E75B6',
         secondary800: '#464C93',
         secondary900: '#2A2F79',

         // accent
         accent100: '#D7FAFD',
         accent200: '#B0F0FB',
         accent300: '#86DDF3',
         accent400: '#66C4E7',
         accent500: '#37A2D7',
         accent600: '#287FB8',
         accent700: '#1B609A',
         accent800: '#11447C',
         accent900: '#0A3067',

         // color variables/ branding color
         primaryLight: '$violet200',
         primaryLightHover: '$violet300', // commonly used on hover state
         primaryLightActive: '$violet400', // commonly used on pressed state
         primaryLightContrast: '$violet600', // commonly used for text inside the component
         primary: '$violet500',
         primaryBorder: '$violet500',
         primaryBorderHover: '$violet600',
         primarySolidHover: '$violet700',
         primarySolidContrast: '$white', // commonly used for text inside the component
         primaryShadow: '$violet500',
      },
   },
});
