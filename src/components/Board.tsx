import React from 'react';
import Square from './Square';

interface BoardProps {
  board: number[][];
}

const Board: React.FC<BoardProps> = ({ board }) => {
  return (
    <div
      className={`grid gap-1 p-2`}
      style={{ gridTemplateColumns: `repeat(${board.length}, minmax(0, 1fr))` }}
    >
      {board.map((row, i) =>
        row.map((col, j) => (
          <Square key={`${i}-${j}`} isQueen={col === 1} highlight={col === 2} />
        ))
      )}
    </div>
  );
};

export default Board;
