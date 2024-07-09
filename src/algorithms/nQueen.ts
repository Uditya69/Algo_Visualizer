export type BoardState = number[][];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const solveNQueens = async (
  n: number,
  setBoard: (board: BoardState) => void,
  speed: number,
  solving: React.MutableRefObject<boolean>
): Promise<boolean> => {
  const board: BoardState = Array.from({ length: n }, () => Array(n).fill(0));

  const isSafe = (board: BoardState, row: number, col: number): boolean => {
    for (let i = 0; i < col; i++) if (board[row][i] === 1) return false;
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) if (board[i][j] === 1) return false;
    for (let i = row, j = col; j >= 0 && i < n; i++, j--) if (board[i][j] === 1) return false;
    return true;
  };

  const solve = async (board: BoardState, col: number): Promise<boolean> => {
    if (!solving.current) return false;
    if (col >= n) return true;

    for (let i = 0; i < n; i++) {
      if (!solving.current) return false;

      if (isSafe(board, i, col)) {
        board[i][col] = 1;
        setBoard([...board]);
        await sleep(speed);

        if (await solve(board, col + 1)) return true;

        board[i][col] = 0;
        setBoard([...board]);
        await sleep(speed);
      }
    }
    return false;
  };

  return await solve(board, 0);
};

export default solveNQueens;
