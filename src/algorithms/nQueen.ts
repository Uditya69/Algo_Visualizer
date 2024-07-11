import { BoardState, HighlightState } from '../types';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isSafe = (board: BoardState, row: number, col: number) => {
  const n = board.length;
  for (let i = 0; i < row; i++) {
    if (board[i][col] === 1) return false;
    if (col - (row - i) >= 0 && board[i][col - (row - i)] === 1) return false;
    if (col + (row - i) < n && board[i][col + (row - i)] === 1) return false;
  }
  return true;
};

const solveNQueens = async (
  n: number,
  setBoard: (board: BoardState) => void,
  setHighlight: (highlight: HighlightState) => void,
  speed: number,
  solving: React.MutableRefObject<boolean>,
  paused: React.MutableRefObject<boolean>
): Promise<boolean> => {
  const board: BoardState = Array.from({ length: n }, () => Array(n).fill(0));
  const highlight: HighlightState = { row: null, col: null, diagonal: { main: null, anti: null } };

  const solve = async (row: number): Promise<boolean> => {
    if (!solving.current) return false;
    while (paused.current) await sleep(100);

    if (row === n) return true;

    for (let col = 0; col < n; col++) {
      highlight.row = row;
      highlight.col = col;
      highlight.diagonal.main = row - col;
      highlight.diagonal.anti = row + col;
      setHighlight({ ...highlight });
      await sleep(speed);

      if (isSafe(board, row, col)) {
        board[row][col] = 1;
        setBoard(board.map((row) => row.slice()));

        if (await solve(row + 1)) return true;

        board[row][col] = 0;
        setBoard(board.map((row) => row.slice()));
      }

      highlight.row = null;
      highlight.col = null;
      highlight.diagonal.main = null;
      highlight.diagonal.anti = null;
      setHighlight({ ...highlight });
    }

    return false;
  };

  return await solve(0);
};

export default solveNQueens;
