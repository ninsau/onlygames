"use client";

"use client";

import React from "react";

const Keyboard: React.FC = () => {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "Backspace"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M"],
  ];

  const handleButtonClick = (letter: string) => {
    // Dispatch a new keyboard event with the clicked letter
    window.dispatchEvent(new KeyboardEvent("keydown", { key: letter }));
  };

  return (
    <div className="flex flex-col items-center p-4 rounded shadow-lg bg-white dark:bg-gray-800">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-2 flex-wrap">
          {row.map((letter) => (
            <button
              key={letter}
              className={`${
                letter === "Backspace" || letter === "Enter"
                  ? "w-24 sm:w-28 md:w-32"
                  : "w-12 sm:w-14 md:w-16"
              } h-12 border border-gray-300 dark:border-gray-500 rounded-md text-lg font-bold uppercase focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 mx-1`}
              onClick={() => handleButtonClick(letter)}
              style={{
                color: "rgb(var(--foreground-rgb))",
                backgroundColor: "rgb(var(--background-start-rgb))",
              }}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
