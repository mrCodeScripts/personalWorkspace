import { useReducer, useEffect, useActionState, useId, useRef, useTransition } from "react";

// SIMPLE USEREDUCER FUNCTION

function useReducerDispatcher(state, action) {
  switch (action.type) {
    case "decrement":
      return state - action.payload;
    case "increment":
      return state + action.payload;
    default:
      return state;
  }
}

export function TestUseReducer() {
  const initialState = 0;
  const [state, dispatch] = useReducer(useReducerDispatcher, initialState);
  return (
    <>
      <p className="text-xl font-bold text-center">{state}</p>
      <div className="w-full flex flex-row justify-center">
        <button
          className="p-3 border-2 border-red-500 text-sm font-bold text-white bg-red-300 rounded-xl m-3"
          onClick={() => dispatch({ type: "decrement", payload: 1 })}
        >
          Decrement
        </button>
        <button
          className="p-3 border-2 border-green-500 text-sm font-bold text-white bg-green-300 rounded-xl m-3"
          onClick={() => dispatch({ type: "increment", payload: 1 })}
        >
          Increment
        </button>
      </div>
    </>
  );
}

// TASK MANAGER USING USEREDUCER HOOK
// 1. Define actions
const ACTIONS = {
  ADD_TASK: "add-task",
  TOGGLE_TASK: "toggle-task",
  REMOVE_TASK: "remove-task",
  CLEAR_COMPLETED: "clear-completed",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

// 2. Reducer function
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOADING:
      return { ...state, loading: true, error: null };
    case ACTIONS.SUCCESS:
      return { ...state, loading: false, tasks: action.payload };

    case ACTIONS.ERROR:
      return { ...state, loading: false, error: action.payload };

    case ACTIONS.ADD_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
          },
        ],
      };
    case ACTIONS.TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };

    case ACTIONS.REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };

    case ACTIONS.CLEAR_COMPLETED:
      return {
        ...state,
        tasks: state.tasks.filter((t) => !t.completed),
      };

    default:
      return state;
  }
}

// 3. Initial state
const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

// 4. Component using useReducer
function TaskManager() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fake async fetch
  useEffect(() => {
    dispatch({ type: ACTIONS.LOADING });
    setTimeout(() => {
      // simulate success
      dispatch({
        type: ACTIONS.SUCCESS,
        payload: [
          {
            id: 1,
            text: "Learn useReducer",
            completed: true,
          },
          {
            id: 2,
            text: "Build a project",
            completed: false,
          },
        ],
      });
    }, 1000);
  }, []);

  const addTask = (text) => {
    dispatch({ type: ACTIONS.ADD_TASK, payload: text });
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">Task Manager (useReducer)</h1>

      {state.loading && <p>Loading...</p>}
      {state.error && <p className="text-red-500">{state.error}</p>}

      <input
        type="text"
        placeholder="Add new task"
        className="border p-2 rounded w-full"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value.trim()) {
            addTask(e.target.value);
            e.target.value = "";
          }
        }}
      />

      <ul className="space-y-2">
        {state.tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center bg-gray-100 p-2 rounded"
          >
            <span
              onClick={() =>
                dispatch({
                  type: ACTIONS.TOGGLE_TASK,
                  payload: task.id,
                })
              }
              className={`cursor-pointer ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {task.text}
            </span>
            <button
              onClick={() =>
                dispatch({
                  type: ACTIONS.REMOVE_TASK,
                  payload: task.id,
                })
              }
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {state.tasks.some((t) => t.completed) && (
        <button
          onClick={() => dispatch({ type: ACTIONS.CLEAR_COMPLETED })}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Completed
        </button>
      )}
    </div>
  );
}

function UseReducerExample3() {
  const chosenColor = useRef(0);
  const nameId = useId();
  const ageId = useId();

  const dispatchType = {
    ADD_USER: "add_user",
    DEL_USER: "delete_user",
  };

  const formState = {
    _NEUTRAL: {
      msg: "",
      show: false,
    },
    _ERR_NO_INPUT: {
      msg: "Invalid Input: No data!",
      show: true,
    },
    _SUCCESS_ADD: {
      msg: "Successfully added user!",
      show: true,
    },
    _SUCCESS_DEL: {
      msg: "Successfully deleted user!",
      show: true,
    },
  };

  const colors = [
    "red",
    "green",
    "blue",
    "pink",
    "purple",
    "indigo",
    "orange",
    "yellow",
    "gray",
  ];

  const colorClasses = {
    red: "border-red-300",
    green: "border-green-300",
    blue: "border-blue-300",
    pink: "border-pink-300",
    purple: "border-purple-300",
    indigo: "border-indigo-300",
    orange: "border-orange-300",
    yellow: "border-yellow-300",
    gray: "border-gray-300",
  };

  const [usersState, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case dispatchType.ADD_USER:
          return [action.payload, ...state];
        case dispatchType.DEL_USER:
          return state.filter((v, i) => i !== Number(action.payload.id));
        default:
          return state;
      }
    },
    [
      { name: "Jane Doe", age: 19 },
      { name: "John Doe", age: 19 },
      { name: "John Doe", age: 19 },
      { name: "John Doe", age: 19 },
      { name: "John Doe", age: 19 },
      { name: "John Doe", age: 19 },
      { name: "John Doe", age: 19 },
      { name: "John Doe", age: 19 },
      { name: "John Doe", age: 19 },
      { name: "John Doe", age: 19 },
      { name: "John Doe", age: 19 },
      { name: "John Doe", age: 19 },
      { name: "John Doe", age: 19 },
      { name: "John Doe", age: 19 },
      { name: "John Doe", age: 19 },
    ]
  );

  const [addUserState, addUserAction, addIsLoading] = useActionState(
    async (state, formData) => {
      await new Promise((res) => setTimeout(res, 5000));
      const name = formData.get("name") ?? null;
      const age = formData.get("age") ?? null;
      if (!name || !age) return formState._ERR_NO_INPUT;
      dispatch({
        type: dispatchType.ADD_USER,
        payload: {
          name: name,
          age: age,
        },
      });
      return formState._SUCCESS_ADD;
    },
    formState._NEUTRAL,
    "/formsubmit/tasks/addUser"
  );

  const [delUserState, delUserAction, delIsLoading] = useActionState(
    async (state, formData) => {
      await new Promise((res) => setTimeout(res, 5000));
      const id = formData.get("user_id") ?? null;
      if (!id) return formState._ERR_NO_INPUT;
      dispatch({
        type: dispatchType.DEL_USER,
        payload: { id: id },
      });
      return formState._SUCCESS_DEL;
    },
    formState._NEUTRAL,
    "/formsubmit/tasks/delUser"
  );

  const [loading, startTransition] = useTransition();

  const userDeleteHandler = (i) => {
    console.log(i);
    const formData = new FormData();
    formData.append("user_id", i);
    startTransition(() => {
      delUserAction(formData);
    });
  };

  return (
    <>
      <form
        className="flex flex-col bg-gray-200 p-3 m-3 rounded-xl gap-2"
        action={addUserAction}
      >
        <input
          type="text"
          name="name"
          id={`task_input_${nameId}`}
          className="bg-gray-100 rounded-md border-2 border-indigo-300 outline-none focus:outline-indigo-100 px-3 py-2"
          placeholder="Name"
        />
        <input
          type="number"
          defaultValue={18}
          name="age"
          className="bg-gray-100 rounded-md border-2 border-indigo-300 outline-none focus:outline-indigo-100 px-3 py-2"
          placeholder="Age"
          id={`tas_input_${ageId}`}
        />
        <button
          type="submit"
          disabled={addIsLoading}
          className="p-3 bg-green-500 hover:bg-green-300 transition-all duration-300 text-md font-bold text-white rounded-xl disabled:bg-green-200"
        >
          {addIsLoading ? "Loading..." : "Add User"}
        </button>
      </form>
      {usersState.length === 0 ? (
        <p className="p-3 m-3 text-red-300 font-bold">NO USERS</p>
      ) : (
        usersState.map((v, i) => {
          const color = colors[chosenColor.current];
          const colorClass = colorClasses[color];
          chosenColor.current = (chosenColor.current + 1) % colors.length;
          return (
            <div
              key={i}
              className={`pl-10 pr-3 border-l-[3px] ${colorClass} py-3 m-3 flex flex-row bg-gray-100
              rounded-xl`}
            >
              <div className="flex flex-col gap-1">
                <p>Name: {v.name}</p>
                <p>Age: {v.age}</p>
              </div>
              <div className="ml-auto">
                {/* <form action={deleteUser}> */}
                  {/* <input type="hidden" name="user_id" value={i} /> */}
                  <button
                    type="submit"
                    className="hover:bg-gray-300 p-1 rounded-full"
                    onClick={() => {userDeleteHandler(i)}}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#434343"
                    >
                      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                    </svg>
                  </button>
                {/* </form> */}
              </div>
            </div>
          );
        })
      )}
    </>
  );
}

export function TryUseReducer() {
  return (
    <>
      {/* <TestUseReducer /> */}
      {/* <TaskManager /> */}
      <UseReducerExample3 />
    </>
  );
}

/*
-------------------------------------------------------------
🧠 COMPLETE DESCRIPTION OF useReducer()
-------------------------------------------------------------

-------------------------------------------------------------
🔹 PURPOSE:
-------------------------------------------------------------
- useReducer() is a React hook for managing state logic in a more
  predictable and centralized way than useState.
- It’s perfect when you have:
    • complex state objects
    • multiple sub-values
    • logic that depends on the type of action
- Instead of calling setState directly, you dispatch **actions** with
  a type and optional payload, and a reducer function decides how
  the state should change.

-------------------------------------------------------------
🔹 SYNTAX:
-------------------------------------------------------------
const [state, dispatch] = useReducer(reducerFunction, initialState);

- `state` → current state object/value
- `dispatch` → function used to send an action to the reducer
- `reducerFunction(state, action)` → returns a new state based on action

-------------------------------------------------------------
🔹 REDUCER FUNCTION:
-------------------------------------------------------------
function reducer(state, action) {
  switch(action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "setName":
      return { ...state, name: action.payload };
    default:
      return state;
  }
}

-------------------------------------------------------------
🔹 ACTION OBJECT:
-------------------------------------------------------------
- Must have a `type` property (string)
- Optional `payload` property (any value you want to pass)
Example:
dispatch({ type: "increment" });
dispatch({ type: "setName", payload: "Boss" });

-------------------------------------------------------------
🔹 HOW IT WORKS:
-------------------------------------------------------------
1️⃣ You call dispatch({ type: "actionType", payload? })
2️⃣ React calls your reducer(state, action)
3️⃣ Reducer returns a new state object
4️⃣ React updates the component state and triggers a re-render

-------------------------------------------------------------
🔹 WHY USE useReducer OVER useState:
-------------------------------------------------------------
- Great for complex state objects with multiple values
- All state updates are centralized in **one reducer function**
- Makes code more predictable and easier to debug
- Works nicely with context providers for global state

-------------------------------------------------------------
🔹 EXAMPLE:

const initialState = { count: 0, name: "Boss" };

function reducer(state, action) {
  switch(action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "setName":
      return { ...state, name: action.payload };
    default:
      return state;
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <p>Count: {state.count}</p>
      <p>Name: {state.name}</p>

      <button onClick={() => dispatch({ type: "increment" })}>
        Increment
      </button>
      <button onClick={() => dispatch({ type: "decrement" })}>
        Decrement
      </button>
      <button onClick={() => dispatch({ type: "setName", payload: "Alpha Boss" })}>
        Change Name
      </button>
    </>
  );
}

-------------------------------------------------------------
💡 TL;DR SUMMARY:
-------------------------------------------------------------
- useReducer = advanced useState for **complex state management**
- State updates go through a **centralized reducer function**
- dispatch() sends action objects to the reducer
- Reducer uses **type + payload** to compute new state
- Perfect for multi-value objects, predictable state transitions, and large apps
-------------------------------------------------------------
*/
