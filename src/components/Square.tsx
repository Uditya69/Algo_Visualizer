import React from 'react';
import { GiChessQueen } from "react-icons/gi";


interface SquareProps {
  isQueen: boolean;
  highlight: boolean;
}

const Square: React.FC<SquareProps> = ({ isQueen, highlight }) => {
  return (
    <div
      className={`w-16 h-16 border flex items-center justify-center transition duration-500 ${
        highlight ? 'bg-blue-500' : isQueen ? 'bg-red-500' : 'bg-white'
      }`}
    >
      {isQueen && <span className="text-white text-center">
        <GiChessQueen />

        </span>}
    </div>
  );
};

export default Square;
