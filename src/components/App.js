import React, { Component } from 'react';
import Game from './Game';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      original: { tileSet: [4, 6, 14, 10, 9, 3, 12,  11,15, 1, 16, 8, 5,2, 13, 7] },
      level: { tileSet: [4, 6, 14, 10, 9, 3, 12,  11,15, 1, 16, 8, 5,2, 13, 7].sort(() => Math.random() - 0.5)},
    };
  }


  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <Game
          gridSize={4}
          tileSize={90}
          numbers={this.state.level.tileSet}
          original={this.state.original.tileSet
          }
        />
      </div>
    );
  }
}

App.propTypes = {
  level: PropTypes.shape({
    tileSet: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
};

export default styled(App)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
