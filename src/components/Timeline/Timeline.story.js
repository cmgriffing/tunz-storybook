import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProviderDecorator, WebFontDecorator } from '../../story-helpers';

import Timeline from './Timeline';

import { song } from '../../story-data';

storiesOf('Timeline', module)
  .add('works',() => (
    <Timeline song={song}></Timeline>
  ));