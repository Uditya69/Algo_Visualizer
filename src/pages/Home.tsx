import React, { useState } from "react";
import Board from "../components/Board";
import useNQueen from "../hooks/useNQueen";

const Home: React.FC = () => {
  const [n, setN] = useState(8);
  const [speed, setSpeed] = useState(500);
  const { board, isSolving, isPaused, startSolving, resetSolving, pauseSolving, resumeSolving } = useNQueen(n, speed);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">N-Queen Visualizer</h1>
      <Board board={board} />

      <div className="flex flex-col sm:flex-row gap-5 items-center">
        <div className="mt-4 flex flex-row items-center">
          <label className="mr-2">Board Size:</label>
          <input
            type="number"
            value={n}
            onChange={(e) => setN(parseInt(e.target.value))}
            className="border p-2 bg-gray-800 text-white"
            min="1"
            max="20"
            disabled={isSolving}
          />
        </div>
        <div className="mt-4 flex flex-row items-center">
          <label className="mr-2">Speed (ms):</label>
          <input
            type="number"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="border p-2 pr-0 bg-gray-800 text-white max-w-fit"
            min="100"
            step="100"
          />
        </div>
        <div className="mt-4">
          {isSolving ? (
            <>
              {isPaused ? (
                <button
                  className="px-4 py-2 bg-green-500 text-white mr-2 mb-2 sm:mb-0"
                  onClick={resumeSolving}
                >
                  Resume
                </button>
              ) : (
                <button
                  className="px-4 py-2 bg-yellow-500 text-white mr-2 mb-2 sm:mb-0"
                  onClick={pauseSolving}
                >
                  Pause
                </button>
              )}
              <button
                className="px-4 py-2 bg-red-500 text-white mb-2 sm:mb-0"
                onClick={resetSolving}
              >
                Reset
              </button>
            </>
          ) : (
            <button
              className="px-4 py-2 bg-blue-500 text-white"
              onClick={startSolving}
            >
              Start
            </button>
          )}
        </div>
      </div>

      {isSolving && !isPaused && <p className="mt-4">Solving...</p>}
      {isPaused && <p className="mt-4">Paused</p>}
    </div>
  );
};

export default Home;
