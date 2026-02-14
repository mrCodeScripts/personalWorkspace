import React, { memo, useInsertionEffect, useState } from "react";

function TryUseInsertionEffectExample1() {
  const [colorState, newColorState] = useState("green");

  console.log(colorState);

  const MemoizedComponent = React.memo(({ bgColor }) => {
    useInsertionEffect(() => {
      const styleTag = document.createElement("style");
      styleTag.textContent = `.box {
                padding: 10px;
                border-radius: 10px;
                background-color: ${bgColor};
                border: 1px solid blue;
            }`;
      document.head.appendChild(styleTag);
      return () => document.head.removeChild(styleTag);
    }, [bgColor]);
    return <div className="box">This is a box</div>;
  });

  return (
    <>
      <MemoizedComponent bgColor={colorState} />
      <button 
        onClick={() => {colorState === "green" ? newColorState("red") : newColorState("green")}}
        className="p-3 m-3 bg-blue-300 rounded-xl outline-none border-2 border-blue-600"
      >
        Toggle Color State
      </button>
    </>
  );
}

export default function TryUseInsertionEffect() {
  return (
    <>
      <TryUseInsertionEffectExample1 />
    </>
  );
}

/**
 * useInsertionEffect()
 * ---------------------
 * 
 * 🔍 WHAT IT IS:
 * --------------
 * useInsertionEffect is a special React hook that runs *synchronously* 
 * during the DOM mutation phase — right before React makes visible 
 * changes to the screen (before the browser paints). 
 * 
 * It’s primarily designed for low-level operations like injecting styles 
 * (CSS-in-JS) so that those styles are guaranteed to exist before the 
 * browser paints the UI — preventing unstyled flashes (FOUC) or flickering.
 * 
 * ⚙️ HOW IT WORKS:
 * ----------------
 * useInsertionEffect runs even earlier than useLayoutEffect:
 * 
 * 1. React prepares changes.
 * 2. Before it applies those changes, useInsertionEffect runs.
 * 3. Then React commits DOM updates.
 * 4. Then useLayoutEffect runs (can read/write DOM safely).
 * 5. Then browser paints.
 * 
 * This means any style or mutation you do in useInsertionEffect will 
 * be ready *before* anything is shown on screen.
 * 
 * 📘 SYNTAX:
 * ----------
 * useInsertionEffect(() => {
 *   // Perform style injection or minimal pre-paint logic
 *   return () => { /* optional cleanup */ /* }
 * }, [deps]);
 * 
 * ✅ WHEN TO USE:
 * ---------------
 * - When writing a CSS-in-JS or style engine that dynamically injects CSS.
 * - To ensure dynamic or theme-based styles are inserted before paint.
 * - When switching light/dark themes instantly without flicker.
 * - When building a low-level custom renderer or library that controls styles.
 * 
 * 🧩 EXAMPLE:
 * -----------
 * // Injects a dynamic CSS rule before the browser paints
 * useInsertionEffect(() => {
 *   const styleTag = document.createElement("style");
 *   styleTag.textContent = `.btn { color: ${theme.primary}; }`;
 *   document.head.appendChild(styleTag);
 *   return () => document.head.removeChild(styleTag);
 * }, [theme.primary]);
 * 
 * 🧱 WHY NOT useEffect or useLayoutEffect?
 * ---------------------------------------
 * - useEffect runs *after* paint → visible flicker may occur.
 * - useLayoutEffect runs *after* DOM changes but *before* paint → still too late 
 *   for guaranteed style injection because the DOM may already be partially committed.
 * - useInsertionEffect ensures injection *before* DOM mutations and paint.
 * 
 * ⚠️ WHAT TO AVOID:
 * -----------------
 * - ❌ Heavy computations or data fetching → it blocks rendering.
 * - ❌ DOM reads/writes → DOM may not be ready yet (use useLayoutEffect instead).
 * - ❌ Animation or transition logic → use requestAnimationFrame or useLayoutEffect.
 * - ❌ Regular UI logic or side effects → better handled with useEffect.
 * 
 * 🧠 WHY IT CAN BLOCK RENDERING:
 * ------------------------------
 * - useInsertionEffect runs synchronously before paint.
 * - The browser *must wait* for it to finish before showing anything.
 * - Doing expensive work here causes render lag or frame drops.
 * 
 * ⚡ SUMMARY:
 * -----------
 * - useInsertionEffect = "Before paint" hook, for injecting critical styles.
 * - Ideal for CSS-in-JS libraries and style engines.
 * - Never for data fetching or general UI logic.
 * - Always keep the logic lightweight and synchronous.
 */

