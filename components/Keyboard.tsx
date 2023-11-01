"use client";

import React, { useState, useEffect } from "react";

const Keyboard: React.FC = () => {
  const baseRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  const keyMap: { [key: string]: string } = {
    "↩": "Enter",
    "⌫": "Backspace",
  };

  const [activeKey, setActiveKey] = useState<string | null>(null);
  const specialKeys = ["↩", "⌫"];

  const handleButtonClick = (letter: string) => {
    const keyEventValue = keyMap[letter] || letter;
    setActiveKey(keyEventValue);
    window.dispatchEvent(new KeyboardEvent("keydown", { key: keyEventValue }));
    setTimeout(() => setActiveKey(null), 200);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key.toUpperCase();
    if ([...baseRows.flat(), ...Object.values(keyMap)].includes(key)) {
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
    <div className="flex flex-col items-center p-2 rounded shadow-lg bg-white dark:bg-gray-800">
      {baseRows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-2 flex-wrap">
          {row.map((letter) => (
            <button
              key={letter}
              className={`w-6 sm:w-8 md:w-12 lg:w-14 h-6 sm:h-8 md:h-12 lg:h-14 border border-gray-300 dark:border-gray-500 rounded-md text-xs sm:text-sm md:text-lg lg:text-xl font-bold uppercase mx-0.5 ${
                activeKey === (keyMap[letter] || letter)
                  ? "bg-blue-500 text-white dark:bg-white dark:text-blue-500 border-blue-700 dark:border-white"
                  : ""
              }`}
              onClick={() => handleButtonClick(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
      <div className="flex justify-center mb-2 flex-wrap">
        {specialKeys.map((letter) => (
          <button
            key={letter}
            className={`w-20 h-6 sm:h-8 md:h-12 lg:h-14 border border-gray-300 dark:border-gray-500 rounded-md text-xs sm:text-sm md:text-lg lg:text-xl font-bold uppercase mx-0.5 ${
              activeKey === (keyMap[letter] || letter)
                ? "bg-blue-500 text-white dark:bg-white dark:text-blue-500 border-blue-700 dark:border-white"
                : ""
            }`}
            onClick={() => handleButtonClick(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
