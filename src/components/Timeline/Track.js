import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Marker from './Marker';
import { TOOLS } from './Toolbar';

import newBlip from '../../util/blip';

const Bar = styled.div`
  flex-grow: 1;
  border: thin solid #ccc;
  height: 100px;
  background: ${props => {
      const setCount = Math.floor(props.bar / 4);

      if(setCount % 2 === 0) {
        return '#777';
      } else {
        return '#555';
      }
    }
  };
`;

const TrackElement = styled.div`
  width: ${props => props.width}px;
  flex-direction: row;
  display: flex;
  height: 100px;
`;

const TrackWrapper = styled.div`
  position: relative;
`;

const PositionedMarker = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(${props => props.barWidth * props.bar}px);
  cursor: ${props => props.currentTool === TOOLS.DELETE ? 'not-allowed' : 'pointer'};
`;

class Track extends Component {

  static propTypes = {
    bars: PropTypes.number,
    tempo: PropTypes.number,
    track: PropTypes.object,
    scale: PropTypes.number,
    currentTool: PropTypes.string,
    changed: PropTypes.func,
  }

  static defaultProps = {
    bars: 4,
    tempo: 120,
    scale: 1.0,
    track: {
      id: 1,
      order: 1,
      name: 'Untitled Track',
      loop: {
        name: `Loop #1`,
        id: 1,
        file: 'http://localhost:5000/Eamb1e-120.wav'
      },
      markers: []
    },
    currentTool: TOOLS.DELETE,
    changed: console.log
  }

  state = {
    markers: [],
    barWidth: 60,
    markerBars: 4,
  }

  componentDidMount() {
    this.setMarkers();
    this.setBarWidth();
    this.setMarkerWidth();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.track.markers !== prevProps.track.markers) {
      this.setMarkers();
    }
    if(prevProps.scale !== this.props.scale) {
      this.setBarWidth();
    }
    if(prevProps.track.loop.file !== this.props.track.loop.file) {
      this.setMarkerWidth();
    }

    console.log('track.id', this.props.track.id);
  }

  render() {

    const { bars, currentTool } = this.props;
    const { barWidth, markerBars } = this.state;

    const Bars = new Array(bars).fill().map((bar, index) => {
      return (
        <Bar
          bar={index}
          key={index}
          width={barWidth}
          onClick={(e) => this.barClicked(index)}
        ></Bar>
      )
    });

    const PositionedMarkers = this.state.markers.map((marker) => {
      return (
        <PositionedMarker
          barWidth={barWidth}
          bar={marker.bar}
          currentTool={currentTool}
          key={marker.id}
        >
          <Marker
            onClick={(e) => this.markerClicked(marker)}
            bar={marker.bar}
            width={barWidth * markerBars}
          ></Marker>
        </PositionedMarker>
      )
    });

    return (
      <TrackWrapper>
        <TrackElement width={barWidth * bars}>
          {Bars}
        </TrackElement>
        {PositionedMarkers}
      </TrackWrapper>
    );
  }

  setMarkerWidth = async () => {
    const { bars, barWidth } = this.state;
    const { track, tempo } = this.props;

    const blip = newBlip();

    await this.loadAudioSample(track.loop.file, blip);

    const durationInBars = Math.round(((blip.sample('loop').duration / 60) * tempo) / 4);

    this.setState({
      markerBars: durationInBars
    });

  }

  loadAudioSample(sample, blip) {
    return new Promise((resolve, ) => {
      blip.sampleLoader()
          .samples({
            'loop': sample,
          })
          .done(() => resolve())
          .load();
    })
  }

  setBarWidth = () => {
    this.setState({
      barWidth: (this.props.tempo / 2) * this.props.scale
    });
  }

  barClicked = (bar) => {
    if(this.props.currentTool === TOOLS.PAINT) {
      const markers = [
        ...this.state.markers,
        {
          id: bar,
          bar: bar
        }
      ];
      this.setState({
        markers
      });

      const changedTrack = JSON.parse(JSON.stringify(this.props.track));
      changedTrack.markers = markers;
      this.props.changed(changedTrack);
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

      const changedTrack = JSON.parse(JSON.stringify(this.props.track));
      changedTrack.markers = markers;
      this.props.changed(changedTrack);
    }


  }

  setMarkers = () => {
    this.setState({
      markers: JSON.parse(JSON.stringify(this.props.track.markers))
    });
  }
}

export default Track;
