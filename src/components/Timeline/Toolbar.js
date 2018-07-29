import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Slider, FontIcon, Tab, Tabs, TabsContainer } from 'react-md';

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
  };

  static defaultProps = {
    song: {
      bars: 4,
      name: 'Untitled Song',
      tempo: 140,
      tracks: new Array(4).fill()
    },
    scaleChanged: console.log,
    toolChanged: console.log,
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
  ]

  render() {

    const Tools = this.tools.map((tool, index) => {
      return (
        <Tab
          icon={<FontIcon forceSize>{tool.iconName}</FontIcon>}
          key={index}
        ></Tab>
      )
    })

    return (
      <Toolbar>
        <div>
          <TabsContainer onTabChange={this.onTabChange}>
            <Tabs tabId="tool">
              {Tools}
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

  onTabChange = (newActiveTabIndex, tabId, tabControlsId, tabChildren, event) => {
    this.props.toolChanged(this.tools[newActiveTabIndex].name);
  }
}

export default TimelineToolbar;
