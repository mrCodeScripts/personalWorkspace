"use client";

import { User } from "@/types";
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
      <p className="p-3 font-bold text-green-200 text-center">{state.count}</p>
      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={() => dispatch({ type: "INCREMENT" })}
          className="w-full px-4 py-2 bg-gray-900 border border-gray-600 text-white rounded-md focus:outline-none focus:border-green-400 transition-colors text-xl font-bold"
        >
          +
        </button>
        <button
          onClick={() => dispatch({ type: "DECREMENT" })}
          className="w-full px-4 py-2 bg-gray-900 border border-gray-600 text-white rounded-md focus:outline-none focus:border-green-400 transition-colors text-xl font-bold"
        >
          -
        </button>
        <button
          onClick={() => dispatch({ type: "RESET" })}
          className="w-full px-4 py-2 bg-gray-900 border border-gray-600 text-white rounded-md focus:outline-none focus:border-green-400 transition-colors text-md font-semibold"
        >
          reset
        </button>
        <button
          onClick={() => dispatch({ type: "SET", payload: 100 })}
          className="w-full px-4 py-2 bg-gray-900 border border-gray-600 text-white rounded-md focus:outline-none focus:border-green-400 transition-colors text-md font-semibold"
        >
          set 100
        </button>
      </div>
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
          return state.map((item) =>
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
    let taskListDisplay =
      taskList.length > 0
        ? taskList
            .map(
              (item, index) =>
                `[${index}] Name: [${item.name}] -- Description: [${item.description ? item.description : "No Description!"}]`,
            )
            .join("\n")
        : loadingTasks
          ? "LOADING TASKS..."
          : "NO TASKS!";

    console.log(
      "%c" + taskListDisplay.trim(),
      (taskList.length > 0 ? "color: lime;" : "color: red;") +
        "font-weight: bold; padding: 0px;",
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
            taskList.map((item) => (
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

  useEffect(() => {
    console.log(
      "%cName: " +
        (form.name ? form.name : "[null]") +
        ", Email: " +
        (form.email ? form.email : "[null]") +
        ", Age: " +
        (form.age ? parseInt(form.age) : "[null]"),
      "color: lime; font-weight: bold; padding: 10px;",
    );
  }, [form]);

  return (
    <form className="flex flex-col gap-2 items-center justify-center">
      <div className="grid grid-cols-3 gap-2">
        <input
          className="w-full px-4 py-2 bg-gray-900 border border-gray-600 text-white rounded-md focus:outline-none focus:border-green-400 transition-colors"
          value={form.name}
          onChange={handleChange("name")}
          placeholder="Name"
        />
        <input
          className="w-full px-4 py-2 bg-gray-900 border border-gray-600 text-white rounded-md focus:outline-none focus:border-green-400 transition-colors"
          value={form.email}
          onChange={handleChange("email")}
          placeholder="Email"
        />
        <input
          className="w-full px-4 py-2 bg-gray-900 border border-gray-600 text-white rounded-md focus:outline-none focus:border-green-400 transition-colors"
          value={form.age}
          onChange={handleChange("age")}
          placeholder="Age"
        />
      </div>
      <button
        className="flex-1 py-1.5 w-full bg-red-600/20 text-red-400 border border-red-600/30 hover:bg-red-600 hover:text-white font-semibold rounded transition-all text-xs uppercase tracking-wider"
        type="button"
        onClick={() => dispatch({ type: "RESET_FORM" })}
      >
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

// ============================================================
// NEXT.JS HYDRATION + CLIENT/SERVER COMPONENT NOTES
// ============================================================
//
// WHAT IS HYDRATION?
//   After the server sends HTML to the browser, React runs on
//   the client and "hydrates" it — it attaches event listeners
//   and takes over the DOM. For this to work, the client's
//   first render must produce the EXACT same output as the
//   server's HTML. If they differ → hydration error.
//
// ─────────────────────────────────────────────────────────
// WHAT "use client" ACTUALLY MEANS
// ─────────────────────────────────────────────────────────
//
//   It does NOT mean "skip server rendering."
//   The server STILL renders the component for the initial HTML.
//
//   What it really means:
//     → "This is the boundary where server hands off to client."
//     → Above the boundary: server owns the truth.
//     → Below the boundary: client owns the truth.
//
//   When a Server Component imports a Client Component:
//     - Next.js SSRs it on the server (commits to HTML)
//     - Client re-renders it and compares against server HTML
//     - If they differ → hydration error
//
//   When the PARENT is a Client Component ("use client"):
//     - Server still does a render pass for the initial HTML,
//       BUT it hands full ownership to the client.
//     - Client re-renders the subtree freely, no strict match.
//     - Nothing to mismatch against → no hydration error.
//
//   Mental model:
//     Server Component parent → STRICT handoff (must match exactly)
//     Client Component parent → LOOSE handoff (client takes over)
//
// ─────────────────────────────────────────────────────────
// COMPONENT COMPOSITION RULES
// ─────────────────────────────────────────────────────────
//
//   ✅  Server → Server → Client     fine, normal pattern
//   ✅  Client → Client              fine
//   ❌  Client → Server              not allowed
//   ❌  Server → Client → Server     not allowed
//
//   Server → Server → Client is fine AS LONG AS the Client
//   Component's first render is identical on server and client.
//
// ─────────────────────────────────────────────────────────
// THE 3 THINGS THAT CAUSE HYDRATION MISMATCHES
// ─────────────────────────────────────────────────────────
//
//   1. Non-deterministic values used during render
//      ❌  Date.now(), Math.random(), crypto.randomUUID()
//          called directly in the render body (not in effects)
//
//   2. Browser-only APIs used during render
//      ❌  typeof window, localStorage, navigator, etc.
//          accessed outside of useEffect
//
//   3. Dynamic component patterns
//      ❌  Defining a component INSIDE another component's
//          render body — it creates a new function reference
//          on every render, causing React to unmount/remount
//          and producing different DOM output server vs client.
//      ❌  Rendering components from an array/map of refs
//          where the SSR pass resolves differently than client.
//
// ─────────────────────────────────────────────────────────
// NEVER DEFINE A COMPONENT INSIDE ANOTHER COMPONENT
// ─────────────────────────────────────────────────────────
//
//   ❌  WRONG — new function reference on every render:
//
//       function Parent() {
//         const Child = () => hello; // ← defined inside
//         return ;
//       }
//
//   ✅  RIGHT — stable identity:
//
//       const Child = () => hello; // ← defined outside
//       function Parent() {
//         return ;
//       }
//
//   Defining a component inside another's render body means:
//     - Every render creates a NEW component type
//     - React unmounts and remounts it (not just re-renders)
//     - SSR produces different DOM than client → mismatch
//     - suppressHydrationWarning does NOT fix this
//
// ─────────────────────────────────────────────────────────
// THE "mounted" GUARD PATTERN — escape hatch
// ─────────────────────────────────────────────────────────
//
//   Use when a component CAN'T render the same thing on
//   server and client (e.g. reads from localStorage, uses
//   a browser API, renders something truly dynamic at init).
//
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => setMounted(true), []);
//   if (!mounted) return null;
//   // ... rest of render
//
//   Both server and client commit to `null` on first render.
//   Nothing to mismatch. Client takes over after mount.
//
// ─────────────────────────────────────────────────────────
// suppressHydrationWarning — what it actually does
// ─────────────────────────────────────────────────────────
//
//   Only suppresses attribute/text mismatches on a single
//   DOM element. It does NOT suppress errors from:
//     - Component identity instability (new fn reference)
//     - Missing/extra elements in the tree
//     - Structural differences between server and client
//
//   It is NOT a general fix for hydration errors.
//
// ─────────────────────────────────────────────────────────
// QUICK MENTAL CHECKLIST
// ─────────────────────────────────────────────────────────
//
//   Before shipping a Client Component, ask:
//   [ ] Does anything in the render body call Date.now(),
//       Math.random(), or crypto.randomUUID()?
//   [ ] Does anything access window, localStorage, or
//       navigator outside of useEffect?
//   [ ] Am I defining any component inside this component?
//   [ ] Am I rendering components dynamically from an array
//       in a way that might resolve differently on server?
//   [ ] If yes to any of the above → use useEffect,
//       move the logic out, or use the mounted guard.
//
// ============================================================

type FetchState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };

type FetchAction<T> =
  | { type: "fetch-start" }
  | { type: "fetch-success"; payload: T }
  | { type: "fetch-error"; message: string }
  | { type: "fetch-reset" };

type FetchData = User;

const DisplayDataComponent = ({
  fetchStatus,
}: {
  fetchStatus: FetchState<FetchData>;
}) => {
  if (fetchStatus.status === "idle")
    return <div className="text-green-600">Idle..</div>;
  if (fetchStatus.status === "loading") return <div>Loading...</div>;
  if (fetchStatus.status === "error")
    return <div>ERROR: {fetchStatus.message}</div>;
  if (fetchStatus.status === "success")
    return (
      <div>
        [SUCCESS]
        <div>
          <p>Name: {fetchStatus.data.name}</p>
          <p>Age: {fetchStatus.data.age}</p>
          <p>Phone Number: {fetchStatus.data.phoneNumber}</p>
          <p>Email Address: {fetchStatus.data.email}</p>
        </div>
      </div>
    );
  return null;
};

function UseReducerOnFetchExample() {
  // const [mounted, setMounted] = useState<boolean>(false);
  const [fetchUserStatus, fetchUserStatusDispatcher] = useReducer(
    <T extends FetchData>(
      state: FetchState<T>,
      action: FetchAction<T>,
    ): FetchState<T> => {
      switch (action.type) {
        case "fetch-start":
          return { status: "loading" };
        case "fetch-success":
          return { status: "success", data: action.payload };
        case "fetch-error":
          return { status: "error", message: action.message };
        case "fetch-reset":
          return { status: "idle" };
        default:
          return state;
      }
    },
    { status: "idle" } as FetchState<FetchData>,
  );

  const fetchUser = async (id: string) => {
    fetchUserStatusDispatcher({ type: "fetch-start" });
    try {
      const res = await fetch(`/api/api-3/${id}`);
      const data = await res.json();

      // console.log(data);
      if (res.ok) {
        fetchUserStatusDispatcher({ type: "fetch-success", payload: data });
      } else {
        throw new Error(data.errorMsg);
      }
    } catch (error) {
      fetchUserStatusDispatcher({
        type: "fetch-error",
        message: (error as Error).message,
      });
    }
  };

  useEffect(() => {
    console.log(fetchUserStatus);
    if (fetchUserStatus.status === "success") console.log(fetchUserStatus.data);
  }, [fetchUserStatus]);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <div>
        <button
          type="button"
          className="p-3 bg-green-800"
          onClick={() => {
            fetchUser("1");
          }}
        >
          Fetch User
        </button>
        <DisplayDataComponent fetchStatus={fetchUserStatus} />
      </div>
    </>
  );
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
  // - A server/client branch `if (typeof window !== 'undefined')`.
  if (typeof window === "undefined") return { count: defaultCount };
  const saved = localStorage.getItem("count");
  return { count: saved ? Number(saved) : defaultCount };
}

function PersistentCounter() {
  // initFromStorage(0) called once, not on every render
  const [state, dispatch] = useReducer(counterReducer, 0, initFromStorage);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    if (!localStorage.getItem("count")) {
      localStorage.setItem("count", "1");
    } else {
      console.log(state);
    }
  }, [])

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

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
type ComponentItems<T extends object = Record<string, any>> = {
  title: string;
  component: React.ComponentType<T>;
  parameters?: T;
  run: boolean;
};

const componentRenderer = <T extends object = any>({
  component: Component,
  parameters,
}: Pick<ComponentItems<T>, "component" | "parameters">) => {
  return <Component {...(parameters as T)} />;
};

export default function UseReducerLesson() {
  // The function at the top can be written as:
  /*
  function renderComponent<T extends object>({ component: Component, parameters }: Pick<ComponentItems<T>, "component" | "parameters">) {
    return <Component {...(parameters as T)} />;
  }
  */

  const components: ComponentItems<{ userId: string }>[] = [
    {
      title: "Counter using useReducer() hook.",
      component: Counter,
      run: false,
    },
    {
      title: "Signup Form using useReducer() hook.",
      component: SignupForm,
      run: false,
    },
    {
      title: "Task manager using useReducer() hook.",
      component: TaskManagerUsingUseReducerHook,
      run: false,
    },
    {
      title: "Async fetch lifecyle (press any userId)",
      component: UserProfile,
      parameters: { userId: "1" },
      run: false,
    },
    {
      title: "User Fetching using useReducer() hook for states.",
      component: UseReducerOnFetchExample,
      run: false,
    },
    {
      title: "Persistent Counter",
      component: PersistentCounter,
      run: true
    }
  ];

  return (
    <div>
      {components.map((item, index) =>
        item.run ? (
          <div key={item.title}>
            <div className="text-gray-400 py-5">
              <span className="font-semibold">{index}.</span> {item.title}
            </div>
            {componentRenderer(item)}
          </div>
        ) : null,
      )}

      {/* <UseReducerOnFetchExample /> */}

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
