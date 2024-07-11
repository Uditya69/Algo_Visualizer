import React from 'react';

interface BoardProps {
  board: number[][];
  highlightRow: number | null;
  highlightCol: number | null;
  highlightDiagonal: { main: number | null; anti: number | null };
}

const Board: React.FC<BoardProps> = ({ board, highlightRow, highlightCol, highlightDiagonal }) => {
  return (
    <div className={`grid grid-cols-${board.length} gap-1`}>
      {board.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`w-10 h-10 flex items-center justify-center border ${
                cell === 1 ? 'bg-green-500' : 'bg-gray-800'
              } 
                ${highlightRow === rowIndex ? 'bg-red-600' : ''}
                ${highlightCol === colIndex ? 'bg-red-600' : ''}
                ${highlightDiagonal.main === rowIndex - colIndex ? 'bg-red-600' : ''}
                ${highlightDiagonal.anti === rowIndex + colIndex ? 'bg-red-600' : ''}
              `}
            >
              {cell === 1 ? 'Q' : ''}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Board;
