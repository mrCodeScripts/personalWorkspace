import { useEffect, useRef, useState } from "react";

function UseStateExample () {
  const prevState = useRef(null);
  const [count, newCount] = useState(0);
  useEffect(() => {
    console.log("Count set", count);
    console.log("Previous state: ", prevState.current);
    return () => console.log("Component unmounted!");
  }, [count]);

  const act = () => {
    newCount(prev => {
      prevState.current = prev;
      return prev + 1;
    });
  };

  return (
    <>
      <button type="button" className="p-2 m-2 bg-green-300" onClick={act}>Click Me!  {count}</button>
    </>
  )
}

function InputStateExample () {
  const [input, newInput] = useState('');

  return (
    <>
      <p className="p-3">
        {input}
      </p>
      <input 
        type="text" 
        placeholder="Please input something..." 
        className="px-4 py-2 m-3 rounded-xl border-2 border-gray-300 text-sm"
        onInput={(e) => newInput(prev => prev = e.target.value)}
      />
    </>
  )
}

function CountStateExample () {
  const [count, newCount] = useState(0);

  return (
    <>
      <div className="h-full w-full flex flex-col justify-center items-center">
        <p className="p-5 text-2xl font-bold">
          {count}
        </p>
        <div className="flex flex-row h-auto w-auto gap-5">
          <button
            className="p-2 bg-green-500 margin-3 border-2 border-green-800 font-bold text-white rounded-xl px-5 py-3"
            type="button"
            onClick={() => newCount(prev => prev += 1)}
          >
            INCREMENT
          </button>
          <button
            className="p-2 bg-red-500 margin-3 border-2 border-red-800 font-bold text-white rounded-xl px-5 py-3"
            type="button"
            onClick={() => newCount(prev => prev -= 1)}
          >
            DECREMENT
          </button>
        </div>
    </div>
    </>
  )
}

export function TryUseState () {
  return (
    <>
      {/* <InputStateExample /> */}
      <UseStateExample />
    </>
  )
}


/*
-------------------------------------------------------------
🧠 COMPLETE DESCRIPTION OF useState()
-------------------------------------------------------------

useState(initialValue)
-------------------------------------------------------------
- Purpose:
  useState() lets React components “remember” values between renders.
  When the component re-renders, React keeps the previous state value
  instead of resetting it to the initial one.

-------------------------------------------------------------
🔹 BASIC USAGE:

const [state, setState] = useState(initialValue);

- `state` → The current value (whatever is stored).
- `setState` → A function that updates the value and triggers a re-render.

-------------------------------------------------------------
🧩 EXAMPLES:

// Example 1: Basic counter
const [count, setCount] = useState(0);

function increment() {
  setCount(count + 1); // ✅ direct update using current value
}

// Example 2: Using a callback for safety (recommended when updating from previous state)
setCount(prevCount => prevCount + 1); // ✅ indirect update, safer when React batches updates

// Example 3: Storing strings or objects
const [name, setName] = useState("Boss");
const [user, setUser] = useState({ id: 1, name: "Boss" });

// Updating object states safely:
setUser(prev => ({ ...prev, name: "Alpha Boss" }));

-------------------------------------------------------------
⚙️ HOW IT WORKS:

- React remembers the state value for each render cycle.
- When you call setState(), React schedules a re-render with the new value.
- You can’t mutate the state directly (e.g., count++ ❌), 
  you must use setState() so React knows it should re-render.

-------------------------------------------------------------
💡 DIRECT vs INDIRECT UPDATES:

- ✅ Direct update → When you don’t rely on previous state.
  Example: setIsOpen(true);

- ✅ Indirect update → When the new value depends on the old one.
  Example: setCount(prev => prev + 1);

-------------------------------------------------------------
🧩 ANALOGY:
Think of `useState` as a note in React’s memory.
- You write something on it (`setState`).
- Every time React redraws the UI, it remembers what was on the note.

-------------------------------------------------------------
⚡ BONUS (PERFORMANCE & BEHAVIOR):

- Multiple setState() calls in one event are batched for efficiency.
  Example:
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  → React combines them efficiently before re-rendering.

- You can store anything in useState — numbers, strings, objects, arrays, even functions.

-------------------------------------------------------------
💬 TL;DR SUMMARY:
- Remembers values between renders.
- Triggers re-renders when updated.
- Direct update = setState(newValue)
- Indirect update = setState(prev => newValue)
- React batches updates for performance.
-------------------------------------------------------------
*/

