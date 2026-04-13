"use client";

/**
 * ============================================================
 *  REACT HOOK: useState() — COMPLETE NOTES
 *  Personal Web Dev Bible
 *  Stack: Next.js + TypeScript + TSX
 * ============================================================
 *
 *  WHAT IS useState?
 *
 *  useState is how you store and manage LOCAL state inside a component.
 *  "Local" means it belongs to that component only — no other component
 *  can directly read or change it unless you pass it down as a prop.
 *
 *  SIGNATURE:
 *    const [value, setValue] = useState<Type>(initialValue)
 *      value        → what you READ (snapshot of this render)
 *      setValue     → what you call to UPDATE and trigger re-render
 *      Type         → TypeScript type annotation
 *      initialValue → only used on the very FIRST render, ignored after
 *
 *  HOW IT WORKS:
 *    React stores your state on a SECRET SHELF outside your component.
 *    Every useState reserves a SLOT on that shelf by call order.
 *    Your component doesn't own state — React owns it.
 *    Your component just READS from the shelf every time it runs.
 *
 *  THE FULL LOOP:
 *    1. Component mounts → shelf slots created with initial values
 *    2. Component reads shelf → returns JSX → React paints browser
 *    3. setState called → shelf updated
 *    4. Current function run finishes AS-IS (old values still in scope)
 *    5. React re-runs function from top → reads NEW shelf values
 *    6. React diffs old JSX vs new JSX → updates only what changed
 *    7. Repeat from step 3
 *
 * ============================================================
 */

import React, { ComponentType, useState } from "react";

// ============================================================
//  1. BASIC USAGE — primitives
// ============================================================
//
//  TypeScript infers the type for primitives automatically.
//  You only need to annotate explicitly for complex types.
//

function BasicUsage() {
  const [count, setCount] = useState(0); // inferred: number
  const [name, setName] = useState(""); // inferred: string
  const [active, setActive] = useState(false); // inferred: boolean

  return (
    <div className="p-3 border space-y-2">
      <p>count: {count}</p>
      <p>name: {name}</p>
      <p>active: {String(active)}</p>

      <button
        className="p-2 bg-blue-400 text-white"
        onClick={() => setCount(count + 1)}
      >
        increment
      </button>
      <input
        className="border p-1"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="type a name"
      />
      <button
        className="p-2 bg-green-400 text-white"
        onClick={() => setActive((p) => !p)}
      >
        toggle active
      </button>
    </div>
  );
}

// ============================================================
//  2. TYPE ANNOTATIONS — when and how
// ============================================================
//
//  RULE:
//    primitives (number, string, boolean) → let TypeScript infer
//    objects, arrays, unions, null         → always annotate explicitly
//

function TypeAnnotations() {
  // ✅ inferred — fine for primitives
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  // ✅ explicit — required for objects
  interface User {
    id: string;
    name: string;
    age: number;
  }
  const [user, setUser] = useState<User | null>(null);

  // ✅ explicit — required for arrays
  const [tags, setTags] = useState<string[]>([]);
  const [ids, setIds] = useState<number[]>([]);

  // ✅ explicit — required for unions
  type Status = "idle" | "loading" | "success" | "error";
  const [status, setStatus] = useState<Status>("idle");

  // ✅ explicit — when initial value is undefined but type is known
  const [data, setData] = useState<User | undefined>(undefined);

  // ✅ explicit — tuple state
  const [range, setRange] = useState<[number, number]>([0, 100]);

  return (
    <div className="p-3 border space-y-1 text-sm">
      <p>count: {count}</p>
      <p>name: {name}</p>
      <p>user: {user?.name ?? "no user"}</p>
      <p>tags: {tags.join(", ") || "no tags"}</p>
      <p>status: {status}</p>
      <p>
        range: {range[0]} - {range[1]}
      </p>

      <button
        className="p-2 bg-blue-400 text-white"
        onClick={() => setUser({ id: "1", name: "Alex", age: 28 })}
      >
        set user
      </button>
      <button
        className="p-2 bg-purple-400 text-white"
        onClick={() => setStatus("loading")}
      >
        set loading
      </button>
    </div>
  );
}

// ============================================================
//  3. THE SNAPSHOT RULE — most important concept
// ============================================================
//
//  Every render LOCKS IN its own copy of state — like a photo.
//  Once React starts running your function, that render's values
//  are frozen for the entire run.
//
//  Calling setState does NOT change the current render's value.
//  It just tells React: "update the shelf, re-run me next."
//
//  SAME AS C++ — if x = 0 and you schedule x = 1,
//  x is still 0 on the current line. Only 1 on the next run.
//  React is the exact same concept, just with re-renders.
//

function SnapshotRule() {
  const [count, setCount] = useState(0);

  const frozenExample = () => {
    setCount(count + 1); // schedules shelf update
    console.log(count); // still old value — current run is locked
    console.log(count); // still old value
    console.log(count); // still old value
    // after this exits → React re-renders → new run reads updated shelf
  };

  // PROOF: even with a timeout, it reads the snapshot from WHEN it was created
  const timeoutExample = () => {
    setTimeout(() => {
      // this closure captured count at the time handleClick ran
      // even 3 seconds later, it still reads that frozen snapshot
      console.log("after 3s, count is still:", count); // old value
    }, 3000);
    setCount(count + 1);
  };

  return (
    <div className="p-3 border space-y-2">
      <p>count: {count}</p>
      <button className="p-2 bg-blue-400 text-white" onClick={frozenExample}>
        frozen example (check console)
      </button>
      <button className="p-2 bg-purple-400 text-white" onClick={timeoutExample}>
        timeout example (check console after 3s)
      </button>
    </div>
  );
}

// ============================================================
//  4. FUNCTIONAL UPDATER — when new value depends on old
// ============================================================
//
//  Two forms of setState:
//
//  FORM 1 — direct value:
//    setState(newValue)
//    use when new value does NOT depend on old value
//
//  FORM 2 — functional updater:
//    setState(prev => newValue)
//    use when new value DEPENDS on old value
//    "prev" is ALWAYS the latest value from the shelf
//    not the frozen snapshot — guaranteed fresh
//
//  WHY IT MATTERS:
//  Because of batching (see below), React may defer updates.
//  If you call setState multiple times, the direct form reads
//  the same frozen snapshot every time.
//  The functional form always chains off the previous update.
//

function FunctionalUpdater() {
  const [count, setCount] = useState(0);

  // ❌ WRONG — all three read the same frozen snapshot
  // if count = 5, all three schedule setCount(6)
  // result: count becomes 6, not 8
  const wrongTripleIncrement = () => {
    setCount(count + 1); // snapshot: 5 → schedules 6
    setCount(count + 1); // snapshot: 5 → schedules 6 (overwrites)
    setCount(count + 1); // snapshot: 5 → schedules 6 (overwrites)
    // result: 6, not 8 ❌
  };

  // ✅ RIGHT — each call gets the latest queued value
  // prev chains off the result of the previous call
  const rightTripleIncrement = () => {
    setCount((prev) => prev + 1); // prev: 5 → result: 6
    setCount((prev) => prev + 1); // prev: 6 → result: 7
    setCount((prev) => prev + 1); // prev: 7 → result: 8
    // result: 8 ✅
  };

  // WHEN TO USE WHICH:
  const directForm = () => setCount(0); // reset — doesn't depend on old value ✅
  const functionalForm = () => setCount((p) => p + 1); // increment — depends on old value ✅

  return (
    <div className="p-3 border space-y-2">
      <p>count: {count}</p>
      <button
        className="p-2 bg-red-400 text-white"
        onClick={wrongTripleIncrement}
      >
        +3 wrong way (gets +1)
      </button>
      <button
        className="p-2 bg-green-400 text-white"
        onClick={rightTripleIncrement}
      >
        +3 right way (gets +3)
      </button>
      <button className="p-2 bg-gray-400 text-white" onClick={directForm}>
        reset to 0 (direct form ok here)
      </button>
    </div>
  );
}

// ============================================================
//  5. BATCHING — multiple setState = one re-render
// ============================================================
//
//  React 18+ (Next.js uses this) batches ALL setState calls
//  in the same synchronous block into ONE single re-render.
//
//  React waits until your handler fully exits, THEN re-renders once.
//  Why? Re-rendering is expensive. No point doing it 3 times
//  when you can wait and do it once with all changes applied.
//
//  ALSO: only the states that actually CHANGED get updated.
//  States you never touched stay exactly as they were.
//

function BatchingDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [active, setActive] = useState(false);

  console.log("rendered"); // to prove it only renders once per click

  const batchedHandler = () => {
    setCount((p) => p + 1); // queued
    setName("Alex"); // queued
    setActive(true); // queued
    // all three queued — handler exits — ONE re-render with all applied
    // check console: "rendered" appears once, not three times
  };

  // BATCHING IN ASYNC — React 18 batches even inside async/await
  const asyncBatchedHandler = async () => {
    await new Promise((r) => setTimeout(r, 100)); // simulate async work
    setCount((p) => p + 1); // still batched ✅ (React 18+)
    setName("Bob"); // still batched ✅
    // ONE re-render after both, even inside async
  };

  return (
    <div className="p-3 border space-y-2">
      <p>
        count: {count} | name: {name} | active: {String(active)}
      </p>
      <button className="p-2 bg-blue-400 text-white" onClick={batchedHandler}>
        batched update (check console — renders once)
      </button>
      <button
        className="p-2 bg-purple-400 text-white"
        onClick={asyncBatchedHandler}
      >
        async batched update
      </button>
    </div>
  );
}

// ============================================================
//  6. OBJECTS IN STATE — never mutate, always replace
// ============================================================
//
//  React detects state changes by REFERENCE comparison.
//  If you mutate the object directly, the reference stays the same.
//  React sees same reference → thinks nothing changed → no re-render.
//
//  You must always create a NEW object (new reference) with your changes.
//  Spread operator (...) is the standard way to do this.
//

function ObjectState() {
  interface Profile {
    name: string;
    age: number;
    address: {
      city: string;
      country: string;
    };
  }

  const [profile, setProfile] = useState<Profile>({
    name: "Alex",
    age: 28,
    address: { city: "Manila", country: "Philippines" },
  });

  // ❌ WRONG — mutating directly
  const wrongUpdate = () => {
    profile.name = "Bob"; // mutates same reference
    setProfile(profile); // React sees same ref → no re-render
  };

  // ✅ RIGHT — spread creates a new object (new reference)
  const updateName = (newName: string) => {
    setProfile((prev) => ({ ...prev, name: newName }));
  };

  const updateAge = (newAge: number) => {
    setProfile((prev) => ({ ...prev, age: newAge }));
  };

  // ✅ nested object update — must spread at every level
  const updateCity = (newCity: string) => {
    setProfile((prev) => ({
      ...prev, // top level spread
      address: { ...prev.address, city: newCity }, // nested spread
    }));
    // ❌ WRONG nested: { ...prev, address.city: newCity } ← invalid syntax
  };

  return (
    <div className="p-3 border space-y-2 text-sm">
      <p>name: {profile.name}</p>
      <p>age: {profile.age}</p>
      <p>city: {profile.address.city}</p>

      <button
        className="p-2 bg-blue-400 text-white"
        onClick={() => updateName("Bob")}
      >
        update name
      </button>
      <button
        className="p-2 bg-green-400 text-white"
        onClick={() => updateAge(30)}
      >
        update age
      </button>
      <button
        className="p-2 bg-purple-400 text-white"
        onClick={() => updateCity("Cebu")}
      >
        update city (nested)
      </button>
      <button className="p-2 bg-red-400 text-white" onClick={wrongUpdate}>
        wrong update (nothing happens)
      </button>
    </div>
  );
}

// ============================================================
//  7. ARRAYS IN STATE — never push/splice, always create new
// ============================================================
//
//  Same reason as objects — reference comparison.
//  push/splice mutates in place → same reference → no re-render.
//  You must create a NEW array with your changes.
//
//  CHEATSHEET:
//    add     → [...prev, newItem]
//    remove  → prev.filter(item => item.id !== id)
//    update  → prev.map(item => item.id === id ? updated : item)
//    reorder → [...prev].sort(...)  or  [...prev].reverse()
//    prepend → [newItem, ...prev]
//

function ArrayState() {
  interface Item {
    id: string;
    text: string;
    done: boolean;
  }

  const [items, setItems] = useState<Item[]>([
    { id: "1", text: "Learn React", done: false },
    { id: "2", text: "Build something", done: false },
  ]);

  // ADD — spread + new item at end
  const addItem = (text: string) => {
    setItems((prev) => [
      ...prev,
      { id: Date.now().toString(), text, done: false },
    ]);
  };

  // REMOVE — filter out the item
  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // UPDATE — map and replace matching item
  const toggleDone = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  };

  // CLEAR ALL
  const clearAll = () => setItems([]);

  // ❌ WRONG — mutating directly
  const wrongAdd = () => {
    items.push({ id: "x", text: "wrong", done: false }); // mutates!
    setItems(items); // same reference → no re-render
  };

  return (
    <div className="p-3 border space-y-2 text-sm">
      {items.map((item) => (
        <div key={item.id} className="flex gap-2 items-center">
          <span className={item.done ? "line-through text-gray-400" : ""}>
            {item.text}
          </span>
          <button
            className="p-1 bg-green-400 text-white"
            onClick={() => toggleDone(item.id)}
          >
            done
          </button>
          <button
            className="p-1 bg-red-400 text-white"
            onClick={() => removeItem(item.id)}
          >
            remove
          </button>
        </div>
      ))}

      <div className="flex gap-2 mt-2">
        <button
          className="p-2 bg-blue-400 text-white"
          onClick={() => addItem("New item")}
        >
          add item
        </button>
        <button className="p-2 bg-gray-400 text-white" onClick={clearAll}>
          clear all
        </button>
        <button className="p-2 bg-red-400 text-white" onClick={wrongAdd}>
          wrong add (nothing happens)
        </button>
      </div>
    </div>
  );
}

// ============================================================
//  8. LAZY INITIALIZATION — expensive initial values
// ============================================================
//
//  If you pass a VALUE to useState, it's computed EVERY render
//  even though React only uses it on the first render.
//  If the computation is expensive, you're wasting work.
//
//  Pass a FUNCTION instead — React calls it ONCE on mount,
//  ignores it completely on every re-render after.
//

function LazyInitialization() {
  const computeExpensiveValue = (): number[] => {
    console.log("computing initial value..."); // watch how many times this logs
    return Array.from({ length: 1000 }, (_, i) => i * 2);
  };

  // ❌ WRONG — function runs on EVERY render
  // even though React only needs it once
  const [badState] = useState(computeExpensiveValue()); // () = call it now

  // ✅ RIGHT — function runs ONCE on mount only
  const [goodState] = useState(() => computeExpensiveValue()); // pass fn, don't call it

  // ✅ REAL WORLD — reading from localStorage safely
  const [savedName] = useState<string>(() => {
    // safe here — lazy init runs after mount (client only)
    if (typeof window === "undefined") return ""; // SSR safety
    return localStorage.getItem("name") ?? "";
  });

  return (
    <div className="p-3 border text-sm">
      <p>items count: {goodState.length}</p>
      <p>saved name: {savedName || "none"}</p>
    </div>
  );
}

// ============================================================
//  9. DERIVED STATE — don't put it in useState
// ============================================================
//
//  If a value can be COMPUTED from existing state,
//  just compute it directly — don't put it in useState.
//  Adding it to state means you have to keep two things in sync,
//  which leads to bugs and unnecessary re-renders.
//

function DerivedState() {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [items, setItems] = useState<string[]>(["a", "b", "c"]);

  // ❌ WRONG — derived state in useState
  // now you have to manually keep fullName in sync with firstName/lastName
  const [fullName, setFullName] = useState(`${firstName} ${lastName}`);
  // if firstName changes but you forget to update fullName → stale data

  // ✅ RIGHT — just compute it inline, always fresh
  const fullNameDirect = `${firstName} ${lastName}`;
  const itemCount = items.length;
  const hasItems = items.length > 0;
  const uppercaseName = firstName.toUpperCase();

  return (
    <div className="p-3 border text-sm space-y-1">
      <p>full name (wrong way - stale): {fullName}</p>
      <p>full name (right way - fresh): {fullNameDirect}</p>
      <p>item count: {itemCount}</p>
      <p>has items: {String(hasItems)}</p>
      <p>uppercase: {uppercaseName}</p>
      <button
        className="p-2 bg-blue-400 text-white"
        onClick={() => setFirstName("Alex")}
      >
        change first name (watch wrong way stay stale)
      </button>
    </div>
  );
}

// ============================================================
//  10. COMMON PATTERNS
// ============================================================

function CommonPatterns() {
  // TOGGLE — boolean flip
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prev) => !prev);

  // COUNTER with min/max bounds
  const [count, setCount] = useState(0);
  const increment = () => setCount((prev) => Math.min(prev + 1, 10));
  const decrement = () => setCount((prev) => Math.max(prev - 1, 0));

  // FORM STATE — single object for multiple fields
  interface FormState {
    username: string;
    email: string;
    password: string;
  }
  const [form, setForm] = useState<FormState>({
    username: "",
    email: "",
    password: "",
  });
  // generic field updater — works for any field
  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // LOADING/ERROR PATTERN — async operations
  type AsyncStatus = "idle" | "loading" | "success" | "error";
  const [status, setStatus] = useState<AsyncStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const fetchSomething = async () => {
    setStatus("loading");
    setError(null);
    try {
      await new Promise((r) => setTimeout(r, 1000)); // simulate fetch
      setStatus("success");
    } catch (e) {
      setError("something went wrong");
      setStatus("error");
    }
  };

  // PREVIOUS VALUE PATTERN — track what value was before
  // (this is actually better done with useRef, but useState works too)
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(0);
  const updateCurrent = (val: number) => {
    setPrevious(current); // save current before updating
    setCurrent(val);
  };

  return (
    <div className="p-3 border space-y-4 text-sm">
      <div>
        <p className="font-semibold">Toggle</p>
        <button className="p-2 bg-blue-400 text-white" onClick={toggle}>
          {open ? "close" : "open"}
        </button>
        {open && <p className="text-green-500">I am open!</p>}
      </div>

      <div>
        <p className="font-semibold">Bounded counter (0-10)</p>
        <div className="flex gap-2 items-center">
          <button className="p-2 bg-red-400 text-white" onClick={decrement}>
            -
          </button>
          <span>{count}</span>
          <button className="p-2 bg-green-400 text-white" onClick={increment}>
            +
          </button>
        </div>
      </div>

      <div>
        <p className="font-semibold">Form state</p>
        <input
          className="border p-1 block w-full mb-1"
          placeholder="username"
          value={form.username}
          onChange={(e) => updateField("username", e.target.value)}
        />
        <input
          className="border p-1 block w-full mb-1"
          placeholder="email"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
        />
        <input
          className="border p-1 block w-full"
          placeholder="password"
          type="password"
          value={form.password}
          onChange={(e) => updateField("password", e.target.value)}
        />
        <p className="text-xs text-gray-400 mt-1">
          form: {JSON.stringify(form)}
        </p>
      </div>

      <div>
        <p className="font-semibold">Async status</p>
        <button
          className="p-2 bg-purple-400 text-white"
          onClick={fetchSomething}
          disabled={status === "loading"}
        >
          {status === "loading" ? "loading..." : "fetch something"}
        </button>
        {status === "success" && <p className="text-green-500">success!</p>}
        {status === "error" && <p className="text-red-500">{error}</p>}
      </div>

      <div>
        <p className="font-semibold">Previous value tracker</p>
        <p>
          current: {current} | previous: {previous}
        </p>
        <button
          className="p-2 bg-blue-400 text-white"
          onClick={() => updateCurrent(current + 1)}
        >
          increment
        </button>
      </div>
    </div>
  );
}

// ============================================================
//  RULES OF HOOKS — never break these
// ============================================================
//
//  1. Only call hooks at the TOP LEVEL of your component.
//     Not inside if/else, loops, or nested functions.
//     React uses CALL ORDER to match hooks to their shelf slots.
//     If you skip one conditionally, slot indices shift → bugs.
//
//  2. Only call hooks inside React function components
//     or custom hooks. Never in regular functions or classes.
//
//  ❌ WRONG:
//    if (condition) {
//      const [state, setState] = useState(0); // breaks slot order
//    }
//
//  ✅ RIGHT:
//    const [state, setState] = useState(0);   // always at top level
//    if (condition) { /* use state here */ }
//
// ============================================================

// ============================================================
//  QUICK REFERENCE CHEATSHEET
// ============================================================
//
//  BASIC:
//    const [val, setVal] = useState(0)             → number, inferred
//    const [val, setVal] = useState<User | null>(null) → explicit type
//
//  SETTER FORMS:
//    setVal(newValue)          → direct, when not depending on old
//    setVal(prev => prev + 1)  → functional, when depending on old
//
//  OBJECTS:
//    setObj(prev => ({ ...prev, key: newValue }))  → spread + override
//
//  ARRAYS:
//    add    → setArr(prev => [...prev, newItem])
//    remove → setArr(prev => prev.filter(i => i.id !== id))
//    update → setArr(prev => prev.map(i => i.id === id ? updated : i))
//
//  LAZY INIT:
//    useState(() => expensiveFunction())  → runs once on mount only
//
//  DERIVED STATE:
//    don't put it in useState → just compute it inline
//
//  BATCHING:
//    multiple setStates in one handler → ONE re-render (React 18+)
//
// ============================================================

// ---- PAGE EXPORT ----
export default function UseStateNotes() {
  type ComponentList = {
    title?: string;
    component: React.ComponentType;
    run: boolean;
  };

  const componentMap: ComponentList[] = [
    {
      title: "Basic Usage",
      component: BasicUsage,
      run: false,
    },
    {
      title: "Type Annotations",
      component: TypeAnnotations,
      run: false,
    },
    {
      title: "Snapshot Rule",
      component: SnapshotRule,
      run: false,
    },
    {
      title: "Functional Updater",
      component: FunctionalUpdater,
      run: false,
    },
    {
      title: "Batching",
      component: BatchingDemo,
      run: false,
    },
    {
      title: "Object in State",
      component: ObjectState,
      run: false,
    },
    {
      title: "Arrays in State",
      component: ArrayState,
      run: false,
    },
    {
      title: "Lazy Initialization",
      component: LazyInitialization,
      run: false,
    },
    {
      title: "Derived State",
      component: DerivedState,
      run: false,
    },
    {
      title: "Common Patterns",
      component: CommonPatterns,
      run: false,
    },
  ];

  return (
    <div className="flex flex-col p-3 space-y-8 max-w-2xl">
      <p className="font-semibold text-xl">
        REACT HOOK: <span className="text-blue-600">useState()</span>
      </p>

      {componentMap.map((item, index) => (
        <div key={index}>
          <p className="font-semibold text-sm text-gray-500 mb-1">
            {item.title}
          </p>
          <item.component />
        </div>
      ))}
    </div>
  );
}
