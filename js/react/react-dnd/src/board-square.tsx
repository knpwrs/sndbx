import * as React from 'react';
import styled from 'react-emotion';
import { ConnectDropTarget, DropTarget, DropTargetSpec } from 'react-dnd';
import { Position, moveKnight, canMoveKnight } from './game';
import Square from './square';
import { ItemTypes } from './constants';

export type OwnProps = {
  children: React.ReactNode,
  position: Position,
};

export type DragProps = {
  canDrop: boolean,
  connectDropTarget: ConnectDropTarget,
  isOver: boolean,
};

export type Props = OwnProps & DragProps;

const squareTarget: DropTargetSpec<OwnProps> = {
  drop({ position }: OwnProps, monitor) {
    moveKnight(position);
    console.log(`${Date.now()} (${position.join(', ')}): DROPPING`, monitor.getItem()); // get what was returned by DragSource::beginDrag
  },
  canDrop({ position }: OwnProps, monitor) {
    console.log(`${Date.now()} (${position.join(', ')}): CHECKING DROP FOR`, monitor.getItem()); // get what was returned by DragSource::beginDrag
    return canMoveKnight(position);
  }
};

function collect(connect, monitor): DragProps {
  return {
    canDrop: monitor.canDrop(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

const BoardSquareWrapper = styled('div')({
  width: '100%',
  height: '100%',
  position: 'relative',
});

function getHighlightColor(isOver: boolean, canDrop: boolean): string {
  if (!isOver && canDrop) {
    return 'yellow';
  }
  if (isOver && !canDrop) {
    return 'red';
  }
  return 'lightgreen';
}

const Highlight = styled('div')(({ canDrop, isOver }: { canDrop: boolean, isOver: boolean }) => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  left: 0,
  top: 0,
  zIndex: 1,
  opacity: 0.5,
  backgroundColor: getHighlightColor(isOver, canDrop),
}));


function BoardSquare({ position: [x, y], canDrop, connectDropTarget, children, isOver }: Props) {
  const black = (x + y) % 2 === 1;
  return (
    <BoardSquareWrapper innerRef={el => connectDropTarget(el)}>
      <Square black={black}>
        {children}
      </Square>
      {(isOver || canDrop) ? (<Highlight canDrop={canDrop} isOver={isOver} />) : null}
    </BoardSquareWrapper>
  )
}

export default DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(BoardSquare);
