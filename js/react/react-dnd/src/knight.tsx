import * as React from 'react';
import { DragSource, DragSourceSpec, ConnectDragSource, ConnectDragPreview } from 'react-dnd';
import { ItemTypes } from './constants';
import horse from './horse';

type Props = {
  connectDragSource: ConnectDragSource,
  connectDragPreview: ConnectDragPreview,
  isDragging: boolean,
};

const knightSource: DragSourceSpec<{}, {}> = {
  beginDrag(props) {
    return { piece: 'KNIGHT' };
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(), // not actually used
  };
}

class Knight extends React.Component<Props> {
  componentDidMount() {
    const img = new Image();
    img.src = horse;
    img.onload = () => this.props.connectDragPreview(img);
  }

  render() {
    const { connectDragSource } = this.props;
    return connectDragSource(
      <span>♘</span>
    );
  }
}

export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);
