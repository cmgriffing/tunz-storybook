import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProviderDecorator, WebFontDecorator } from '../../story-helpers';

import Track from './Track';

storiesOf('Track', module)
  .addDecorator(WebFontDecorator)
  .addDecorator(ThemeProviderDecorator)
  .add('works',() => (
    <Track></Track>
  ));