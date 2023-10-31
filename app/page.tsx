"use client";

import React, { useState } from "react";
import Grid from "../components/Grid";
import Keyboard from "../components/Keyboard";
import Modal from "../components/Modal";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        className="flex flex-col items-center justify-center min-h-screen"
        style={{ background: "var(--background-start-rgb)" }}
      >
        <div className="self-stretch text-right w-full">
          <button
            onClick={() => setModalOpen(true)}
            className="p-2 bg-gray-700 text-white shadow-lg"
          >
            Learn How to Play
          </button>
        </div>
        <Grid />
        <Keyboard />
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </>
  );
}
