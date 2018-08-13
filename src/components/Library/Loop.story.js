import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Loop from './Loop';

storiesOf('Loop', module)
  .add('with text', () => (
    <Loop>Loop 1</Loop>
  ));