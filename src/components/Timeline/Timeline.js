import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-md';
import styled from 'styled-components';


import Track from './Track';
import TimelineToolbar from './Toolbar';

const TimelineElement = styled.div`
  width: 100%;
  overflow: scroll;
  background: #CCC;
  min-height: 400px;
  position: relative;
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

const TimelineCursor = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: red;
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
      tempo: 120,
      tracks: new Array(4).fill()
    }
  }

  state = {
    scale: 1.0,
    currentTool: 'paint',
    isPlaying: false,
  }

  componentDidUpdate(prevProps, prevState) {

  }

  render() {

    const { song } = this.props;
    const { scale, currentTool, isPlaying } = this.state;

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

    const TrackHeaders = song.tracks.map((track, index) => {
      return (
        <TrackHeader key={index}>
          <TrackName>Unititled Track {index + 1}</TrackName>
          <Button icon>volume_off</Button>
        </TrackHeader>
      )
    });

    return (
      <TimelineWrapper>
        <TimelineToolbar
          scaleChanged={this.scaleChanged}
          toolChanged={this.toolChanged}
          isPlaying={isPlaying}
          onPlay={this.onPlay}
          onPause={this.onPause}
        ></TimelineToolbar>
        <TimelineHeader>
          {TrackHeaders}
        </TimelineHeader>
        <TimelineElementWrapper>
          <TimelineElement>
            {Tracks}
            <TimelineCursor></TimelineCursor>
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

  onPlay = () => {
    console.log('handling play at timeline level');
    this.setState({
      isPlaying: true
    });
  };

  onPause = () => {
    console.log('handling pause at timeline level');
    this.setState({
      isPlaying: false
    });
  };

}

export default Timeline;
