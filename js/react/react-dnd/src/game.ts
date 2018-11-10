export type Position = [number, number];
export type Observer = (p: Position) => any;

let knightPosition: Position = [0, 0];
let observer: Observer | null = null;

function emitChange() {
  if (observer) {
    observer(knightPosition);
  }
}

export function observe(o: Observer) {
  observer = o;
  emitChange();
}

export function moveKnight(p: Position) {
  knightPosition = p;
  emitChange();
}

export function canMoveKnight([x, y]: Position) {
  const dx = Math.abs(x - knightPosition[0]);
  const dy = Math.abs(y - knightPosition[1]);
  return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
}
