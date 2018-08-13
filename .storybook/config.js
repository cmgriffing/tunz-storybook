import { configure } from '@storybook/react';

import "../node_modules/react-md/dist/react-md.green-blue.min.css";

function loadStories() {
  require('../src/story-helpers.js');
  require('../src/components/Tester.story.js');
  require('../src/components/Timeline/Marker.story.js');
  require('../src/components/Timeline/Track.story.js');
  require('../src/components/Timeline/Timeline.story.js');
  require('../src/components/Library/Library.story.js');
  require('../src/components/Library/Loop.story.js');
  require('../src/components/Editor.story.js');
}

configure(loadStories, module);