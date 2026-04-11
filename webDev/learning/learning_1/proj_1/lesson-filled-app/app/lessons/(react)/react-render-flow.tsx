"use client";

import { useEffect, useState } from "react";

function Experiment1 () {
  const [state, newState] = useState<number>(0);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, [])

  if (!mounted) {
    return (
      <>
        <div>Loading</div>
      </>
    )
  }

  const handler = () => {
    newState(prev => prev + 1);
    console.log(state);
  };

  console.log(state);

  return (
    <>
      <button
        className="p-3 bg-blue-300 text-white"
        onClick={handler}
      >
        Click this!
      </button>
    </>
  )
};

export function ReactRenderFlow () {
  return (
    <>
      <Experiment1 />
    </>
  );
}