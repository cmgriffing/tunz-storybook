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
      scale: 1.0
    };
  }

  render() {

    const { song } = this.props;
    const { scale } = this.state;

    const Tracks = song.tracks.map((track, index) => {
      return (
        <Track key={index} bars={song.bars} tempo={song.tempo} scale={scale} ></Track>
      )
    })

    return (
      <div>
        <TimelineToolbar scaleChanged={this.scaleChanged}></TimelineToolbar>
        <TimelineElement>
          {Tracks}
        </TimelineElement>
      </div>
    );
    
  }

  scaleChanged = (value, event) => {
    console.log('scaleChanged', value);
    this.setState({
      scale: value
    })
  }
  
}

export default Timeline;