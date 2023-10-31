"use client";

import { reducer, word } from "@/lib/helpers";
import { State } from "@/lib/types";
import React, { useEffect, useReducer } from "react";

const initialState: State = {
  gridContent: Array(6)
    .fill("")
    .map(() => Array(5).fill("")),
  currentRow: 0,
  currentCell: 0,
  gameOver: false,
  submittedRows: Array(6).fill(false),
};

console.log(word,"sds")
const Grid: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const isRowCorrect = (row: string[]): boolean => {
    const isCorrect = row.every((letter, index) => letter === word[index]);
    return isCorrect;
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (state.gameOver) return;
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
        state.currentRow < 5
      ) {
        if (isRowCorrect(state.gridContent[state.currentRow])) {
          dispatch({ type: "GAME_OVER" });
        } else {
          dispatch({ type: "MOVE_TO_NEXT_ROW" });
        }
      }

      if (
        state.currentRow === 5 ||
        (state.currentCell === 5 && state.currentRow === 4)
      ) {
        dispatch({ type: "GAME_OVER" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state.currentRow, state.currentCell, state.gameOver]);

  const getColor = (rowIndex: number, columnIndex: number, letter: string) => {
    if (state.submittedRows[rowIndex]) {
      if (word.includes(letter)) {
        if (word[columnIndex] === letter) {
          return "bg-green-500";
        } else {
          return "bg-yellow-500";
        }
      }
      return "bg-gray-900";
    }
    return "";
  };

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
              className={`border border-gray-500 flex items-center justify-center text-lg font-bold p-2 w-12 h-12 ${getColor(
                rowIndex,
                columnIndex,
                letter
              )}`}
              style={{
                color: "rgb(var(--foreground-rgb))",
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
