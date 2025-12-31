"use client";

import { useState } from "react";

export default function IntroGate() {
  const [entered, setEntered] = useState(false);

  const handleEnter = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate([25, 40, 25]);
    }
    setEntered(true);
  };

  if (entered) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <button
        onClick={handleEnter}
        className="text-white text-2xl uppercase tracking-[0.35em] opacity-80 hover:opacity-100 transition"
      >
        ENTER
      </button>
    </div>
  );
}
