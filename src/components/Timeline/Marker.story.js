import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProviderDecorator, WebFontDecorator } from '../../story-helpers';

import Marker from './Marker';

storiesOf('Marker', module)
  .add('works',() => (
    <Marker></Marker>
  ));