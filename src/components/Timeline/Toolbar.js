import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Slider, FontIcon, Tab, Tabs, TabsContainer } from 'react-md';

import styled from 'styled-components';

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
  };

  static defaultProps = {
    song: {
      bars: 4,
      name: 'Untitled Song',
      tempo: 140,
      tracks: new Array(4).fill()
    },
    scaleChanged: console.log
  }

  render() {

    return (
      <Toolbar>
        <div>
          <TabsContainer>
            <Tabs>
              <Tab
                icon={<FontIcon forceSize>format_paint</FontIcon>}
              ></Tab>
              <Tab
                icon={<FontIcon forceSize>layers_clear</FontIcon>}
              ></Tab>
              <Tab
                icon={<FontIcon forceSize>edit</FontIcon>}
              ></Tab>
            </Tabs>
          </TabsContainer>
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
            onChange={this.handleChange}
          />
        </SliderWrapper>
      </Toolbar>
    );
  }

  handleChange = (value) => {
    this.props.scaleChanged(value);
  }
}

export default TimelineToolbar;
