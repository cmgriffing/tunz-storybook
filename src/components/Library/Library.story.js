import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Library from './Library';

storiesOf('Library', module)
  .add('with text', () => (
    <Library>Hello Button</Library>
  ));