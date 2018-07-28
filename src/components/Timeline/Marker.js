import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Caret = styled.span`
  background: white;
  float: right;
  border-radius: 4px;
`;

const Header = styled.div`
  background: #AAA;
  padding: 2px 4px;
  height: 40px;
`;

const BoundingBox = styled.div`
  background: white;
  width: ${props => props.width}px;
`;

class Marker extends Component {

  static propTypes = {
    width: PropTypes.number,
    bar: PropTypes.number,
  };

  static defaultProps = {
    width: 240,
    bar: 2,
  };

  render() {
    return (
      <BoundingBox width={this.props.width}>
        <Header>
          <Caret>⌄</Caret>
        </Header>
      </BoundingBox>
    );
  }

}

export default Marker;
