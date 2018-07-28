import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-md';
import styled from 'styled-components';

const Bar = styled.div`
  flex-grow: 1;
  border: thin solid #ccc;
  height: 100px;
`;

const TrackElement = styled.div`
  width: ${props => props.width}px;
  flex-direction: row;
  display: flex;
  background: #333;
  height: 100px;
`;

class Track extends Component {

  static propTypes = {
    bars: PropTypes.number,
    tempo: PropTypes.number,
    track: PropTypes.object,
    scale: PropTypes.number,
  }

  static defaultProps = {
    bars: 4,
    tempo: 140,
    scale: 1.0,
    track: {
      name: 'Untitled Track',
      loop: '',
      markers: []
    },
  }

  barWidth = 140;

  componentWillMount() {
    this.setBarWidth();
  }

  componentDidUpdate() {
    this.setBarWidth();
  }

  render() {

    const { bars } = this.props;

    const Bars = new Array(bars).fill().map((bar, index) => {
      return (
        <Bar key={index} width={this.barWidth} onClick={this.barClicked}></Bar>
      )
    });

    return (
      <TrackElement width={this.barWidth * bars}>
        {Bars}
      </TrackElement>
    );
  }

  setBarWidth = () => {
    this.barWidth = this.props.tempo * this.props.scale;
  }

  barClicked = (event) => {
    console.log('bar clicked', event.target);

    // determine action

    // add marker

  }
}

export default Track;
