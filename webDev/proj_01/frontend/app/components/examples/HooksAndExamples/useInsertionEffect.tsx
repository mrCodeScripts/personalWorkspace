"use client";

import { useLayoutEffect, useState } from "react";

function UseInsertionEffectExample1() {
  const [bgColor, newBgColor] = useState<string>("");

  useLayoutEffect(() => {
    const bx = document.getElementById("div-el");
    bx!.style.backgroundColor = bgColor;
  }, [bgColor]);

  return (
    <>
      <div style={{width: "100px", height: "100px", border: "1px solid red", transition: "100ms"}} id="div-el"></div>
      <button type="button" onClick={() => {
        bgColor == "green" ? newBgColor("red") : newBgColor("green");
      }}>Click Me!</button>
    </>
  );
}

export default function UseInsertionEffectExamples() {
  return (
    <>
      <UseInsertionEffectExample1 />
    </>
  );
}
