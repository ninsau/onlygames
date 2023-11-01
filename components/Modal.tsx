"use client";
import { ModalProps } from "@/lib/types";
import React, { FC } from "react";

const Modal: FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOutsideClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={handleOutsideClick}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg relative w-full max-w-lg overflow-auto max-h-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M18.364 5.636l-1.414-1.414L12 10.586 7.05 4.222l-1.415 1.415L10.586 12l-4.95 4.95 1.415 1.415L12 13.415l4.95 4.95 1.415-1.415L13.415 12z" />
          </svg>
        </button>
        <div className="text-gray-800 dark:text-gray-200">
          <h2 className="text-xl font-bold mb-4">How to Play</h2>
          <p>
            Welcome to our ripoff word game! In this game, you will be tasked
            with guessing a secret five-letter word. Each guess will provide
            feedback in the form of color-coded tiles:
          </p>
          <ul className="list-disc list-inside mt-2 mb-4">
            <li className="mt-1">
              <span className="font-bold text-green-500">Green:</span> The
              letter is correct and in the right position.
            </li>
            <li className="mt-1">
              <span className="font-bold text-yellow-500">Yellow:</span> The
              letter is correct but in the wrong position.
            </li>
            <li className="mt-1">
              <span className="font-bold text-gray-500">Gray:</span> The letter
              is incorrect.
            </li>
          </ul>
          <p>
            You have six attempts to guess the word correctly. With each guess,
            use the feedback to refine your subsequent guesses. You have one new
            word per day. Good luck, and may the words be ever in your favor!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
