import React, { Component } from 'react';
import { getTileCoords, distanceBetween, invert } from '../lib/utils';
import Grid from './Grid';
import Snackbar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';
import styled from 'styled-components';


class Game extends Component {
  constructor(props) {
    super(props);

    const { numbers, tileSize, gridSize, } = props;
    const tiles = this.generateTiles(numbers, gridSize, tileSize);

    this.state = {
      tiles,
      snackbarOpen: false,
      snackbarText: '',
    };

  }

  componentWillReceiveProps(nextProps) {
    const { tileSize, gridSize } = this.props;
    const newTiles = this.generateTiles(nextProps.numbers, gridSize, tileSize);

    this.setState({
      tiles: newTiles,
    });

  }

  generateTiles(numbers, gridSize, tileSize) {
    const tiles = [];

    numbers.forEach((number, index) => {
      tiles[index] = {
        ...getTileCoords(index, gridSize, tileSize),
        width: this.props.tileSize,
        height: this.props.tileSize,
        number,
      };
    });

    return tiles;
  }
  onTileClick = tile => {
    const { gridSize } = this.props;

    // Find empty tile
    const emptyTile = this.state.tiles.find(t => t.number === gridSize ** 2);
    const emptyTileIndex = this.state.tiles.indexOf(emptyTile);

    // Find index of tile
    const tileIndex = this.state.tiles.findIndex(t => t.number === tile.number);

    // Is this tale neighbouring the zero tile? If so, switch them.
    const d = distanceBetween(tile, emptyTile);
    
    if (d.neighbours) {
      let t = Array.from(this.state.tiles).map(t => ({ ...t }));

      invert(t, emptyTileIndex, tileIndex, [
        'top',
        'left',
        'row',
        'column',
        'tileId',
      ]);

      this.setState({
        tiles: t,
      });
    }

  };

  render() {
    const {
      className,
      gridSize,
      tileSize,
    } = this.props;

    return (
      <div className={className}>
        <Grid
          gridSize={gridSize}
          tileSize={tileSize}
          tiles={this.state.tiles}
          onTileClick={this.onTileClick}
        />
       
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarText}
        />
      </div>
    );
  }
}

Game.propTypes = {
  numbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  original: PropTypes.arrayOf(PropTypes.number),
  tileSize: PropTypes.number,
  gridSize: PropTypes.number,
};

Game.defaultProps = {
  tileSize: 90,
  gridSize: 4,
};

export default styled(Game)`
  flex: 1;
`;
