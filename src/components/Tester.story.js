import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Tester from './Tester';

storiesOf('Tester', module)
  .add('with text', () => (
    <Tester onClick={action('clicked')}>Hello Button</Tester>
  ))
  .add('with some emoji', () => (
    <Tester onClick={action('clicked')}><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Tester>
  ));  