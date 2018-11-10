import * as React from 'react';
import Board from './board';
import { observe, Position } from './game';

export type State = {
  position: Position,
};

export default class App extends React.Component<{}, State> {
  state: State = {
    position: [0, 0],
  };

  componentDidMount() {
    observe(position => this.setState({ position }));
  }

  render() {
    return (
      <Board knightPosition={this.state.position} />
    );
  }
}
