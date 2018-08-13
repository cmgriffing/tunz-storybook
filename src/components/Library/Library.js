import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'react-md';

import Loop from './Loop'

class Library extends Component {

  static propTypes = {
    loops: PropTypes.array,
    loopDropped: PropTypes.func,
  }

  static defaultProps = {
    loops: [],
    loopDropped: console.log,
  }

  render() {

    const { loops, loopDropped } = this.props;

    const Loops = loops.map((loop, index) => {
      return (
        <Loop
          key={index}
          loop={loop}
          loopDropped={loopDropped}
        ></Loop>
      );
    });

    return (
      <div>
        <h3>Loop Library</h3>
        {Loops}
      </div>
    );
  }

}

export default Library;
