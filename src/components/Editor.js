import React, { Component } from 'react';
import { Button } from 'react-md';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Library from './Library/Library';
import Timeline from './Timeline/Timeline';

const LibraryWrapper = styled.div`
  width: 300px;
`;

const TimelineWrapper = styled.div`
  width: calc(100% - 300px);
`;

const EditorWrapper = styled.div`
  display: flex;
`;

//@DragDropContextProvider(HTML5Backend)
class Editor extends Component {

  static propTypes = {
    song: PropTypes.object
  }

  static defaultProps = {
    song: {
      bars: 32,
      name: 'Untitled Song',
      tempo: 120,
      tracks: new Array(4).fill().map((item, index) => {
        return {
          id: index,
          order: index,
          markers: [],
          loop: {
            name: `Loop #${index}`,
            id: index,
            file: 'http://localhost:5000/Eamb1e-120.wav'
          }
        };
      })
    }
  }

  render() {

    const { song, loops } = this.props;

    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div>
          <EditorWrapper>
            <LibraryWrapper>
              <Library loops={loops} loopDropped={this.loopDropped}></Library>
            </LibraryWrapper>
            <TimelineWrapper>
              <Timeline song={song}></Timeline>
            </TimelineWrapper>
          </EditorWrapper>
        </div>
      </DragDropContextProvider>
    );
  }

  loopDropped = (event) => {
    console.log('loopDropped at Editor', event);
  }
}

export default Editor;
