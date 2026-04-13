"use client";
import React, { useEffect, useState, useRef } from "react";

/**
 * ============================================================
 *  REACT HOOK: useEffect() — COMPLETE NOTES
 *  Personal Web Dev Bible
 *  Stack: Next.js + TypeScript + TSX
 * ============================================================
 *
 *  WHAT IS useEffect?
 *
 *  useEffect is how you run code that's OUTSIDE of rendering.
 *  Rendering is pure — it just reads state and returns JSX.
 *  But sometimes you need to DO something after the render:
 *    - fetch data from an API
 *    - start a timer
 *    - listen to browser events
 *    - sync with something outside React
 *
 *  These are called SIDE EFFECTS — things that affect the
 *  outside world, not just your JSX output.
 *  useEffect is where all of that lives.
 *
 *  TIMING:
 *  useEffect does NOT run during rendering.
 *  It runs AFTER React finishes rendering and updates the DOM.
 *  It also ONLY runs in the browser — never on the server.
 *  This is why it's the safe place for browser-only APIs.
 *
 *  FULL FLOW:
 *
 *    1. Component renders (function runs top to bottom)
 *    2. React updates the DOM
 *    3. Browser paints the screen
 *    4. useEffect runs  ← after all of this
 *
 * ============================================================
 */

// ============================================================
//  1. THE THREE FORMS — dependency array
// ============================================================
//
//  The second argument to useEffect is the DEPENDENCY ARRAY.
//  It tells React WHEN to re-run the effect.
//
//  FORM 1: Empty array []
//  → runs ONCE, after the first render only (on mount)
//  → never runs again no matter what changes
//  → this is your "setup" — timers, subscriptions, one-time fetches
//
//  FORM 2: Array with values [a, b]
//  → runs on mount + re-runs whenever a or b changes
//  → React compares values between renders, if any changed → re-runs
//  → use when your effect depends on specific state or props
//
//  FORM 3: No array at all
//  → runs after EVERY single render
//  → rarely useful, usually a mistake
//  → if everything triggers it, it's probably in the wrong place
//

function DependencyArrayForms1() {
  const [count, setCount] = useState<number>(0);
  const [name, setName] = useState<string>("");

  // FORM 1 — runs once on mount only
  useEffect(() => {
    console.log("Form 1: I only run on mount, once. count:", count);
    // count will ALWAYS be 0 here — it never re-runs to see new values
  }, []);

  // FORM 2 — runs on mount + whenever count changes
  useEffect(() => {
    console.log("Form 2: count changed to:", count);
    // this sees the latest count every time it re-runs
    // name changes do NOT trigger this — it's not in the array
  }, [count]);

  // FORM 2 — watching multiple values
  useEffect(() => {
    console.log("Form 2b: count or name changed", count, name);
    // re-runs when EITHER count OR name changes
  }, [count, name]);

  // FORM 3 — runs after every single render (no array)
  useEffect(() => {
    console.log("Form 3: I run after every render");
    // this runs on mount, on every count change, on every name change
    // on every re-render from parent — EVERYTHING triggers this
  });

  return (
    <div className="p-3 space-y-2">
      <p>
        count: {count} | name: {name}
      </p>
      <button
        className="p-2 bg-blue-400 text-white"
        onClick={() => setCount((p) => p + 1)}
      >
        increment count
      </button>
      <input
        className="border p-1"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="type a name"
      />
    </div>
  );
}

function DependencyArrayForms2() {
  const [state, setState] = useState<boolean>(false);
  const [secondState, setSecondState] = useState<number>(0);

  // Only runs ONCE
  useEffect(() => {
    console.log(
      "%cUSE EFFECT WITH EMPTY DEP ARR[]: %cWill only run once (on mount) no matter what state was changed and or re-rendered.\n" +
        `%cState 1: %c${state ? "TRUE" : "FALSE"}  |  %cState 2: %c${secondState}`,
      "padding: 10px; color: lime; font-weight: bold;",
      "color: lime;",
      "padding: 5px; color: red; font-weight: bold;",
      "padding: 5px; color: blue; font-weight: bold;",
      "padding: 5px; color: red; font-weight: bold;",
      "padding: 5px; color: blue; font-weight: bold;",
    );
  }, []);

  // Will run on every render or re-render (on mount).
  useEffect(() => {
    console.log(
      "%cUSE EFFECT WITH NO DEP ARR[]: %cWill run on every single render and re-render.\n" +
        `%cState 1: %c${state ? "TRUE" : "FALSE"}  |  %cState 2: %c${secondState}`,
      "padding: 10px; color: lime; font-weight: bold;",
      "color: lime;",
      "padding: 5px; color: red; font-weight: bold;",
      "padding: 5px; color: blue; font-weight: bold;",
      "padding: 5px; color: red; font-weight: bold;",
      "padding: 5px; color: blue; font-weight: bold;",
    );
  });

  // Will only run when the observed dependency state changes.
  useEffect(() => {
    console.log(
      "%cUSE EFFECT WITH ONE DEP IN ARR[state_1]: %cWill run everytime the observed dependency state rendered or changes.\n" +
        `%cState 1: %c${state ? "TRUE" : "FALSE"}`,
      "padding: 10px; color: lime; font-weight: bold;",
      "color: lime;",
      "padding: 5px; color: red; font-weight: bold;",
      "padding: 5px; color: blue; font-weight: bold;",
    );
  }, [state]);

  // Will run when one of the observed dependency state changes.
  useEffect(() => {
    console.log(
      "%cUSE EFFECT WITH MULTIPLE DEP IN ARR[state_1, state_2]: %cWill run everytime either of the observed dependencies state rendered or changes.\n" +
        `%cState 1: %c${state ? "TRUE" : "FALSE"}  |  %cState 2: %c${secondState}`,
      "padding: 10px; color: lime; font-weight: bold;",
      "color: lime;",
      "padding: 5px; color: red; font-weight: bold;",
      "padding: 5px; color: blue; font-weight: bold;",
      "padding: 5px; color: red; font-weight: bold;",
      "padding: 5px; color: blue; font-weight: bold;",
    );
  }, [state, secondState]);

  return (
    <>
      <p className="font-semibold">
        STATE:{" "}
        {state ? (
          <span className="text-green-300 font-bold">TRUE</span>
        ) : (
          <span className="text-red-300 font-bold">FALSE</span>
        )}
      </p>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className="p-3 bg-green-700 font-semibold rounded-md"
          onClick={() => setState((prev) => !prev)}
        >
          Change State 1
        </button>
        <button
          type="button"
          className="p-3 bg-green-700 font-semibold rounded-md"
          onClick={() => setSecondState((prev) => prev + 1)}
        >
          Change State 2
        </button>
      </div>
    </>
  );
}

// ============================================================
//  2. CLEANUP
// ============================================================
//
//  Sometimes your effect STARTS something that needs to be STOPPED.
//  Examples: timers, intervals, event listeners, subscriptions.
//  If you don't stop them, they keep running even after the
//  component is gone — this is called a MEMORY LEAK.
//
//  Cleanup is a function you RETURN from useEffect.
//  React calls it at two moments:
//
//    1. Before the component is REMOVED from the page (unmount)
//    2. Before the effect RUNS AGAIN (if dependencies changed)
//
//  FLOW WITH CLEANUP:
//
//    component mounts
//        ↓
//    useEffect SETUP runs    ← "I'm here, starting something"
//        ↓
//        ... time passes ...
//        ↓
//    dependency changes OR component unmounts
//        ↓
//    useEffect CLEANUP runs  ← "stopping what I started"
//        ↓
//    if dependency changed → SETUP runs again with new values
//    if unmounting         → done, component is gone
//

// So the full mental checklist before you finish writing any useEffect:
// Ask yourself:
//    1. what states am I reading in here?    → goes in deps
//    2. what props am I reading in here?     → goes in deps
//    3. what functions am I calling in here? → goes in deps (or define inside)
//    4. what am I NOT reading?               → doesn't go in deps, doesn't matter

function CleanupExample1() {
  const [seconds, setSeconds] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);

  useEffect(() => {
    if (!running) return; // don't start if not running

    // SETUP — start an interval
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    console.log("interval started");

    // CLEANUP — return a function that stops the interval
    return () => {
      clearInterval(interval);
      console.log("interval cleared"); // runs when running changes or unmounts (or when the browser is refreshed)
    };

    // re-runs when `running` changes
    // cleanup fires first, then setup fires again with new value
  }, [running]);

  return (
    <div className="p-3 space-y-2">
      <p>seconds: {seconds}</p>
      <button
        className="p-2 bg-green-400 text-white"
        onClick={() => setRunning(true)}
      >
        start
      </button>
      <button
        className="p-2 bg-red-400 text-white"
        onClick={() => setRunning(false)}
      >
        stop
      </button>
      <button
        className="p-2 bg-gray-400 text-white"
        onClick={() => setSeconds(0)}
      >
        reset
      </button>
    </div>
  );
}

/*
function CleanupExample2() {
  const [state1, setState1] = useState<boolean>(false);
  const [disableCleanup, setDisableCleanup] = useState<boolean>(false);
  const [disableCleanupDisablingMsg, setDisableCleanupDisablingMsg] = useState<boolean>(false);

  useEffect(() => {
    if (disableCleanup && !disableCleanupDisablingMsg) {
      console.log(
        "%c↑ CLEANUP FUNCTION STILL RAN INITIALLY DUE TO SNAPSHOT RULE!",
        "color: blue; font-weight: bold;",
      );
      setDisableCleanupDisablingMsg(true);
    }
    console.log(
      "%cRUN USE EFFECT CODE PART: %c{ %cSTATE 1: " +
        `%c${state1 ? "TRUE" : "FALSE"}%c}`,
      "padding-top: 30px; color: red; font-weight: bold;",
      "color: yellow; font-weight: bold;",
      "color: blue; font-weight: bold;",
      "color: lime; font-weight: bold;",
      "color: yellow; font-weight: bold;",
    );
    console.log(
      "%cCLEANUP FUNCTION RETURNED (SET-UP)!",
      "color: blue; font-weight: bold;",
    );
    if (disableCleanup) return;
    return () =>
      console.log(
        "%cCLEANUP FOR STATE 1: " + `%c${state1 ? "TRUE" : "FALSE"}`,
        "color: red; font-weight: bold;",
        "color: lime; font-weight: bold;",
      );
  }, [state1]);

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className="p-2 bg-green-400 text-white"
          onClick={() => {setState1((prev) => !prev);}}
        >
          Change State 1
        </button>
        <button
          type="button"
          className="p-2 bg-red-400 text-white"
          onClick={() => {setDisableCleanup((prev) => !prev); setDisableCleanupDisablingMsg(disableCleanup)}}
        >
          {disableCleanup ? "Enable" : "Disable"} Cleanup
        </button>
      </div>
    </>
  );
}
*/

function CleanupExample2() {
  const [state1, setState1] = useState<boolean>(false);
  const [cleanupEnabled, setCleanup] = useState<boolean>(true);

  useEffect(() => {
    console.log(
      "%cSETUP ran — state1:",
      "color:lime;font-weight:bold;padding-top:30px",
      state1,
    );

    if (!cleanupEnabled) {
      console.log(
        "%cCleanup SKIPPED (disabled)",
        "color:orange;font-weight:bold;",
      );
      return; // no cleanup registered this run
    }

    // cleanup registered — fires before next run or unmount
    return () => {
      console.log(
        "%cCLEANUP ran — state1 was:",
        "color:red;font-weight:bold;",
        state1,
      );
    };
  }, [state1, cleanupEnabled]); // ← both values read inside, both go in deps

  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        className="p-2 bg-green-400 text-white"
        onClick={() => setState1((prev) => !prev)}
      >
        Toggle State 1 ({state1 ? "TRUE" : "FALSE"})
      </button>
      <button
        className="p-2 bg-red-400 text-white"
        onClick={() => setCleanup((prev) => !prev)}
      >
        {cleanupEnabled ? "Disable" : "Enable"} Cleanup
      </button>
    </div>
  );
}

// CLEANUP WITH EVENT LISTENERS — another classic example
function CleanupEventListener() {
  type MousePositionType = { x: number; y: number };
  const defaultMousePos: MousePositionType = { x: 0, y: 0 };

  const [mousePosition, setMousePosition] =
    useState<MousePositionType>(defaultMousePos);
  const [restartMousePos, triggerRestartMousePos] = useState<boolean>(false);

  useEffect(() => {
    // SETUP — attach event listener
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    console.log(
      "%cMouse event listener attached",
      "color: blue; font-weight: bold; padding: 10px;",
    );

    // CLEANUP — detach event listener
    // without this, the listener keeps firing even after component is gone
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      console.log(
        "%cMouse event listener removed",
        "color: red; font-weight: bold; padding: 10px;",
      );
    };
  }, []); // empty array — attach once, remove when component is
  // gone (when you refresh the website or when a re-rendering happens).

  useEffect(() => {
    console.log(
      "%cCurrent Mouse Position" +
        `[X: ${mousePosition.x}, Y: ${mousePosition.y}]`,
      "color: lime; font-weight: bold; padding: 10px;",
    );
    return () => {
      console.log(
        "%cMouse Position Tracking Cleanup (Triggered)",
        "color: red; font-weight: bold; padding: 10px;",
      );
    };
  }, [mousePosition]);

  // USE EFFECT RESTART
  //    triggerRestartMousePos(true) called
  //     ↓
  //    restartMousePos changes → re-render
  //     ↓
  //    useEffect [restartMousePos] sees dep changed
  //     ↓
  //    CLEANUP fires FIRST         ← "Mouse Position Restart Triggered!"
  //      → setMousePosition resets to {x:0, y:0}
  //      → triggerRestartMousePos(false)
  //     ↓
  //    SETUP runs after            ← "Previous Mouse Position [X:0, Y:0]"
  useEffect(() => {
    console.log(
      "%cPrevious Mouse Position" +
        `[X: ${mousePosition.x}, Y: ${mousePosition.y}]`,
      "color: violet; font-weight: bold; padding: 10px;",
    );

    return () => {
      console.log(
        "%cMouse Position Restart Triggered!",
        "color: red; font-weight: bold; padding: 10px;",
      );
      setMousePosition(defaultMousePos);
      triggerRestartMousePos(false);
    };
  }, [restartMousePos]);

  return (
    <>
      <div className="p-3 flex flex-col gap-3">
        <p className="">
          <span className="text-green-500">Mouse Position</span>:{" "}
          <span className="font-semibold text-red-400">
            [X: {mousePosition.x}px] [Y: {mousePosition.y}px]
          </span>
        </p>
        <button
          type="button"
          className="p-2 text-white bg-green-400"
          onClick={() => triggerRestartMousePos(true)}
        >
          Restart Mouse Position
        </button>
      </div>
    </>
  );
}

// ============================================================
//  3. STALE CLOSURES — the bug you WILL hit
// ============================================================
//
//  Remember the snapshot rule from useState?
//  Same thing applies inside useEffect.
//
//  When useEffect runs, it CAPTURES the values of state/props
//  at that moment — like a photo. If you don't include a value
//  in the dependency array, the effect never re-runs, so it
//  forever sees the OLD value from when it first ran.
//  This is called a STALE CLOSURE.
//
//  THE BUG:
//
//    useEffect runs once on mount → captures count = 0
//    count changes to 1, 2, 3...
//    but effect still thinks count = 0 because it never re-ran
//    → you're reading a stale (old) value
//
//  THE FIX:
//    Add the value to the dependency array so the effect
//    re-runs and captures the fresh value each time.
//

function StaleClosureExample() {
  const [count, setCount] = useState<number>(0);

  // ❌ STALE CLOSURE — count is always 0 inside here
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("stale count:", count); // always logs 0 — frozen snapshot
    }, 1000);
    return () => clearInterval(interval);
  }, []); // count not in deps → effect never re-runs → count stays 0 forever

  // ✅ FIX OPTION 1 — add count to deps (but this restarts interval every change)
  useEffect(() => {
    // const interval = setInterval(() => {
    console.log("fresh count:", count); // sees latest count ✅
    // }, 100);
    // return () => clearInterval(interval);
  }, [count]); // re-runs when count changes → fresh value

  // ✅ FIX OPTION 2 — use functional updater (doesn't need count in deps)
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1); // prev is always latest, no closure issue
    }, 1000);
    return () => clearInterval(interval);
  }, []); // safe — not reading count, using functional updater instead

  return (
    <div className="p-3">
      <p>count: {count}</p>
      <button
        className="p-2 bg-blue-400 text-white"
        onClick={() => setCount(0)}
      >
        reset
      </button>
    </div>
  );
}

// ============================================================
//  4. DATA FETCHING — the most common real world use
// ============================================================
//
//  Fetching data is a side effect — you're talking to the outside
//  world (an API). This belongs in useEffect.
//
//  IMPORTANT: useEffect callback cannot be async directly.
//  Define the async function inside, then call it.
//

interface Post {
  id: number;
  title: string;
  body: string;
}

function DataFetchingExample() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      const data = (await res.json()) as Post;
      setPost(data);
    } catch (err) {
      setError("failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // ❌ WRONG — can't make useEffect callback async directly
    // async useEffect(() => { ... }) ← syntax error
    // You cant use async keyword on the useEffect callback.

    // ✅ RIGHT — define async function inside, then call it
    fetchPost();
    // NOTE: In Next.js App Router with Server Components,
    // you often fetch directly in the server component without useEffect.
    // useEffect fetching is for CLIENT components that need dynamic data.
  }, []); // empty array — fetch once on mount

  if (loading) return <p>loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-3 border">
      <p className="font-bold">ID: {post?.id}</p>
      <p className="font-semibold">TITLE: {post?.title}</p>
      <p className="text-sm">BODY: {post?.body}</p>
    </div>
  );
}

// ============================================================
//  5. THE MOUNTED PATTERN — avoiding hydration errors
// ============================================================
//
//  useEffect never runs on the server.
//  So anything inside useEffect is GUARANTEED to be client-only.
//  This makes it perfect for the mounted pattern.
//
//  Use this whenever you need to:
//    - use browser-only APIs (window, localStorage, canvas)
//    - render something that differs between server and client
//    - access the DOM directly
//

function MountedPattern() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true); // only runs in browser, never on server
  }, []);

  if (!mounted) return <p>Loading...</p>; // server and client both agree here

  // safe zone — only browser ever reaches here
  return (
    <div className="p-3">
      <p>window width: {window.innerWidth}px</p>
      <p>
        localStorage available:{" "}
        {typeof localStorage !== "undefined" ? "yes" : "no"}
      </p>
    </div>
  );
}

// Sample for using Mounted Pattern with UseEffect for
// browser APIs access.
function MountedPatternSample1 () {
  const [mounted, setMounted] = useState<boolean>(false);

  const loadWebAPIs = async () => {

    // (SIMULATE LOADING BROWSER APIs)
    await new Promise(res => setTimeout(res, 3000));
    setMounted(true);

    return [];
  };

  useEffect(() => {
    // YOU CAN USE BROWSER APIS HERE
    loadWebAPIs();
  }, []);

  if (!mounted) return (
    <>
      <p>Loading Browser APIs...</p>
    </>
  )

  return (
    <>
      <p className="font-semibold text-green-500">✅ Browser APIs Loaded </p>
    </>
  )
}

// ============================================================
//  6. WHAT useEffect IS FOR vs WHAT IT'S NOT FOR
// ============================================================
//
//  ✅ USE useEffect FOR:
//    - Fetching data when component loads or a value changes
//    - Setting up timers and intervals (with cleanup)
//    - Listening to browser events: scroll, resize, keydown (with cleanup)
//    - Syncing with things outside React: localStorage, external libraries
//    - The mounted pattern (browser-only code)
//    - Logging, analytics
//
//  ❌ DO NOT USE useEffect FOR:
//    - Computing a value from existing state → just compute it inline
//    - Handling user events → use onClick, onChange handlers instead
//    - Updating state that could be derived → derive it directly
//    - Chaining state updates → usually means wrong design
//

function WhatNotToDoWithUseEffect() {
  const [firstName, setFirstName] = useState<string>("John");
  const [lastName, setLastName] = useState<string>("Doe");

  // ❌ WRONG — using useEffect to derive a value from existing state
  const [fullName, setFullName] = useState<string>("");
  useEffect(() => {
    setFullName(`${firstName} ${lastName}`); // unnecessary, causes extra render
  }, [firstName, lastName]);

  // ✅ RIGHT — just compute it directly, no useEffect needed
  const fullNameDirect = `${firstName} ${lastName}`; // derived inline, zero overhead

  return (
    <div className="p-3">
      <p>wrong way full name: {fullName}</p>
      <p>right way full name: {fullNameDirect}</p>
    </div>
  );
}

// ============================================================
//  QUICK REFERENCE CHEATSHEET
// ============================================================
//
//  useEffect(() => { ... }, [])          → runs once on mount
//  useEffect(() => { ... }, [a, b])      → runs on mount + when a or b changes
//  useEffect(() => { ... })              → runs after every render
//
//  useEffect(() => {
//    return () => { ... }               → cleanup: runs before next effect or unmount
//  }, []);
//
//  RULES:
//  - can't be async directly → define async fn inside and call it
//  - only runs in the browser, never on the server
//  - runs AFTER render, not during
//  - always include values you READ inside the effect in the dep array
//    otherwise you get stale closures (reading old values)
//  - always clean up timers, intervals, event listeners
//    otherwise you get memory leaks
//
// ============================================================

// ---- PAGE EXPORT ----
export default function UseEffectLesson() {
  type ComponentList = {
    title?: string;
    component: React.ComponentType;
    run?: boolean;
  };

  // This is a DYNAMIC COMPONENT MAPPING — we can easily add/remove
  // components from the list without changing the JSX structure below.
  // Want to learn this? Go to file './dynamic-component-mapping.tsx'.
  const components: ComponentList[] = [
    {
      title: "Dependency Array Forms 1",
      component: DependencyArrayForms1,
      run: false,
    },
    {
      title: "Dependency Array Forms 2",
      component: DependencyArrayForms2,
      run: false,
    },
    {
      title: "Cleanup — Timer",
      component: CleanupExample1,
      run: false,
    },
    {
      title: "Cleanup Example 2",
      component: CleanupExample2,
      run: false,
    },
    {
      title: "Cleanup Event Listeners",
      component: CleanupEventListener,
      run: false,
    },
    {
      title: "Stale Closure Example",
      component: StaleClosureExample,
      run: false,
    },
    {
      title: "Data Fetching",
      component: DataFetchingExample,
      run: false,
    },
    {
      title: "Mounted Pattern",
      component: MountedPattern,
      run: false,
    },
    {
      title: "Mounted Pattern Sample",
      component: MountedPatternSample1,
      run: true,
    },
    {
      title: "What NOT to do",
      component: WhatNotToDoWithUseEffect,
      run: false,
    },
  ];

  return (
    <div className="flex flex-col p-3 space-y-6">
      <p className="font-semibold text-xl">
        REACT HOOK: <span className="text-green-700">useEffect()</span>
      </p>
      {components.map((item, index) =>
        !item.run ? null : (
          <div key={index}>
            <p className="font-semibold text-sm text-gray-500 mb-1">
              {index + 1}. {item.title}
            </p>
            <item.component />
          </div>
        ),
      )}
    </div>
  );
}
