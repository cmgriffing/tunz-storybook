import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Slider, FontIcon, Tab, Tabs, TabsContainer } from 'react-md';

import styled from 'styled-components';

export const TOOLS = {
  PAINT: 'paint',
  DELETE: 'delete',
  EDIT: 'edit',
};

const Toolbar = styled.div`
  width: 100%;
  background: #AAA;
  min-height: 40px;
  position: relative;
`;

const SliderWrapper = styled.div`
  float: right;
  position: absolute;
  top: 0;
  right: 0;
`;

class TimelineToolbar extends Component {

  static propTypes = {
    song: PropTypes.object,
    scaleChanged: PropTypes.func,
    toolChanged: PropTypes.func,
    isPlaying: PropTypes.bool,
    onSkipStart: PropTypes.func,
    onRewind: PropTypes.func,
    onStop: PropTypes.func,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onFastForward: PropTypes.func,
    onSkipEnd: PropTypes.func,
  };

  static defaultProps = {
    song: {
      bars: 4,
      name: 'Untitled Song',
      tempo: 120,
      tracks: new Array(4).fill(),
    },
    scaleChanged: console.log,
    toolChanged: console.log,
    isPlaying: false,
    onSkipStart: console.log,
    onRewind: console.log,
    onStop: console.log,
    onPlay: console.log,
    onPause: console.log,
    onFastForward: console.log,
    onSkipEnd: console.log,
  }

  tools = [
    {
      iconName: 'format_paint',
      name: 'paint'
    },
    {
      iconName: 'layers_clear',
      name: 'delete'
    },
    {
      iconName: 'edit',
      name: 'edit'
    },
  ];

  controls = [
    {
      iconName: 'skip_previous',
      name: 'skipStart',
    },
    {
      iconName: 'fast_rewind',
      name: 'rewind',
    },
    {
      iconName: 'stop',
      name: 'stop',
    },
    {
      iconName: 'play_arrow',
      name: 'play',
    },
    {
      iconName: 'pause',
      name: 'pause',
    },
    {
      iconName: 'fast_forward',
      name: 'fastForward',
    },
    {
      iconName: 'skip_next',
      name: 'skipEnd',
    },
  ]

  render() {

    const Tools = this.tools.map((tool, index) => {
      return (
        <Tab
          icon={<FontIcon forceSize>{tool.iconName}</FontIcon>}
          key={index}
        ></Tab>
      )
    });

    const Controls = this.controls.map((control, index) => {
      if(!this.props.isPlaying && control.name === 'pause') {
        return undefined;
      }
      if(this.props.isPlaying && control.name === 'play') {
        return undefined;
      }
      return (
        <Button icon onClick={(e) => this.handleControlClick(control)}>{control.iconName}</Button>
      );
    });

    return (
      <Toolbar>
        <div>
          <TabsContainer onTabChange={this.handleToolChange}>
            <Tabs tabId="tool">
              {Tools}
            </Tabs>
          </TabsContainer>

          {Controls}

        </div>
        <SliderWrapper>
          <Slider
            id="timeline-scale"
            label="Zoom/Scale Timeline"
            leftIcon={<FontIcon>zoom_out</FontIcon>}
            rightIcon={<FontIcon>zoom_in</FontIcon>}
            defaultValue={1.0}
            min={0.1}
            step={0.1}
            max={2}
            onChange={this.handleScaleChange}
          />
        </SliderWrapper>
      </Toolbar>
    );
  }

  handleScaleChange = (value) => {
    this.props.scaleChanged(value);
  }

  handleToolChange = (newActiveTabIndex, tabId, tabControlsId, tabChildren, event) => {
    this.props.toolChanged(this.tools[newActiveTabIndex].name);
  }

  handleControlClick = (control) => {
    console.log('control', control);
    switch(control.name) {
      case 'play':
        this.props.onPlay();
        break;

      case 'pause':
        this.props.onPause();
        break;

      default:
        console.log(`No action defined for the ${control.name} button.`);

    }
  }
}

export default TimelineToolbar;
