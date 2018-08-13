import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'react-md';

import {
	DragSource,
} from 'react-dnd';
import DragTypes from '../DragTypes';

const dragSource = {
	beginDrag(props) {
    console.log('begin drag')
		return {
			name: props.name,
		}
  },
  endDrag(props, monitor) {
    console.log('endDrag', monitor.getDropResult());
    props.loopDropped({
      loop: props.loop,
      trackId: monitor.getDropResult().trackId,
    })
  }
};

const LoopName = styled.span`
  user-select: none;
`;

@DragSource(
	DragTypes.LOOP,
	dragSource,
	(connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}),
)
class Loop extends Component {

  static propTypes = {
    loop: PropTypes.object,
    loopDropped: PropTypes.func,
  }

  static defaultProps = {
    loop: null,
    loopDropped: console.log
  }

  render() {

    const { loop, connectDragSource } = this.props;

    return (
      connectDragSource &&
      connectDragSource(
        <div>{loop.name}</div>
      )
    );
  }
}

export default Loop;
