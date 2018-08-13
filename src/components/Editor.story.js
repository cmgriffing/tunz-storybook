import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Editor from './Editor';

import { song, loops } from '../story-data';

storiesOf('Editor', module)
  .add('with text', () => (
    <Editor song={song} loops={loops}></Editor>
  ));