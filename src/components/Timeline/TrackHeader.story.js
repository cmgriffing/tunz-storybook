import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TrackHeader from './TrackHeader';

import { song }  from '../../story-data';
const track = song.tracks[0];

storiesOf('TrackHeader', module)
  .add('with text', () => (
    <TrackHeader track={track}></TrackHeader>
  ))