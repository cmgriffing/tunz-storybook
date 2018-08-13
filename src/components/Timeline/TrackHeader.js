import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from 'react-md';

import {
	DropTarget,
	DropTargetConnector,
	DropTargetMonitor,
	ConnectDropTarget,
} from 'react-dnd';
import DragTypes from '../DragTypes';

const trackTarget = {
  drop(props) {
    console.log('dropping');
		return { trackId: props.track.id };
	},
};

const TrackHeaderWrapper = styled.div`
  height: 100px;
`;

const TrackName = styled.h3`

`;

@DropTarget(
  DragTypes.LOOP,
  trackTarget,
  (connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop(),
	}),
)
class TrackHeader extends Component {

  static propTypes = {
    track: PropTypes.object
  }

  static defaultProps = {
    track: null
  }

  render() {

    const { track, connectDropTarget } = this.props;

    return (
      <TrackHeaderWrapper>
        <TrackName>Untitled Track</TrackName>
        {
          connectDropTarget &&
          connectDropTarget(
            <div>{track.loop.name}</div>
          )
        }
        <Button icon>volume_off</Button>
      </TrackHeaderWrapper>
    );
  }
}

export default TrackHeader;
