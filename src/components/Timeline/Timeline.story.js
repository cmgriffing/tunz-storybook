import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProviderDecorator, WebFontDecorator } from '../../story-helpers';

import Timeline from './Timeline';

const song = {
  bars: 32,
  name: 'Untitled Song',
  tempo: 120,
  tracks: new Array(4).fill()
}

storiesOf('Timeline', module)
  .addDecorator(WebFontDecorator)
  .addDecorator(ThemeProviderDecorator)
  .add('works',() => (
    <Timeline song={song}></Timeline>
  ));