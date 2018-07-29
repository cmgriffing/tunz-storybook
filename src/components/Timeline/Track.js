import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Marker from './Marker';
import { TOOLS } from './Toolbar';

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

const TrackWrapper = styled.div`
  position: relative;
`;

const PositionedMarker = styled.div`
  position: absolute;
  top: 0;
  left: ${props => props.barWidth * props.bar}px;
  cursor: ${props => props.currentTool === TOOLS.DELETE ? 'not-allowed' : 'pointer'};
`;

class Track extends Component {

  static propTypes = {
    bars: PropTypes.number,
    tempo: PropTypes.number,
    track: PropTypes.object,
    scale: PropTypes.number,
    currentTool: PropTypes.string,
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
    currentTool: TOOLS.DELETE
  }

  barWidth = 140;

  constructor(props) {
    super(props);
    this.state = {
      markers: []
    }
  }

  componentWillMount() {
    this.setMarkers();
    this.setBarWidth();
  }

  componentDidUpdate() {
    //this.setMarkers();
    this.setBarWidth();
  }

  render() {

    const { bars, currentTool } = this.props;

    const Bars = new Array(bars).fill().map((bar, index) => {
      return (
        <Bar key={index} width={this.barWidth} onClick={(e) => this.barClicked(index)}></Bar>
      )
    });

    const PositionedMarkers = this.state.markers.map((marker) => {
      return (
        <PositionedMarker
          barWidth={this.barWidth}
          bar={marker.bar}
          currentTool={currentTool}
          key={marker.id}
        >
          <Marker onClick={(e) => this.markerClicked(marker)} bar={marker.bar}></Marker>
        </PositionedMarker>
      )
    });

    return (
      <TrackWrapper>
        <TrackElement width={this.barWidth * bars}>
          {Bars}
        </TrackElement>
        {PositionedMarkers}
      </TrackWrapper>
    );
  }

  setBarWidth = () => {
    this.barWidth = this.props.tempo * this.props.scale;
  }

  barClicked = (bar) => {
    if(this.props.currentTool === TOOLS.PAINT) {
      this.setState({
        markers: [
          ...this.state.markers,
          {
            id: bar,
            bar: bar
          }
        ]
      });
    }
  }

  markerClicked = (marker) => {
    console.log('markerClicked', marker);

    switch(this.props.currentTool) {
      case TOOLS.DELETE:
        this.removeMarker(marker);
        break;

      default:
        console.log('doing nothing');
    }
  }

  removeMarker = (marker) => {
    const index = this.state.markers.findIndex(
      (_marker) => marker.id === _marker.id
    );

    if(index > -1) {
      const markers = [...this.state.markers];
      markers.splice(index, 1);
      this.setState({
        markers
      });
    }

  }

  setMarkers = () => {
    this.setState({
      markers: JSON.parse(JSON.stringify(this.props.track.markers))
    });
  }
}

export default Track;
