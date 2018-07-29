import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import Track from './Track';
import TimelineToolbar from './Toolbar';

const TimelineElement = styled.div`
  width: 100%;
  overflow: scroll;
  background: #CCC;
  min-height: 400px;
`;

const TimelineElementWrapper = styled.div`
  width: calc(100% - 300px);
  overflow: scroll;
`;

const TimelineToolbarWrapper = styled.div`

`;

const TrackHeader = styled.div`
  height: 100px;
`;

const TrackName = styled.h3`

`;

const TimelineHeader = styled.div`
  width: 300px;
  flex-grow: 1;
`;

const TimelineWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

class Timeline extends Component {

  static propTypes = {
    song: PropTypes.object,
  }

  static defaultProps = {
    song: {
      bars: 4,
      name: 'Untitled Song',
      tempo: 140,
      tracks: new Array(4).fill()
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      scale: 1.0,
      currentTool: 'paint'
    };
  }

  render() {

    const { song } = this.props;
    const { scale, currentTool } = this.state;

    const Tracks = song.tracks.map((track, index) => {
      return (
        <Track
          key={index}
          bars={song.bars}
          tempo={song.tempo}
          scale={scale}
          currentTool={currentTool}
        ></Track>
      )
    });

    console.log('song.tracks:', song.tracks);
    const TrackHeaders = song.tracks.map((track, index) => {
      return (
        <TrackHeader key={index}>
          <h3>Unititled Track {index + 1}</h3>
        </TrackHeader>
      )
    });

    return (
      <TimelineWrapper>
        <TimelineToolbar
          scaleChanged={this.scaleChanged}
          toolChanged={this.toolChanged}
        ></TimelineToolbar>
        <TimelineHeader>
          {TrackHeaders}
        </TimelineHeader>
        <TimelineElementWrapper>
          <TimelineElement>
            {Tracks}
          </TimelineElement>
        </TimelineElementWrapper>
      </TimelineWrapper>
    );

  }

  scaleChanged = (value, event) => {
    console.log('scaleChanged', value);
    this.setState({
      scale: value
    })
  }

  toolChanged = (toolName) => {
    console.log('toolChanged', toolName);
    this.setState({
      currentTool: toolName
    });
  }

}

export default Timeline;
