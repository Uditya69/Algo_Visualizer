export type BoardState = number[][];
export type HighlightState = {
  row: number | null;
  col: number | null;
  diagonal: { main: number | null; anti: number | null };
};
