"use client";

// ============================================================
// useReducer — Quick-Review Notes
// "useState but for complex state logic (think mini redux)"
// ============================================================
// MENTAL MODEL:
//   dispatch(action) → reducer(currentState, action) → newState
//   You never touch state directly. You DESCRIBE what happened,
//   the reducer DECIDES what changes.
// ============================================================

import React, { useEffect, useReducer, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────
// 1. THE SIGNATURE
// ─────────────────────────────────────────────────────────────
//
//   const [state, dispatch] = useReducer(reducer, initialState)
//
//   reducer      → (state, action) => newState   (pure fn, no side effects)
//   initialState → the value state starts as
//   state        → current snapshot (read-only)
//   dispatch     → call this to trigger a state change
//

// ─────────────────────────────────────────────────────────────
// 2. WHEN TO USE IT (vs useState)
// ─────────────────────────────────────────────────────────────
//
//   useState  → single, independent value        (count, isOpen, name)
//   useReducer→ multiple related values           (form fields, cart, async status)
//             → next state depends on old state   (undo/redo, toggles)
//             → state transitions have NAMES      (makes bugs easier to trace)
//             → you want Redux-style predictability WITHOUT Redux
//

// ─────────────────────────────────────────────────────────────
// 3. THE REDUCER FUNCTION (the brain)
// ─────────────────────────────────────────────────────────────
//
//   Rules:
//   ✅  Pure — same inputs always return same output
//   ✅  Return a NEW object, never mutate state directly
//   ✅  Always have a default: return state (fallback for unknown actions)
//   ❌  No API calls, no setTimeout, no randomness inside here
//

type CounterState = { count: number };
type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" }
  | { type: "SET"; payload: number }; // actions can carry extra data via payload

function counterReducer(
  state: CounterState,
  action: CounterAction,
): CounterState {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    case "SET":
      return { count: action.payload }; // use payload
    default:
      return state; // ← never forget this
  }
}

// Usage
function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <button onClick={() => dispatch({ type: "RESET" })}>reset</button>
      <button onClick={() => dispatch({ type: "SET", payload: 100 })}>
        set 100
      </button>
    </div>
  );
}

// Task Manager Sample
function TaskManagerUsingUseReducerHook() {
  type TaskType = {
    id: string;
    name: string;
    description?: string;
  };

  // const id = crypto.randomUUID();

  type TaskListActions =
    | { action: "ADD"; payload: TaskType }
    | { action: "DELETE"; id: string }
    | { action: "MODIFY"; id: string; payload: Partial<TaskType> };

  const defaultTaskVal: TaskType = { id: "", name: "", description: "" };
  const [task, setTask] = useState<TaskType>(defaultTaskVal);
  const [loadingTasks, setLoadingTasks] = useState<boolean>(false);
  const [updatingTask, setUpdatingTask] = useState<string | null>(null);
  const [updatedTask, setUpdatedTask] = useState<Partial<TaskType>>({});
  const scrollRefTarget = useRef<HTMLDivElement>(null);

  const [taskList, taskListDispatcher] = useReducer(
    (state: TaskType[], action: TaskListActions) => {
      switch (action.action) {
        case "ADD":
          return [...state, action.payload];
        case "DELETE":
          return state.filter((item) => item.id !== action.id);
        case "MODIFY":
          return state.map(item =>
            item.id === action.id ? { ...item, ...action.payload } : item,
          );
        default:
          return state;
      }
    },
    [],
  );

  useEffect(() => {
    /**
     * +==========================================================+
     * |                                                          |
     * |                    SCROLL DOWN EFFECT                    |
     * |                                                          |
     * +==========================================================+
     */
    if (scrollRefTarget.current) {
      scrollRefTarget.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [taskList]);

  useEffect(() => {
    console.log(
      "%cName: " + task.name + " %cDescription: " + task.description,
      "font-weight: bold; color: lime; padding: 10px;",
      "font-weight: bold; color: blue; padding: 10px;",
    );
  }, [task]);

  useEffect(() => {
    console.log(
      "%c[UPDATED TASK] Name: " +
        updatedTask.name +
        " %cDescription: " +
        updatedTask.description,
      "font-weight: bold; color: lime; padding: 10px;",
      "font-weight: bold; color: blue; padding: 10px;",
    );
  }, [updatedTask]);

  // Sample adding task
  useEffect(() => {
    const setInitialTaskList = async () => {
      setLoadingTasks(true);


      // Simulate Loading State
      await new Promise((res) => setTimeout(res, 3000));

      taskListDispatcher({
        action: "ADD",
        payload: {
          id: crypto.randomUUID(),
          name: "Task 2",
          description: "Just a task",
        },
      });
      taskListDispatcher({
        action: "ADD",
        payload: {
          id: crypto.randomUUID(),
          name: "Task 3",
          description: "Just a task",
        },
      });
      taskListDispatcher({
        action: "ADD",
        payload: {
          id: crypto.randomUUID(),
          name: "Task 4",
          description: "Just a task laksdjf;lasjdfl;jasd;lfjsa;ldfjdescription",
        },
      });
      taskListDispatcher({
        action: "ADD",
        payload: {
          id: crypto.randomUUID(),
          name: "Task 5",
          description: "Just a task",
        },
      });
      taskListDispatcher({
        action: "ADD",
        payload: {
          id: crypto.randomUUID(),
          name: "Task 6",
          description: "Just a task",
        },
      });

      setLoadingTasks(false);
    };
    setInitialTaskList();
  }, []);

  useEffect(() => {
    let taskListDisplay = taskList.length > 0 ? taskList
      .map(
        (item, index) =>
          `[${index}] Name: [${item.name}] -- Description: [${item.description ? item.description : "No Description!"}]`,
      )
      .join("\n") : (loadingTasks ? "LOADING TASKS..." : "NO TASKS!");

    console.log(
      "%c" + taskListDisplay.trim(),
      (taskList.length > 0 ? "color: lime;" : "color: red;") + "font-weight: bold; padding: 0px;",
    );
  }, [taskList]);

  const resetTaskInputs = () => setTask((prev) => defaultTaskVal);
  const resetUpdatingTaskState = () => setUpdatingTask(null);

  return (
    <>
      {/* Container: Max-width instead of fixed width, centered with mx-auto */}
      <div className="flex flex-col gap-6 p-4 w-full max-w-4xl min-w-2xl mx-auto border-2 border-gray-700 rounded-xl bg-gray-900 shadow-2xl max-h-4xl! min-h-3xl!">
        <header className="text-center">
          <h2 className="text-green-400 font-bold text-2xl tracking-tight">
            Task Manager
          </h2>
          <p className="text-gray-500 text-sm">
            Organize your workflow efficiently
          </p>
        </header>

        {/* Input Section: Stacked on mobile, row on desktop */}
        <div className="flex flex-col md:flex-row gap-3 bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-3">
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 text-white rounded-md focus:outline-none focus:border-green-400 transition-colors"
              placeholder="Task Name"
              value={task.name}
              onChange={(e) =>
                setTask((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 text-white rounded-md focus:outline-none focus:border-green-400 transition-colors"
              placeholder="Description"
              value={task.description}
              onChange={(e) =>
                setTask((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </div>
          <button
            type="button"
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md transition-all active:scale-95 whitespace-nowrap"
            onClick={() => {
              taskListDispatcher({
                action: "ADD",
                payload: {
                  id: crypto.randomUUID(),
                  name: task.name,
                  description: task.description,
                },
              });
              resetTaskInputs();
            }}
          >
            Add Task
          </button>
        </div>

        {/* Task Grid: 1 column mobile, 2 columns tablet, 3 columns desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-h-[500px] min-h-[200px] overflow-y-auto">
          {taskList.length > 0 ? (
            taskList.map(item => (
              <div
                key={item.id}
                className="bg-gray-800 border border-gray-700 flex flex-col justify-between p-4 w-full rounded-lg hover:border-gray-500 transition-all shadow-md"
              >
                <div className="min-w-0 mb-4">
                  {updatingTask === item.id ? (
                    <div className="w-full flex flex-col gap-2">
                      <input
                        type="text"
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-600 text-white rounded-md focus:outline-none focus:border-green-400 transition-colors text-sm "
                        placeholder="New task namek"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setUpdatedTask((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        // value={!updatedTask.name ? item.name : updatedTask.name}
                        value={updatedTask.name}
                      />
                      <input
                        type="text"
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-600 text-white rounded-md focus:outline-none focus:border-green-400 transition-colors text-sm "
                        placeholder="New task description"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setUpdatedTask((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        value={updatedTask.description}
                        // value={
                        //   !updatedTask.description
                        //     ? item.description
                        //       ? item.description
                        //       : "No Description Provided."
                        //     : updatedTask.description
                        // }
                      />
                    </div>
                  ) : (
                    <>
                      <h3 className="text-green-400 font-bold truncate text-lg">
                        {item.name}
                      </h3>
                      <p
                        className="text-gray-400 text-sm truncate"
                        title={item.description}
                      >
                        {item.description || "No description provided."}
                      </p>
                    </>
                  )}
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-700">
                  {updatingTask === item.id ? (
                    <button
                      type="button"
                      className="flex-1 py-1.5 bg-blue-600/20 text-blue-400 border border-blue-600/30 hover:bg-blue-600 hover:text-white font-semibold rounded transition-all text-xs uppercase tracking-wider"
                      onClick={() => {
                        taskListDispatcher({
                          action: "MODIFY",
                          id: item.id,
                          payload: updatedTask,
                        });
                        resetUpdatingTaskState();
                      }}
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="flex-1 py-1.5 bg-blue-600/20 text-blue-400 border border-blue-600/30 hover:bg-blue-600 hover:text-white font-semibold rounded transition-all text-xs uppercase tracking-wider"
                      onClick={() => {
                        setUpdatingTask(item.id);
                        setUpdatedTask({
                          name: item.name,
                          description: item.description,
                        }); // -> This will reset the data for udpated task.
                      }}
                    >
                      Edit
                    </button>
                  )}

                  <button
                    type="button"
                    className="flex-1 py-1.5 bg-red-600/20 text-red-400 border border-red-600/30 hover:bg-red-600 hover:text-white font-semibold rounded transition-all text-xs uppercase tracking-wider"
                    onClick={() => {
                      taskListDispatcher({ action: "DELETE", id: item.id });
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <>
              {loadingTasks ? (
                <>
                  <p className="m-auto text-center col-span-full text-md font-semibold text-green-400">
                    Loading Tasks...
                  </p>
                </>
              ) : (
                <p className="m-auto text-center col-span-full text-md font-semibold text-red-400">
                  No Tasks
                </p>
              )}
            </>
          )}
          <div ref={scrollRefTarget}></div>
        </div>
      </div>
    </>
  );
}

// ────────────────────────────────────────────────────────────>─
// 4. REAL-WORLD PATTERN — Form with multiple fields
// ─────────────────────────────────────────────────────────────
//
//   Key insight: one "UPDATE_FIELD" action handles ALL fields
//   instead of a separate useState per field. Scales cleanly.
//

type FormState = {
  name: string;
  email: string;
  age: string;
};

type FormAction =
  | { type: "UPDATE_FIELD"; field: keyof FormState; value: string }
  | { type: "RESET_FORM" };

const formInitialState: FormState = { name: "", email: "", age: "" };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value }; // computed key trick
    case "RESET_FORM":
      return formInitialState;
    default:
      return state;
  }
}

function SignupForm() {
  const [form, dispatch] = useReducer(formReducer, formInitialState);

  const handleChange =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: "UPDATE_FIELD", field, value: e.target.value });

  return (
    <form>
      <input
        value={form.name}
        onChange={handleChange("name")}
        placeholder="Name"
      />
      <input
        value={form.email}
        onChange={handleChange("email")}
        placeholder="Email"
      />
      <input
        value={form.age}
        onChange={handleChange("age")}
        placeholder="Age"
      />
      <button type="button" onClick={() => dispatch({ type: "RESET_FORM" })}>
        Reset
      </button>
    </form>
  );
}

// ─────────────────────────────────────────────────────────────
// 5. REAL-WORLD PATTERN — Async status (fetch lifecycle)
// ─────────────────────────────────────────────────────────────
//
//   Key insight: status is a finite state machine (FSM).
//   idle → loading → success | error
//   Trying to model this with 3 separate booleans = chaos.
//   One "status" field keeps it honest.
//

type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };

type AsyncAction<T> =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: T }
  | { type: "FETCH_ERROR"; message: string }
  | { type: "RESET" };

function asyncReducer<T>(
  state: AsyncState<T>,
  action: AsyncAction<T>,
): AsyncState<T> {
  switch (action.type) {
    case "FETCH_START":
      return { status: "loading" };
    case "FETCH_SUCCESS":
      return { status: "success", data: action.payload };
    case "FETCH_ERROR":
      return { status: "error", message: action.message };
    case "RESET":
      return { status: "idle" };
    default:
      return state;
  }
}

function UserProfile({ userId }: { userId: string }) {
  const [state, dispatch] = useReducer(asyncReducer<{ name: string }>, {
    status: "idle",
  });

  const fetchUser = async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const res = await fetch(`/api/users/${userId}`);
      const data = await res.json();
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", message: "Failed to load user" });
    }
  };

  if (state.status === "idle") return <button onClick={fetchUser}>Load</button>;
  if (state.status === "loading") return <p>Loading…</p>;
  if (state.status === "error") return <p>Error: {state.message}</p>;
  if (state.status === "success") return <p>{state.data.name}</p>;
  return null;
}

// ─────────────────────────────────────────────────────────────
// 6. REAL-WORLD PATTERN — Shopping Cart (CRUD)
// ─────────────────────────────────────────────────────────────

type CartItem = { id: number; name: string; qty: number; price: number };
type CartState = { items: CartItem[] };
type CartAction =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; id: number }
  | { type: "INCREMENT"; id: number }
  | { type: "DECREMENT"; id: number }
  | { type: "CLEAR_CART" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.items.find((i) => i.id === action.item.id);
      if (exists) {
        // item already in cart → just bump qty
        return {
          items: state.items.map((i) =>
            i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i,
          ),
        };
      }
      return { items: [...state.items, action.item] };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "INCREMENT":
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: i.qty + 1 } : i,
        ),
      };
    case "DECREMENT":
      return {
        items: state.items
          .map((i) => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i))
          .filter((i) => i.qty > 0), // auto-remove if qty hits 0
      };
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
}

// ─────────────────────────────────────────────────────────────
// 7. PATTERN — Lazy initializer (3rd argument)
// ─────────────────────────────────────────────────────────────
//
//   useReducer(reducer, initialArg, initFn)
//
//   initFn(initialArg) runs ONCE on mount — great for:
//   - reading from localStorage
//   - expensive initial computation
//

function initFromStorage(defaultCount: number): CounterState {
  const saved = localStorage.getItem("count");
  return { count: saved ? Number(saved) : defaultCount };
}

function PersistentCounter() {
  // initFromStorage(0) called once, not on every render
  const [state, dispatch] = useReducer(counterReducer, 0, initFromStorage);
  return (
    <button onClick={() => dispatch({ type: "INCREMENT" })}>
      {state.count}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// 8. COMBINING WITH useContext  (poor man's Redux)
// ─────────────────────────────────────────────────────────────
//
//   Pattern:
//     1. Create a Context that holds [state, dispatch]
//     2. Wrap your tree in a Provider that runs useReducer
//     3. Any child can useContext to read state OR dispatch
//
//   This gives you global state without any 3rd-party library.
//
//   import { createContext, useContext } from "react";
//
//   const CartContext = createContext<...>(null!);
//
//   export function CartProvider({ children }) {
//     const [state, dispatch] = useReducer(cartReducer, { items: [] });
//     return (
//       <CartContext.Provider value={{ state, dispatch }}>
//         {children}
//       </CartContext.Provider>
//     );
//   }
//
//   export const useCart = () => useContext(CartContext);
//

// ─────────────────────────────────────────────────────────────
// 9. COMMON MISTAKES
// ─────────────────────────────────────────────────────────────
//
//   ❌  Mutating state directly:
//       case "ADD": state.items.push(item); return state; // WRONG — same reference, no re-render
//
//   ✅  Always return a new object:
//       case "ADD": return { ...state, items: [...state.items, item] };
//
//   ❌  Async inside reducer:
//       case "FETCH": await fetch(url); // NEVER — reducers are synchronous
//
//   ✅  Async lives outside, dispatch after:
//       const data = await fetch(url);
//       dispatch({ type: "FETCH_SUCCESS", payload: data });
//
//   ❌  Forgetting default:
//       switch(action.type) { case "X": ... }
//       // unknown action silently returns undefined → crash
//
//   ✅  Always:
//       default: return state;
//

// ─────────────────────────────────────────────────────────────
// 10. CHEAT SHEET — ONE-LINER REMINDERS
// ─────────────────────────────────────────────────────────────
//
//   dispatch        → "hey reducer, something happened"
//   action.type     → WHAT happened  (string, usually SCREAMING_SNAKE_CASE)
//   action.payload  → extra data you need to compute the new state
//   reducer         → the ONLY place state logic lives (easy to unit test!)
//   initialState    → plain object, no functions
//   3rd arg init fn → defer expensive init, read from external source once
//
//   Re-render rule  → React bails out if reducer returns the SAME reference
//                     (Object.is comparison) → mutation = silent bug
//
//   Testing tip     → reducers are just functions, test them without React:
//                     expect(counterReducer({ count: 2 }, { type: "INCREMENT" }))
//                       .toEqual({ count: 3 });
//

// ─────────────────────────────────────────────────────────────
// DEFAULT EXPORT — UseReducerLesson
// Drop this anywhere in your app to browse all lesson components
// ─────────────────────────────────────────────────────────────

export default function UseReducerLesson() {
  return (
    <div>
      {/* Lesson 3 — Basic reducer with counter */}
      {/* <Counter /> */}

      {/* Lesson 4 — Multi-field form state */}
      <SignupForm />

      {/* Lesson 5 — Async fetch lifecycle (pass any userId) */}
      {/* <UserProfile userId="1" /> */}

      {/* Lesson 7 — Lazy initializer reading from localStorage */}
      {/* <PersistentCounter /> */}

      {/*
        Lesson 6 (cartReducer) and Lesson 8 (useContext combo) are
        intentionally left as logic/patterns only — no UI shell needed.
        Read the comments above to review those patterns.
      */}

      {/* <TaskManagerUsingUseReducerHook /> */}
    </div>
  );
}
