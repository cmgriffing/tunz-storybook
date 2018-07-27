import { configure } from '@storybook/react';

const glob = require('glob');

function loadStories() {
  const stories = glob.sync('../**/*.story.js');

  stories.map(storyPath => {
    console.log('requiring story', storyPath);
    require(storyPath);
  })
}

configure(loadStories, module);