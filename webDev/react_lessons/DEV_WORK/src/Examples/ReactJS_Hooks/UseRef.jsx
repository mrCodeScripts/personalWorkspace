import { useEffect, useRef, useState } from "react"

function UseRefExample1 () {
  const countRef = useRef(0);
  const [countState, newCountState] = useState(0);

  const incRef = () => countRef.current += 1;
  const incState = () => newCountState(prev => prev + 1);

  useEffect(() => {
    console.log("Rendering via useEffect!");
  }, [countRef]);

  console.log("Rendering parent!");

  return (
    <>
      <button
        className="p-2 m-2 bg-green-300 rounded-xl text-white font-bold"
        type="button"
        onClick={incRef}
      >
        Click This!
      </button>
    </>
  )
}

function UseRefExample2 () {
  const styleRef = useRef(null);
  const x = useRef(0);
  const addX = (vx) => {
    console.log("Three");
    x.current += vx;
    if (styleRef.current) {
      styleRef.current.style.transform = `translateX(${x.current}px)`;
    }
    console.log(x.current);
  };

  return (
    <>
     <div
        ref={styleRef}
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "green",
          position: "absolute",
          transition: "300ms ease-in-out"
        }}
      ></div>
      <button
        type="button"
        className="p-2 m-2 bg-green-300 rounded-xl text-white font-bold"
        onClick={() => addX(80)}
      >
        Increment Box Direction
      </button>
    </>
  )
}

export default function TryUseRef () {
  return (
    <>
      {/* <UseRefExample2 /> */}
      {/* <UseRefExample1 /> */}
      <Buttons />
    </>
  )
}

/*
-------------------------------------------------------------
🧠 COMPLETE DESCRIPTION OF useRef()
-------------------------------------------------------------

-------------------------------------------------------------
🔹 Purpose:
-------------------------------------------------------------
- useRef() is a React hook that returns a **mutable ref object**.
- The object persists across re-renders.
- Updating the ref **does NOT trigger a re-render**.
- Two main use cases:
  1️⃣ Accessing DOM elements directly.
  2️⃣ Storing mutable values across renders (counters, timers, previous state).

-------------------------------------------------------------
🔹 Syntax:
-------------------------------------------------------------
const myRef = useRef(initialValue);

- The ref object has a single property: myRef.current
- You can read or write to myRef.current freely.

-------------------------------------------------------------
🔹 Accessing DOM Elements:
-------------------------------------------------------------
const inputRef = useRef(null);

<input ref={inputRef} />
<button onClick={() => inputRef.current.focus()}>Focus Input</button>

- Ref points to the DOM element.
- Allows direct manipulation (focus, scroll, style, animation).
- Perfect for smooth updates without triggering React re-render.

-------------------------------------------------------------
🔹 Storing Mutable Values:
-------------------------------------------------------------
const countRef = useRef(0);

- Can store counters, previous values, timers, sockets, or any mutable object.
- Updating countRef.current does NOT trigger component re-render.
- Use when you need persistent storage that doesn’t affect UI directly.

Example:
countRef.current += 1; // updates ref, but no re-render
console.log(countRef.current); // persists across renders

-------------------------------------------------------------
🔹 Tracking Previous State:
-------------------------------------------------------------
- Store previous props/state values to compare or diff changes.
- Works well with useEffect.

Example:
const prevValue = useRef();
useEffect(() => {
  prevValue.current = value; // store previous value after render
}, [value]);

-------------------------------------------------------------
🔹 Animations and Direct DOM Manipulation:
-------------------------------------------------------------
- Perfect for smooth animations or element transforms.
- Can update CSS properties directly using ref.current.style.
- Combine with CSS transitions or requestAnimationFrame for performance.
- Does NOT require re-rendering for every frame.

Example:
styleRef.current.style.transform = `translateX(${x.current}px)`;

-------------------------------------------------------------
🔹 Key Insights / Best Practices:
-------------------------------------------------------------
1️⃣ Ref updates do NOT trigger re-renders — useState/useReducer if UI changes required.
2️⃣ Ideal for:
    - DOM access (focus, scroll, style)
    - Counters or timers
    - Previous values for comparison
    - Animation or smooth transitions
    - Storing mutable objects (sockets, API clients)
3️⃣ Use in combination with useEffect for automated or timed behaviors.
4️⃣ Avoid using ref for state that directly affects rendering — React won’t know it changed.
5️⃣ Can store ANY type of value: number, string, object, array, function.

-------------------------------------------------------------
🔹 TL;DR Summary:
-------------------------------------------------------------
- useRef = persistent, mutable storage across renders
- myRef.current = holds value or DOM element
- Does NOT trigger re-render when updated
- Perfect for:
    • DOM access
    • Animation
    • Timers
    • Previous value tracking
    • Mutable objects
- UseState / UseReducer needed if UI must update

-------------------------------------------------------------
*/


