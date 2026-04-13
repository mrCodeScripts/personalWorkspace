"use client";

/**
 * ============================================================
 *  REACT — KEY PROP + RECONCILIATION + RE-RENDER PROPAGATION
 *  Personal Web Dev Bible
 *  Stack: Next.js + TypeScript + TSX
 * ============================================================
 *
 *  THE BIG PICTURE — why these three are connected
 *
 *  React never re-builds the entire DOM from scratch on every render.
 *  That would be slow as hell. Instead it:
 *
 *    1. Runs your component → gets new JSX tree
 *    2. Compares new tree vs old tree (RECONCILIATION)
 *    3. Uses KEY to identify which components are same/new
 *    4. Only updates what actually changed (RE-RENDER PROPAGATION)
 *
 *  Understanding all three together is what separates someone who
 *  just writes React from someone who actually understands it.
 *
 * ============================================================
 */

import { useState, useEffect, memo, useCallback, useMemo } from "react";


// ============================================================
//  1. THE KEY PROP — React's identity card system
// ============================================================
//
//  When React renders a list or siblings, it needs to answer:
//  "Is this the SAME component from before, or a NEW one?"
//
//  key is the answer. React uses it to track identity across renders.
//
//  THE RULE:
//    same key = same component = state preserved, just updated
//    new key  = new component  = destroyed + fresh remount, state wiped
//    no key   = React guesses by DOM position = silent bugs
//
//  key is NOT just for lists. It's a full identity system.
//  You can use it as a TOOL to force resets anywhere.
//

// --- 1A. THE LIST BUG — why index as key is dangerous ---
//
//  Using array index as key looks harmless but breaks when you
//  add, remove, or reorder items.
//
//  EXAMPLE:
//    before delete: [A(key=0), B(key=1), C(key=2)]
//    delete A
//    after delete:  [B(key=0), C(key=1)]
//
//  React sees key=0 still exists → thinks B is the same component as A
//  → keeps B's internal state BUT B is NOT A → silent stale state bug
//
//  With stable IDs:
//    before: [A(key="id-a"), B(key="id-b"), C(key="id-c")]
//    delete A
//    after:  [B(key="id-b"), C(key="id-c")]
//
//  React correctly identifies B and C → preserves their state ✅

interface TodoItem {
  id: string;
  text: string;
}

function TodoInput({ label }: { label: string }) {
  const [typed, setTyped] = useState<string>("");
  return (
    <div className="flex gap-2 items-center">
      <span className="text-sm w-24 truncate">{label}:</span>
      <input
        className="border p-1 text-sm"
        value={typed}
        onChange={e => setTyped(e.target.value)}
        placeholder="type something..."
      />
      <span className="text-xs text-gray-400">({typed.length} chars)</span>
    </div>
  );
}

function IndexKeyVsStableKey() {
  const [items, setItems] = useState<TodoItem[]>([
    { id: "a", text: "Item A" },
    { id: "b", text: "Item B" },
    { id: "c", text: "Item C" },
  ]);

  const removeFirst = () => setItems(prev => prev.slice(1));
  const addItem     = () => setItems(prev => [
    { id: Date.now().toString(), text: `Item ${prev.length + 1}` },
    ...prev, // add to FRONT to make the bug obvious
  ]);

  return (
    <div className="p-3 border space-y-4">

      {/* TYPE SOMETHING IN THE INPUTS FIRST, THEN DELETE — watch the difference */}

      <div>
        <p className="font-semibold text-red-500 text-sm mb-1">
          ❌ Index as key — type in inputs, then remove first item
        </p>
        {items.map((item, index) => (
          // key=index → when item[0] is removed, item[1] becomes index 0
          // React thinks it's the same component → keeps old typed state
          <TodoInput key={index} label={item.text} />
        ))}
      </div>

      <div>
        <p className="font-semibold text-green-500 text-sm mb-1">
          ✅ Stable ID as key — type in inputs, then remove first item
        </p>
        {items.map((item) => (
          // key=item.id → stable, React correctly identifies each component
          // removing item[0] correctly destroys only that one
          <TodoInput key={item.id} label={item.text} />
        ))}
      </div>

      <div className="flex gap-2">
        <button className="p-2 bg-red-400 text-white text-sm" onClick={removeFirst}>
          Remove First
        </button>
        <button className="p-2 bg-blue-400 text-white text-sm" onClick={addItem}>
          Add to Front
        </button>
      </div>
    </div>
  );
}


// --- 1B. KEY AS A RESET TOOL — the superpower most devs don't know ---
//
//  Changing a component's key FORCES a full remount.
//  React destroys the old instance (state wiped) and mounts a fresh one.
//  No useEffect, no manual state reset needed. Just change the key.
//
//  CLASSIC USE CASE: switching between items in an edit form.
//  Without key → form keeps stale state from previous item.
//  With key    → switching items gives a fresh form automatically.

interface User {
  id: string;
  name: string;
  email: string;
}

const USERS: User[] = [
  { id: "u1", name: "Alice",   email: "alice@email.com"   },
  { id: "u2", name: "Bob",     email: "bob@email.com"     },
  { id: "u3", name: "Charlie", email: "charlie@email.com" },
];

function EditForm({ user }: { user: User }) {
  // internal form state — this is what we want to reset on user switch
  const [name, setName]   = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);
  const [dirty, setDirty] = useState<boolean>(false);

  return (
    <div className="border p-3 space-y-2">
      <p className="text-xs text-gray-400">Form internal state (unsaved changes):</p>
      <input
        className="border p-1 w-full text-sm"
        value={name}
        onChange={e => { setName(e.target.value); setDirty(true); }}
      />
      <input
        className="border p-1 w-full text-sm"
        value={email}
        onChange={e => { setEmail(e.target.value); setDirty(true); }}
      />
      {dirty && <p className="text-xs text-orange-400">unsaved changes...</p>}
    </div>
  );
}

function KeyAsResetTool() {
  const [selectedUser, setSelectedUser] = useState<User>(USERS[0]);
  const [useKeyReset, setUseKeyReset]   = useState<boolean>(false);

  return (
    <div className="p-3 border space-y-3">
      <p className="text-sm">
        1. Type something in the form to make unsaved changes
        <br />
        2. Switch users — watch if form resets or keeps old state
      </p>

      <div className="flex gap-2">
        {USERS.map(user => (
          <button
            key={user.id}
            className={`p-2 text-sm text-white ${selectedUser.id === user.id ? "bg-blue-600" : "bg-blue-400"}`}
            onClick={() => setSelectedUser(user)}
          >
            {user.name}
          </button>
        ))}
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={useKeyReset}
          onChange={e => setUseKeyReset(e.target.checked)}
        />
        Use key reset
      </label>

      {useKeyReset
        // ✅ key changes on user switch → full remount → fresh form state
        ? <EditForm key={selectedUser.id} user={selectedUser} />
        // ❌ no key → React keeps same form instance → stale state stays
        : <EditForm user={selectedUser} />
      }
    </div>
  );
}




// ============================================================
//  2. RECONCILIATION — how React diffs old vs new tree
// ============================================================
//
//  After every render, React compares the new JSX tree to the
//  previous one. This comparison is called RECONCILIATION.
//  The goal: find the minimum number of DOM changes needed.
//
//  REACT'S DIFFING RULES:
//
//  RULE 1 — Different element TYPE = destroy and rebuild
//    old: <div>hello</div>
//    new: <span>hello</span>
//    → React doesn't patch div into span. Destroys div + all children.
//    → Mounts fresh span. ALL child state is lost.
//
//  RULE 2 — Same element type = update in place
//    old: <div className="red">hello</div>
//    new: <div className="blue">hello</div>
//    → React keeps the div, just updates className attribute.
//    → Children and state are preserved.
//
//  RULE 3 — Components follow the same rules
//    old: <Counter />
//    new: <Counter />
//    → Same type → React updates props, keeps internal state.
//
//    old: <Counter />
//    new: <Timer />
//    → Different type → Counter destroyed, Timer mounted fresh.
//
//  RULE 4 — key overrides position-based identity
//    React normally uses DOM position to match old vs new.
//    key lets you say "THIS specific instance, regardless of position."
//

function ReconciliationDemo() {
  const [showDiv, setShowDiv]       = useState<boolean>(true);
  const [showCounter, setShowCount] = useState<boolean>(true);

  function Counter({ label }: { label: string }) {
    const [n, setN] = useState<number>(0);
    return (
      <div className="border p-2 text-sm">
        <p>{label}: {n}</p>
        <button className="p-1 bg-blue-400 text-white" onClick={() => setN(p => p + 1)}>+1</button>
      </div>
    );
  }

  return (
    <div className="p-3 border space-y-3">

      {/* RULE 1 — type change destroys state */}
      <div>
        <p className="text-sm font-semibold mb-1">
          Rule 1: type change → state destroyed
        </p>
        <p className="text-xs text-gray-400 mb-2">
          Increment the counter, then toggle the wrapper type (div→section).
          Counter resets because parent type changed → full subtree rebuild.
        </p>
        <button
          className="p-2 bg-purple-400 text-white text-sm mb-2"
          onClick={() => setShowDiv(p => !p)}
        >
          Toggle wrapper: {showDiv ? "div" : "section"}
        </button>
        {showDiv
          ? <div className="border p-2"><Counter label="inside div" /></div>
          : <section className="border p-2"><Counter label="inside section" /></section>
        }
      </div>

      {/* RULE 2 — same type, props update, state preserved */}
      <div>
        <p className="text-sm font-semibold mb-1">
          Rule 2: same type → state preserved
        </p>
        <p className="text-xs text-gray-400 mb-2">
          Increment counter, then toggle. Counter state survives
          because the component type stays the same.
        </p>
        <button
          className="p-2 bg-green-400 text-white text-sm mb-2"
          onClick={() => setShowCount(p => !p)}
        >
          Toggle label
        </button>
        <Counter label={showCounter ? "Label A" : "Label B"} />
      </div>

    </div>
  );
}


// --- 2A. THE POSITION RULE — why order matters without keys ---
//
//  Without keys, React matches components by their POSITION in the tree.
//  If you conditionally render something before a component,
//  it shifts positions and React gets confused.
//

function PositionRuleDemo() {
  const [showFirst, setShowFirst] = useState<boolean>(false);

  function Box({ color }: { color: string }) {
    const [count, setCount] = useState<number>(0);
    return (
      <div className={`border p-2 text-sm bg-${color}-100`}>
        <p>{color} box: {count}</p>
        <button className="p-1 bg-gray-300" onClick={() => setCount(p => p + 1)}>+1</button>
      </div>
    );
  }

  return (
    <div className="p-3 border space-y-2">
      <p className="text-sm font-semibold">Position rule — no keys</p>
      <p className="text-xs text-gray-400">
        Increment the boxes, then toggle the first box.
        The remaining boxes shift positions → React thinks they're different components → state resets.
      </p>
      <button
        className="p-2 bg-orange-400 text-white text-sm"
        onClick={() => setShowFirst(p => !p)}
      >
        Toggle first box
      </button>
      <div className="space-y-1">
        {showFirst && <Box color="red" />}
        <Box color="blue" />
        <Box color="green" />
      </div>
    </div>
  );
}




// ============================================================
//  3. RE-RENDER PROPAGATION — parent renders = children render
// ============================================================
//
//  When a component re-renders, ALL its children re-render too.
//  By default. Even if their props didn't change.
//  React doesn't know if children care about the parent's change.
//  So it re-renders everything below just to be safe.
//
//  TREE EXAMPLE:
//
//    App (state changes)
//      ├── Header        ← re-renders (even if no props changed)
//      ├── Main
//      │     ├── Sidebar ← re-renders
//      │     └── Feed    ← re-renders
//      └── Footer        ← re-renders
//
//  This is usually fine — React is fast.
//  It becomes a problem when:
//    - children are expensive to render
//    - children have heavy computations
//    - your tree is very deep with many nodes
//
//  THE FIXES:
//    memo        → skip re-render if props didn't change
//    useMemo     → cache expensive computed values
//    useCallback → cache functions so they don't look "new" every render
//

let renderCount = 0; // outside component so it persists across renders

function ExpensiveChild({ name }: { name: string }) {
  renderCount++;
  // simulate expensive render
  const start = Date.now();
  while (Date.now() - start < 5) {} // 5ms delay

  return (
    <div className="border p-2 text-sm">
      <p>{name}</p>
      <p className="text-xs text-gray-400">rendered {renderCount} times</p>
    </div>
  );
}

// ✅ memo — wraps component, skips re-render if props are same
const MemoizedChild = memo(function MemoizedChild({ name }: { name: string }) {
  renderCount++;
  return (
    <div className="border p-2 text-sm bg-green-50">
      <p>{name} (memoized)</p>
      <p className="text-xs text-gray-400">rendered {renderCount} times</p>
    </div>
  );
});

function ReRenderPropagationDemo() {
  const [count, setCount]   = useState<number>(0);
  const [text, setText]     = useState<string>("");

  // ❌ WITHOUT useCallback — new function reference every render
  // memo on child is useless because the prop (this fn) looks "new" each time
  const handleClickBad = () => console.log("clicked");

  // ✅ WITH useCallback — same function reference across renders
  // memo on child actually works now — prop reference didn't change
  const handleClickGood = useCallback(() => {
    console.log("clicked");
  }, []); // no deps — function never needs to change

  // ✅ useMemo — cache expensive computation
  // without this, runs on EVERY render even when count didn't change
  const expensiveValue = useMemo(() => {
    console.log("computing expensive value...");
    return count * 1000; // pretend this is heavy math
  }, [count]); // only recomputes when count changes

  return (
    <div className="p-3 border space-y-3">
      <p className="text-sm font-semibold">Re-render propagation</p>
      <p className="text-xs text-gray-400">
        Typing in the input changes parent state → causes re-render →
        ALL children re-render unless memoized.
      </p>

      <input
        className="border p-1 text-sm w-full"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="type to trigger parent re-render..."
      />

      <button
        className="p-2 bg-blue-400 text-white text-sm"
        onClick={() => setCount(p => p + 1)}
      >
        count: {count} | expensive value: {expensiveValue}
      </button>

      {/* re-renders every time parent re-renders */}
      <ExpensiveChild name="Not memoized — re-renders every time" />

      {/* skips re-render if name prop didn't change */}
      <MemoizedChild name="Memoized — skips if props same" />
    </div>
  );
}


// --- 3A. WHEN NOT TO MEMO — important ---
//
//  memo, useMemo, useCallback have a cost too.
//  React has to store the previous value AND compare on every render.
//  If the component is cheap to render, memoizing is slower than just re-rendering.
//
//  USE memo/useMemo/useCallback WHEN:
//    ✅ Component is genuinely expensive to render
//    ✅ Component re-renders very frequently with same props
//    ✅ You're passing callbacks to memoized children
//    ✅ You have heavy computations (filtering big arrays, complex math)
//
//  DON'T USE THEM WHEN:
//    ❌ Component is simple (just returns some JSX)
//    ❌ Props almost always change anyway (memoizing does nothing)
//    ❌ You're doing it "just in case" without measuring first
//    ❌ Premature optimization — profile first, optimize after
//
//  THE RULE: feel the pain first, then optimize. Don't preemptively wrap
//  everything in memo. React DevTools Profiler shows you what's actually slow.




// ============================================================
//  4. THE FIBER ARCHITECTURE — what's actually under the hood
// ============================================================
//
//  This is the internals. You don't need to use this directly
//  but understanding it explains WHY React behaves the way it does.
//
//  React internally represents your component tree as a FIBER TREE.
//  Each component = one fiber node.
//  Each fiber stores:
//    - the component type (function, div, span...)
//    - the props
//    - the state (that "secret shelf" we talked about)
//    - links to parent, child, sibling fibers
//    - effect flags (does this need a DOM update?)
//
//  When you trigger a re-render:
//    1. React builds a new "work in progress" fiber tree
//    2. Compares it to the current tree (reconciliation)
//    3. Marks fibers that need DOM updates (effect flags)
//    4. In the commit phase, applies only the flagged changes
//
//  THIS IS WHY:
//    - State lives outside your component (it's in the fiber)
//    - Hooks must be called in the same order (fiber uses slot index)
//    - key changes destroy state (fiber node is replaced entirely)
//    - React can pause/resume renders (fibers are units of work)
//    - Concurrent features work (React can prioritize which fibers to process)
//
//  You don't write fiber code directly. But knowing it exists explains
//  every "weird" React behavior you'll ever encounter.




// ============================================================
//  QUICK REFERENCE CHEATSHEET
// ============================================================
//
//  KEY:
//    key={item.id}    → stable identity, state preserved across re-renders
//    key={newValue}   → changed key = destroyed + remounted = state wiped
//    key={index}      → dangerous on add/remove/reorder, avoid it
//    no key           → React guesses by position, bugs on reorder
//
//  USE KEY AS A TOOL:
//    <Form key={selectedItem.id} />  → auto-resets form on item switch
//    <Component key={resetCount} />  → increment resetCount to force reset
//
//  RECONCILIATION RULES:
//    different type   → destroy entire subtree, mount fresh (state lost)
//    same type        → update in place (state preserved)
//    key overrides    → position-based matching
//
//  RE-RENDER PROPAGATION:
//    parent re-renders → all children re-render by default
//    memo             → skip child re-render if props didn't change
//    useMemo          → cache expensive computed value
//    useCallback      → cache function reference (needed for memo to work)
//
//  WHEN TO OPTIMIZE:
//    measure first (React DevTools Profiler)
//    optimize only what's actually slow
//    don't wrap everything in memo "just in case"
//
// ============================================================




// ---- PAGE EXPORT ----
export default function KeyReconciliationNotes() {
  return (
    <div className="flex flex-col p-3 space-y-8 max-w-2xl">

      <p className="font-semibold text-xl">
        REACT INTERNALS:{" "}
        <span className="text-green-700">key + reconciliation + re-renders</span>
      </p>

      <div>
        <p className="font-semibold text-sm text-gray-500 mb-1">
          1. Index key bug vs stable key
        </p>
        <p className="text-xs text-gray-400 mb-2">
          Type in inputs first, then remove/add items. Watch how index key loses state.
        </p>
        <IndexKeyVsStableKey />
      </div>

      <div>
        <p className="font-semibold text-sm text-gray-500 mb-1">
          2. Key as a reset tool
        </p>
        <p className="text-xs text-gray-400 mb-2">
          Type unsaved changes, switch users — with/without key reset.
        </p>
        <KeyAsResetTool />
      </div>

      <div>
        <p className="font-semibold text-sm text-gray-500 mb-1">
          3. Reconciliation — type changes vs prop changes
        </p>
        <ReconciliationDemo />
      </div>

      <div>
        <p className="font-semibold text-sm text-gray-500 mb-1">
          4. Position rule — order matters without keys
        </p>
        <PositionRuleDemo />
      </div>

      <div>
        <p className="font-semibold text-sm text-gray-500 mb-1">
          5. Re-render propagation — memo, useMemo, useCallback
        </p>
        <ReRenderPropagationDemo />
      </div>

    </div>
  );
}

