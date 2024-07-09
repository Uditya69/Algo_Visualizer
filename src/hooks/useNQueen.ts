import { useState, useEffect, useCallback, useRef } from 'react';
import solveNQueens, { BoardState } from '../algorithms/nQueen';

const useNQueen = (n: number, speed: number) => {
  const [board, setBoard] = useState<BoardState>([]);
  const [isSolving, setIsSolving] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const solving = useRef<boolean>(false);
  const paused = useRef<boolean>(false);

  const resetSolving = useCallback(() => {
    solving.current = false;
    setIsSolving(false);
    setIsPaused(false);
    setBoard(Array.from({ length: n }, () => Array(n).fill(0)));
  }, [n]);

  const pauseSolving = useCallback(() => {
    paused.current = true;
    setIsPaused(true);
  }, []);

  const resumeSolving = useCallback(() => {
    paused.current = false;
    setIsPaused(false);
  }, []);

  const startSolving = useCallback(() => {
    solving.current = true;
    setIsSolving(true);
    setIsPaused(false);

    const solve = async () => {
      const initialBoard: BoardState = Array.from({ length: n }, () => Array(n).fill(0));
      setBoard(initialBoard);
      await solveNQueens(n, setBoard, speed, solving, paused);
      setIsSolving(false);
      setIsPaused(false);
    };

    solve();
  }, [n, speed]);

  useEffect(() => {
    if (isSolving && !isPaused) {
      startSolving();
    }
  }, [startSolving, isSolving, isPaused]);

  return { board, isSolving, isPaused, startSolving, resetSolving, pauseSolving, resumeSolving };
};

export default useNQueen;
