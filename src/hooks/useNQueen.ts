import { useState, useRef } from 'react';
import solveNQueens from '../algorithms/nQueen';
import { BoardState, HighlightState } from '../types';

const useNQueen = (n: number, speed: number) => {
  const [board, setBoard] = useState<BoardState>(Array.from({ length: n }, () => Array(n).fill(0)));
  const [isSolving, setIsSolving] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [highlight, setHighlight] = useState<HighlightState>({ row: null, col: null, diagonal: { main: null, anti: null } });

  const solving = useRef(false);
  const paused = useRef(false);

  const startSolving = () => {
    setIsSolving(true);
    solving.current = true;
    solveNQueens(n, setBoard, setHighlight, speed, solving, paused).then(() => setIsSolving(false));
  };

  const resetSolving = () => {
    solving.current = false;
    setBoard(Array.from({ length: n }, () => Array(n).fill(0)));
    setHighlight({ row: null, col: null, diagonal: { main: null, anti: null } });
    setIsSolving(false);
    setIsPaused(false);
  };

  const pauseSolving = () => {
    paused.current = true;
    setIsPaused(true);
  };

  const resumeSolving = () => {
    paused.current = false;
    setIsPaused(false);
  };

  return { board, highlight, isSolving, isPaused, startSolving, resetSolving, pauseSolving, resumeSolving };
};

export default useNQueen;
