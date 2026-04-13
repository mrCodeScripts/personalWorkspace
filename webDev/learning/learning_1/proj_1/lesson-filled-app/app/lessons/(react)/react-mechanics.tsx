"use client";

/**
 * ============================================================
 *  PERSONAL REACT NOTES — PHASE 1
 *  Render Loop + useState + Snapshot Rule + Batching + Hydration
 *  Stack: Next.js + TypeScript + TSX
 * ============================================================
 */

import { useState, useEffect } from "react";

// ============================================================
//  1. THE RENDER LOOP — how React actually runs
// ============================================================
//
//  Your component is just a function.
//  React calls it top to bottom, gets the JSX, and exits.
//  That's a "render".
//
//  React has a SECRET SHELF (memory outside your component).
//  Every useState reserves a SLOT on that shelf.
//  Your component doesn't own state — React owns it.
//  Your component just READS from the shelf every time it runs.
//
//  THE FULL LOOP:
//
//    1. Component runs for the first time (mount)
//    2. React creates shelf slots with your initial values
//    3. Function reads shelf, returns JSX
//    4. React paints the browser
//    5. User does something → setState is called
//    6. React updates the shelf
//    7. Current function run finishes AS-IS (old values still in scope)
//    8. React re-runs the function from the TOP
//    9. Function reads NEW values from shelf
//   10. React compares old JSX vs new JSX (diffing)
//   11. Only the changed parts get updated in the browser DOM
//   12. Back to step 5 whenever something happens
//
//  KEY POINT:
//  When setState is called, React doesn't jump back to the top instantly.
//  It finishes the current run first, THEN re-runs from the top.
//  This is why console.log(state) right after setState still shows old value.
//

function RenderLoopNotes() {
  const [count, setCount] = useState<number>(0);

  // This console.log runs EVERY render (every time React calls this function)
  // On mount → logs 0
  // After each click → logs the new value (because this is a fresh run)
  console.log("render ran, count is:", count);

  const handler = () => {
    setCount((prev) => prev + 1);
    // ↑ shelf is updated, but THIS current run is still locked at old count
    // React will re-run the whole function after this handler exits
    console.log("inside handler, count is:", count); // still old value
  };

  return (
    <div className="p-4 border m-4">
      <p>Count: {count}</p>
      <button
        onClick={handler}
        className="p-3 bg-blue-300 text-white rounded-sm"
      >
        Click
      </button>
      {/*
        Console output on each click:
          "inside handler, count is: 0"   ← old value, current run is locked
          "render ran, count is: 1"       ← new run from top, fresh value
          "render ran, count is: 1"       ← re-runs strict mode in dev, so you see this twice (optional)
      */}
    </div>
  );
}

// ============================================================
//  2. SNAPSHOT RULE
// ============================================================
//
//  Every render LOCKS IN its own copy of state — like a photo.
//  Once React starts running your function, that render's values
//  are frozen. Calling setState doesn't edit the current photo.
//  It schedules a NEW photo (re-render) with the updated values.
//
//  This is the same as normal programming — like in C++:
//  if x = 0 and you schedule x = 1, x is still 0 on this line.
//  It only becomes 1 on the next time that code runs.
//  React is the exact same concept, just with re-renders instead.
//

function SnapshotRuleNotes() {
  const [count, setCount] = useState<number>(0);

  const snapshotExample = () => {
    setCount(count + 1); // tells React: next render, count = 1 (or current count + 1)
    console.log(count); // still 0 — this render's snapshot is locked (previous state)
    console.log(count); // still 0
    console.log(count); // still 0 — nothing changes mid-run
    // after this handler exits → React re-renders → count becomes 1
  };

  // ✅ FUNCTIONAL UPDATER — use when new value depends on old value
  // Because React may batch updates (see below), the direct form
  // can give you stale values. The functional form always gets
  // the LATEST value from the shelf.
  const functionalExample = () => {
    setCount((prev) => prev + 1); // prev = guaranteed latest shelf value (much more safe)
  };
  console.log("[COMPONENT RUNS TWICE]: ", `count updated value: ${count}`);

  return (
    <div className="p-4 border m-4">
      <p>Count: {count}</p> {/* always shows the latest value from the shelf */}
      <div className="w-full grid grid-cols-2 gap-2">
        <button
          className="p-3 bg-blue-300 text-white rounded-sm"
          onClick={snapshotExample}
        >
          Snapshot example
        </button>
        <button
          className="p-3 bg-green-300 text-white rounded-sm"
          onClick={functionalExample}
        >
          Functional updater
        </button>
      </div>
    </div>
  );
}

// ============================================================
//  3. BATCHING
// ============================================================
//
//  When you call setState multiple times in one handler,
//  React does NOT re-render after each one.
//  It WAITS until the handler is fully done,
//  then does ONE single re-render with all changes applied.
//
//  This is batching — React is just being efficient.
//  Why re-render 3 times when you can just re-render once at the end?
//
//  Also — only the states that actually CHANGED get updated on the shelf.
//  States you never touched stay exactly where they were.
//  React isn't dumb about it.
//
//  React 18+ (which Next.js uses) batches EVERYWHERE —
//  inside handlers, setTimeout, async functions, promises. All of it.
function BatchingNotes() {
  const [count, setCount] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);

  const batchedHandler = () => {
    setCount((prev) => prev + 1); // queued — shelf not updated yet
    setName("Alex"); // queued — shelf not updated yet
    setActive(true); // queued — shelf not updated yet
    // ↑ handler exits here
    // → React now applies ALL changes to the shelf at once
    // → ONE re-render happens, not three
    // → active was already false and is now true, but if we never
    //   touched a 4th state, that 4th state stays exactly as it was
  };

  // ❌ WRONG — direct form with multiple setStates
  // count is 0, calling setCount(count + 1) three times
  // all three see count as 0 because snapshot is locked
  // result: count becomes 1, not 3
  const wrongWay = () => {
    // This is the reason why its not recommended to directly manipulate
    // state based on the current value of state. Because of batching,
    // you might get stale values.
    setCount(count + 1); // count = 0, sets to 1
    setCount(count + 1); // count still = 0 (snapshot), sets to 1 again
    setCount(count + 1); // count still = 0 (snapshot), sets to 1 again
    // result: 1, not 3 (increments by 1, not 3) ❌
  };

  // ✅ RIGHT — functional updater
  // prev always gets the latest queued value, not the snapshot
  // result: count becomes 3
  const rightWay = () => {
    // This is the recommended way to update state when the new value
    // depends on the old value.
    setCount((prev) => prev + 1); // prev = 0, result = 1
    setCount((prev) => prev + 1); // prev = 1, result = 2
    setCount((prev) => prev + 1); // prev = 2, result = 3
    // result: 3 ✅
  };

  return (
    <div className="p-4 border m-4">
      <p>
        count: {count} | name: {name} | active: {String(active)}
      </p>
      <div className="p-3 grid grid-cols-3 gap-2">
        <button
          className="p-3 bg-blue-300 text-white rounded-sm"
          onClick={batchedHandler}
        >
          Batch (one re-render)
        </button>
        <button
          className="p-3 bg-red-300 text-white rounded-sm"
          onClick={wrongWay}
        >
          Wrong way (+3 but gets 1)
        </button>
        <button
          className="p-3 bg-green-300 text-white rounded-sm"
          onClick={rightWay}
        >
          Right way (+3 gets 3)
        </button>
      </div>
    </div>
  );
}

// ============================================================
//  4. HYDRATION + AVOIDING HYDRATION ERRORS
// ============================================================
//
//  WHAT IS HYDRATION:
//  Next.js renders your component on the SERVER first.
//  It generates plain HTML and sends it to the browser.
//  Then the browser downloads the JS bundle.
//  React runs your component AGAIN on the client side.
//  React then "hydrates" — attaches event listeners to the existing HTML.
//
//  So your component runs TWICE:
//    1. On the server   → generates HTML
//    2. On the client   → React takes over
//
//  HYDRATION ERROR = server output !== client output
//  React compares both renders. If they don't match → error.
//
//  COMMON CAUSES:
//
//    1. new Date() — server runs at one time, client runs at another
//       server:  "April 12 2026 10:00:00"
//       client:  "April 12 2026 10:00:01"
//       → DIFFERENT → hydration error
//
//    2. Math.random() — different value each time it runs
//       server:  0.823...
//       client:  0.441...
//       → DIFFERENT → hydration error
//
//    3. window, localStorage, canvas — these are BROWSER ONLY APIs
//       the server is not a browser, it has no window
//       server:  crashes or returns undefined
//       client:  works fine
//       → DIFFERENT → hydration error
//
//  THE KEY INSIGHT:
//  The server is just an HTML generator. It has no browser APIs.
//  Anything browser-specific must only run in the client.
//
//  HOW TO FIX — THE MOUNTED PATTERN:
//
//  Force both sides to agree by showing a neutral fallback (e.g. "Loading")
//  until the client takes over. useEffect only runs in the browser,
//  never on the server. So setMounted(true) only ever happens client-side.
//
//    Server:  mounted = false → renders "Loading"
//    Client:  mounted = false → renders "Loading"  ✅ they match, no error
//    useEffect fires (browser only)
//    → setMounted(true)
//    → re-renders with the real content (safe, client has full control now)
//

function HydrationNotes() {
  const [mounted, setMounted] = useState<boolean>(false);

  // useEffect never runs on the server — only in the browser
  // empty [] means: run once, right after the first render (on mount)
  useEffect(() => {
    setMounted(true);
  }, []);

  // both server and client agree: show "Loading" on first render
  if (!mounted) {
    return <div>Loading...</div>;
  }

  // from here, only the browser ever reaches this
  // safe to use browser-only APIs like window, localStorage, new Date(), etc.
  return (
    <div>
      <p>Only rendered in browser ✅</p>
      <p>Current time: {new Date().toLocaleTimeString()}</p>
      {/* ↑ still safe, but sometimes returns hydration error*/}
      {/* ↑ safe here because server never reaches this line */}
    </div>
  );
}

// ============================================================
//  ALSO — WHY WRAPPING IN A FUNCTION AVOIDS HYDRATION ERRORS
// ============================================================
//
//  If you do this:
//    const date = format(new Date(), "MMMM do, yyyy")  ← runs immediately on server
//
//  But if you do this:
//    const getDate = () => format(new Date(), "MMMM do, yyyy")  ← just a definition
//
//  The second one is just a FUNCTION DEFINITION, not an execution.
//  The server never calls it. It only gets called when a user clicks
//  a button in the browser. Server never sees new Date(). No error.
//

function WrappedFunctionExample() {
  const [date, setDate] = useState<string>("");

  // pretend this is format() from date-fns
  const format_example = (d: Date): string => d.toLocaleDateString();

  // ✅ safe — getValue is only called onClick, which is browser-only
  const getValue = () => format_example(new Date());

  return (
    <div className="p-3 text-center m-4 border">
      <button onClick={() => setDate(getValue())}>Show date</button>
      <p>{date}</p>
    </div>
  );
}

// This doesnt return hydration error because
// date.toLocaleDateString() and date.toLocaleTimeString() only shows the DATE and TIME,
// not the time. The date and TIME doesn't change millisecond to millisecond.
// Both the server and client run close enough in time that they land on the
// same day — so the output matches, hydration is happy.
function SampleHydrationError1() {
  const date = new Date();
  const dateString = date.toLocaleDateString();
  const timeString = date.toLocaleTimeString();

  return (
    <>
      <div className="p-3 text-center m-4 border">
        <div>DATE: {dateString}</div>
        <div>TIME: {timeString}</div>
      </div>
    </>
  );
}

// This will return hydration error because getMilliseconds() changes every millisecond.
// The server and client will almost never land on the same millisecond,
// so their outputs will differ, causing a hydration error.
function SampleHydrationError2() {
  // This will work, but still causes hydration error because of strict mode that runs it
  // twice in development. In production, it only runs once, so you won't see the error as much.
  // BUT it's still a bad practice to have non-deterministic code like this in your component,
  // because it can cause hydration errors and other bugs.
  const [mount, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mount) {
    return (
      <>
        <p className="font-semibold text-green-400">Loading...</p>
      </>
    );
  }

  const date = new Date();
  return (
    <>
      <div className="p-3 text-center m-4 border">
        <p>
          This causes <span className="text-red-500">HYDRATION ERROR</span>
        </p>
        <div>MILLISECONDS: {date.getMilliseconds()}</div>
      </div>
    </>
  );
}

// Similar to SampleHydrationError2, but this one avoids hydration error
// by showing a fallback until the client takes over.
function HydrationSolutionExample1() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <>
        <p className="font-semibold text-green-400">Loading...</p>
      </>
    );
  }

  // You can then use DATE or RANDOM NUMBERS safely here because this code only runs
  // in the browser. The server never reaches this part, so it doesn't cause hydration errors.

  // It will hit HYDRATION ERROR in development because of strict mode that runs it twice,
  // but in production it only runs once, so you won't see the error as much.

  // Still not a recommended practice to have non-deterministic code like this in your component, because it can cause hydration errors and other bugs.
  const date = new Date();

  return (
    <>
      <div className="p-3 text-center m-4 border">
        <p>This is the hydration solution — no error because of the fallback</p>
        <div>MILLISECONDS: {date.getMilliseconds()}</div>
      </div>
    </>
  );
}

// This one uses useEffect which is the most effective way to avoid hydration errors, because useEffect only runs in the browser.
function HydrationSolutionExample2() {
  const [milliseconds, setMilliseconds] = useState<number | boolean>(false);
  const date = new Date();

  // useEffect only runs in the browser, never on the server. So this code only runs client-side.
  // The server never sees this, so it doesn't cause hydration errors. The server just renders the 
  // initial state (false), which matches the initial render on the client, so no error.
  useEffect(() => {
    setMilliseconds(date.getMilliseconds());
  }, []);

  return (
    <>
      <div className="p-3 text-center m-4 border">
        <p>
          This is another hydration solution — no error because of useEffect
        </p>
        {!milliseconds ? (
          <p className="font-semibold text-red-400">Loading...</p>
        ) : (
          <p className="font-semibold text-green-400">MILLISECONDS: {milliseconds}</p>
        )}
      </div>
    </>
  );
}

export default function ReactMechanicsLesson() {
  return (
    <>
      <RenderLoopNotes />
      <SnapshotRuleNotes />
      <BatchingNotes />
      <HydrationNotes />
      <WrappedFunctionExample />
      {/* <SampleHydrationError1 />  */}
      {/* <SampleHydrationError2 /> */}
      <HydrationSolutionExample1 />
      <HydrationSolutionExample2 />
    </>
  );
}
