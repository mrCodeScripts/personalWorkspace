// "use client";
/*
import { format, addDays, differenceInDays } from "date-fns";
import { useState } from "react";
// INSTALLATION
// -> npm install date-fns

export default function UsefulLibraries() {
  const today = new Date();

  // click handler
  const changeTextInsideElement = (prop: {
    e: React.MouseEvent<HTMLButtonElement>;
    data: { placeholder: string; value: string };
  }) => {
    const [state, changeState] = useState(false);
    state
      ? (prop.e.currentTarget.innerText = prop.data.value)
      : (prop.e.currentTarget.innerText = prop.data.placeholder);
  };

  // date strings
  const niceDate = () => format(today, "MMMM do, yyyy");

  // individual output functions
  const functions = [niceDate];

  return (
    <>
      <h1 className="text-2xl font-semibold">Useful Libraries</h1>
      <div className="grid grid-cols-auto grid-rows-5">
        {functions.map((func, i) => (
          <button
            key={i}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              changeTextInsideElement({
                e: e,
                data: { placeholder: func.name, value: func() },
              })
            }
          >
            {func.name}
          </button>
        ))}
      </div>
    </>
  );
}

*/

"use client"; // Ensure this is at the top if using Next.js App Router

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

// 1. Move functions outside or define them with explicit labels
// This avoids relying on the unreliable `func.name`
const LIBRARY_FUNCTIONS = [
  { 
    id: "niceDate", 
    label: "Nice Date", 
    getValue: () => format(new Date(), "MMMM do, yyyy") 
  },
];

export default function UsefulLibraries() {
  const [activeButtons, setActiveButtons] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  // 2. Fix Hydration: Only allow client-specific rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleButton = (id: string) => {
    setActiveButtons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Prevent the "server text doesn't match client" error by 
  // not rendering the dynamic parts until the client takes over.
  if (!mounted) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Useful Libraries</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {LIBRARY_FUNCTIONS.map((item) => {
          const isShowingValue = activeButtons[item.id];

          return (
            <button
              key={item.id}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded transition-colors"
              onClick={() => toggleButton(item.id)}
            >
              {isShowingValue ? item.getValue() : item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}