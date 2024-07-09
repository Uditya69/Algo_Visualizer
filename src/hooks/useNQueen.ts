import { useState, useEffect, useCallback, useRef } from 'react';
import solveNQueens, { BoardState } from '../algorithms/nQueen';

const useNQueen = (n: number, speed: number) => {
  const [board, setBoard] = useState<BoardState>([]);
  const [isSolving, setIsSolving] = useState<boolean>(false);
  const solving = useRef<boolean>(false);

  const stopSolving = useCallback(() => {
    solving.current = false;
    setIsSolving(false);
  }, []);

  const startSolving = useCallback(() => {
    solving.current = true;
    setIsSolving(true);

    const solve = async () => {
      const initialBoard: BoardState = Array.from({ length: n }, () => Array(n).fill(0));
      setBoard(initialBoard);
      await solveNQueens(n, setBoard, speed, solving);
      setIsSolving(false);
    };

    solve();
  }, [n, speed]);

  useEffect(() => {
    if (isSolving) {
      startSolving();
    }
  }, [startSolving, isSolving]);

  return { board, isSolving, startSolving, stopSolving };
};

export default useNQueen;
