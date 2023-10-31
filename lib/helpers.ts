import { words } from "./constants";
import { Action, State } from "./types";

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0); // Start of the year
  const diff =
    now.valueOf() -
    start.valueOf() +
    (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return day;
}

const dayOfYear: number = getDayOfYear();

export const word: string = words[dayOfYear - 1].toUpperCase();

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_LETTER":
      if (state.gameOver) return state;
      const newGridContent = [...state.gridContent.map((row) => [...row])];
      newGridContent[state.currentRow][state.currentCell] = action.letter!;
      return {
        ...state,
        gridContent: newGridContent,
        currentCell: state.currentCell + 1,
      };
    case "REMOVE_LETTER":
      if (state.gameOver) return state;
      const newGridContent1 = [...state.gridContent.map((row) => [...row])];
      newGridContent1[state.currentRow][state.currentCell - 1] = "";
      return {
        ...state,
        gridContent: newGridContent1,
        currentCell: state.currentCell - 1,
      };
    case "MOVE_TO_NEXT_ROW":
      if (state.gameOver) return state;
      const newSubmittedRows = [...state.submittedRows];
      newSubmittedRows[state.currentRow] = true;
      return {
        ...state,
        currentRow: state.currentRow + 1,
        currentCell: 0,
        submittedRows: newSubmittedRows,
      };
    case "GAME_OVER":
      const updatedSubmittedRows = [...state.submittedRows];
      updatedSubmittedRows[state.currentRow] = true;
      return {
        ...state,
        gameOver: true,
        submittedRows: updatedSubmittedRows,
      };
    default:
      throw new Error();
  }
};
