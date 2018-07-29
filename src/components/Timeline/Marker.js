import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Caret = styled.span`
  background: white;
  float: right;
  border-radius: 4px;
  width: 10px;
  height: 10px;
  line-height: 10px;
  text-align: center;
`;

const Header = styled.div`
  background: #AAA;
  padding: 2px 4px;
  height: 20px;
  border-radius: 8px 8px 0 0;
`;

const BoundingBox = styled.div`
  background: white;
  width: ${props => props.width}px;
  height: 100px;
  border-radius: 8px;
  border: thin solid #999;
`;

class Marker extends Component {

  static propTypes = {
    width: PropTypes.number,
    bar: PropTypes.number,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    width: 240,
    bar: 2,
    onClick: console.log,
  };

  render() {
    return (
      <BoundingBox onClick={this.props.onClick} width={this.props.width}>
        <Header>
          <Caret>⌄</Caret>
        </Header>
      </BoundingBox>
    );
  }

}

export default Marker;
