"use client";

import React, { useEffect, useReducer } from "react";

interface State {
  gridContent: string[][];
  currentRow: number;
  currentCell: number;
}

interface Action {
  type: string;
  letter?: string;
}

const initialState: State = {
  gridContent: Array(6)
    .fill("")
    .map(() => Array(5).fill("")),
  currentRow: 0,
  currentCell: 0,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_LETTER":
      const newGridContent = [...state.gridContent.map((row) => [...row])];
      newGridContent[state.currentRow][state.currentCell] = action.letter!;
      return {
        ...state,
        gridContent: newGridContent,
        currentCell: state.currentCell + 1,
      };
    case "REMOVE_LETTER":
      const newGridContent1 = [...state.gridContent.map((row) => [...row])];
      newGridContent1[state.currentRow][state.currentCell - 1] = "";
      return {
        ...state,
        gridContent: newGridContent1,
        currentCell: state.currentCell - 1,
      };
    case "MOVE_TO_NEXT_ROW":
      return {
        ...state,
        currentRow: state.currentRow + 1,
        currentCell: 0,
      };
    default:
      throw new Error();
  }
}

const Grid: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      if (key.length === 1 && key.match(/[A-Z]/i)) {
        if (state.currentCell < 5) {
          dispatch({ type: "ADD_LETTER", letter: key });
        }
      } else if (key === "BACKSPACE" && state.currentCell > 0) {
        dispatch({ type: "REMOVE_LETTER" });
      } else if (
        key === "ENTER" &&
        state.currentCell === 5 &&
        state.currentRow < 4
      ) {
        dispatch({ type: "MOVE_TO_NEXT_ROW" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state.currentRow, state.currentCell]);

  console.log(state.gridContent)

  return (
    <div
      className="flex justify-center mb-4"
      style={{ background: "var(--background-start-rgb)" }}
    >
      <div className="grid grid-cols-5 grid-rows-6 gap-1 p-4 m-auto mt-20 bg-white dark:bg-gray-800 rounded shadow-lg w-72">
        {state.gridContent.map((row, rowIndex) =>
          row.map((letter, columnIndex) => (
            <div
              key={`${rowIndex}-${columnIndex}`}
              className="border border-gray-500 flex items-center justify-center text-lg font-bold p-2 w-12 h-12"
              style={{
                color: "rgb(var(--foreground-rgb))",
                backgroundColor: "rgb(var(--background-start-rgb))",
              }}
            >
              {letter}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Grid;
