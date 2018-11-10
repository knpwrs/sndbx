import * as React from 'react';
import styled from 'react-emotion';
import Knight from './knight';
import BoardSquare from './board-square';
import { Position, moveKnight, canMoveKnight } from './game';

export type Props = {
  knightPosition: Position,
};

const SquareWrapper = styled('div')({
  width: '12.5%',
  height: '12.5%',
  fontSize: '50px',
});

const BoardWrapper = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexWrap: 'wrap',
});

function renderSquare(i: number, [knightX, knightY]: Position) {
  const x = i % 8;
  const y = Math.floor(i / 8);
  const black = (x + y) % 2 === 1;
  const isKnightHere = x === knightX && y === knightY;
  const piece = isKnightHere ? <Knight /> : null;

  return (
    <SquareWrapper key={`${x}-${y}`}>
      <BoardSquare position={[x, y]}>
        {piece}
      </BoardSquare>
    </SquareWrapper>
  )
}

export default function Board({ knightPosition }: Props) {
  const squares = [];
  for (let i = 0; i < 64; i += 1) {
    squares.push(renderSquare(i, knightPosition));
  }
  return (
    <BoardWrapper>
      {squares}
    </BoardWrapper>
  );
}
