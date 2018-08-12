import React from 'react';
import { addDecorator } from '@storybook/react';

import { ThemeProvider } from 'styled-components';
import theme from './theme';

import * as WebFont from 'webfontloader';

export const ThemeProviderDecorator = (storyFn) => {
  return (
    <ThemeProvider theme={theme}>
      { storyFn() }
    </ThemeProvider>
  );
};

addDecorator(ThemeProviderDecorator);


export const WebFontDecorator = (storyFn) => {

  WebFont.load({
    google: {
      families: ['Material Icons', 'Roboto']
    }
  });

  return storyFn();
}

addDecorator(WebFontDecorator);
