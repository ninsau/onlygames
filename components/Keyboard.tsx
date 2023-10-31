"use client";

import React, { useState, useEffect } from "react";

const Keyboard: React.FC = () => {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
  ];

  const [activeKey, setActiveKey] = useState<string | null>(null);

  const handleButtonClick = (letter: string) => {
    setActiveKey(letter);
    window.dispatchEvent(new KeyboardEvent("keydown", { key: letter }));
    setTimeout(() => setActiveKey(null), 200);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key.toUpperCase();
    if (rows.flat().includes(key)) {
      setActiveKey(key);
      setTimeout(() => setActiveKey(null), 200);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
              } h-12 border border-gray-300 dark:border-gray-500 rounded-md text-lg font-bold uppercase mx-1 ${
                activeKey === letter
                  ? "bg-blue-500 dark:bg-white border-blue-700 dark:border-white"
                  : ""
              }`}
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
