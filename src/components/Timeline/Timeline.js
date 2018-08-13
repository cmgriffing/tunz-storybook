import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, DialogContainer } from 'react-md';
import styled from 'styled-components';

import Track from './Track';
import TimelineToolbar from './Toolbar';
import TrackHeader from './TrackHeader';

import BPMTimeline from '../../util/bpm-timeline';
import { stringify } from '../../../node_modules/postcss';
import newBlip from '../../util/blip';

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

const TimelineHeader = styled.div`
  padding-top: 21px;
  width: 300px;
  flex-grow: 1;
`;

const TimelineCursor = styled.div`
  position: absolute;
  transition: left 100ms;
  left: ${props => props.translateX}px;
  top: 21px;
  bottom: 0;
  width: 4px;
  background-color: red;
`;

const TimelineLabel = styled.div`
  color: #ccc;
  position: absolute;
  bottom: 0;
  left: ${props => (props.barWidth * props.bar) - 4}px;
  width: ${props => props.barWidth}px;
  cursor: pointer;
`;

const TimelineLegend = styled.div`
  background: #333;
  position: relative;
  height: 21px;
  width: ${props => props.bars * props.barWidth}px;
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

  state = {
    scale: 1.0,
    currentTool: 'paint',
    isPlaying: false,
    currentCursorLocation: 0,
    songLength: 0,
    percentageComplete: 0,
    tracks: [],
    rendering: false,
  }

  bpmTimeline;
  playbackInterval;
  blipLoops;

  componentDidMount() {
    console.log('DID MOUNT');
    const { song } = this.props;
    if(!this.bpmTimeline && song.tempo) {
      this.bpmTimeline = new BPMTimeline(song.tempo);
      console.log('tempo, bars, length',
        song.tempo,
        song.bars,
        this.bpmTimeline.time(song.bars * 4)
      );
      this.setState({
        songLength: this.bpmTimeline.time(song.bars * 4)
      });
    }

    this.setState({
      tracks: song.tracks
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.tracks !== prevState.tracks) {
      console.log('changing tracks in state in will update', prevState.tracks, this.state.tracks);
      // this.setState({
      //   tracks: prevState.tracks
      // });
    }


  }

  render() {

    const { song, bars, connectDropTarget } = this.props;
    const {
      scale,
      currentTool,
      isPlaying,
      currentCursorLocation,
      songLength,
      percentageComplete,
      rendering,
      tracks,
    } = this.state;

    const barWidth = (song.tempo / 2) * scale;

    const Tracks = tracks.map((track, index) => {
      return (
        <Track
          key={index}
          bars={song.bars}
          tempo={song.tempo}
          scale={scale}
          track={track}
          currentTool={currentTool}
          changed={this.trackChanged}
        ></Track>
      )
    });

    const TrackHeaders = tracks.map((track, index) => {
      return (
        <TrackHeader track={track}></TrackHeader>
      )
    });

    const labels = new Array(song.bars).fill();
    const TimelineLabels = labels.map((bar, index) => {
      return (
        <TimelineLabel
          bar={index}
          barWidth={barWidth}
          onClick={(e) => this.handleLegendClick(index)}
          key={index}
        >{index}</TimelineLabel>
      );
    });

    const dialogActions = [{
      onClick: this.hideRenderingDialog,
      primary: true,
      children: 'Cancel'
    }]

    return (
      <TimelineWrapper>
        <TimelineToolbar
          scaleChanged={this.scaleChanged}
          toolChanged={this.toolChanged}
          isPlaying={isPlaying}
          onPlay={this.onPlay}
          onPause={this.onPause}
          onStop={this.onStop}
        ></TimelineToolbar>
        <TimelineHeader>
          {TrackHeaders}
        </TimelineHeader>
        <TimelineElementWrapper>
          <TimelineElement>
            <TimelineLegend
              barWidth={barWidth}
              bars={song.bars}
            >
              {TimelineLabels}
            </TimelineLegend>
            {Tracks}
            <TimelineCursor
              location={currentCursorLocation}
              barWidth={barWidth}
              songLength={songLength}
              percentageComplete={percentageComplete * scale}
              translateX={percentageComplete *  (barWidth * song.bars)}
            ></TimelineCursor>
          </TimelineElement>
        </TimelineElementWrapper>
        <DialogContainer
          id="rendering-dialog"
          title="Rendering..."
          visible={rendering}
          actions={dialogActions}
          modal
        >
          <p>Your song is now rendering</p>
        </DialogContainer>
      </TimelineWrapper>
    );

  }

  scaleChanged = (value, event) => {
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

  onPlay = async () => {
    console.log('handling play at timeline level');
    this.showRenderingDialog();

    await this.startRendering();

    console.log('loading done');

    //this.startPlaying();
  };

  startRendering = async () => {
    const trackPromises = this.state.tracks.map(track => {
      return this.renderTrack(track);
    });

    return await Promise.all(trackPromises)
      .then(loops => {
        this.blipLoops = loops;
      })
      .catch(error => {
        console.log('catching error in awaited code', error);
      });
  }

  renderTrack = async (track) => {
    track = JSON.parse(JSON.stringify(track));
    const { song: { tempo, bars } } = this.props;
    console.log('rendering track with tempo: ', tempo);
    let blip = newBlip();
    console.log('blip', blip, track);
    blip = await this.loadTrackSample(track.loop.file, blip);
    const sample = blip.clip().sample('loop');
    let currentTick = 0;
    const totalTicks = bars * 4;

    //
    const markers = track.markers.sort((a, b) => {
      if(a.bar < b.bar) {
        return -1;
      } else if(a.bar > b.bar) {
        return 1;
      } else {
        return 0;
      }
    });

    console.log('sorted markers', markers);

    const loop = blip.loop()
      .tempo(tempo)
      .tick(tick => {
        //console.log('totalTicks:', totalTicks, currentTick);
        if(currentTick === totalTicks) {
          console.log('stopping loop after totalTicks', totalTicks);
          loop.stop();
          return;
        }

        if(markers[0] && markers[0].bar * 4 === currentTick) {
          if(sample) {
            console.log('playing loop');
            sample.play(0);
          }
          markers.shift();
        }

        currentTick += 1;
      });

    return loop;

  }

  loadTrackSample = (sample, blipInstance) => {
    console.log('loading sample: ', sample);
    return new Promise((resolve, reject) => {
      blipInstance.sampleLoader()
        .samples({
          'loop': sample,
        })
        .done(() => resolve(blipInstance))
        .load();
    });
  }

  startPlaying = () => {
    this.setState({
      isPlaying: true
    });

    if(!this.blipLoops) {
      console.log('Something has gone terribly wrong. No loops found.');
    } else {
      this.blipLoops.map(loop => loop.start());
    }

    this.clearInterval();
    this.playStartedTimestamp = performance.now();
    this.playbackInterval = setInterval(() => {
      const duration = performance.now() - this.playStartedTimestamp;
      const percentage = (duration / (this.state.songLength * 1000));
      this.setState({
        percentageComplete: percentage
      });
    }, 100);
  }

  showRenderingDialog = () => {
    this.setState({
      rendering: true
    });
  }

  hideRenderingDialog = () => {
    this.setState({
      rendering: false
    });
    this.startPlaying();
  }

  onPause = () => {
    console.log('handling pause at timeline level');
    this.clearInterval();
    this.setState({
      isPlaying: false
    });
  };

  onStop = () => {
    console.log('handling stop at timeline level');
    this.clearInterval();
    if(this.blipLoops) {
      this.blipLoops.map(loop => {
        loop.stop();
      });
      this.blipLoops = null;
    }
    this.setState({
      isPlaying: false,
      currentCursorLocation: 0,
      percentageComplete: 0,
    });
  };

  clearInterval = () => {
    if(this.playbackInterval) {
      clearInterval(this.playbackInterval);
      this.playbackInterval = undefined;
    }
  }

  handleLegendClick = (bar) => {
    console.log('handling legend click', bar, bar / this.props.song.bars);
    this.setState({
      currentCursorLocation: bar,
      percentageComplete: (bar / this.props.song.bars),
    });
  }

  trackChanged = (track) => {
    console.log('track changed at timeline: ', track);
    const { tracks } = this.state;

    let newTracks = JSON.parse(JSON.stringify(tracks))
      .map((_track, index) => {
        console.log('track.id and _track.id', track.id, _track.id);
        if(track.id === _track.id) {
          console.log('we found it');
          return track;
        } else {
          return _track;
        }
      });

    console.log('newTracks: ', newTracks);

    console.log('newTracks in trackChanged', newTracks);

    this.setState({
      tracks: newTracks
    });
  }

}

export default Timeline;
