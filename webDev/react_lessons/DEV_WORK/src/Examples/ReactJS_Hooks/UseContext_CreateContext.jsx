import { createContext, useContext } from "react";

const TheContext = createContext();

function ContextParentExample({ children }) {
  const val = {
    username: "John Doe",
    age: 19,
    gender: "Male",
  };

  return (
    <>
      <TheContext.Provider value={val}>{children}</TheContext.Provider>
    </>
  );
}

function useTheContext() {
  return useContext(TheContext);
}

function ContextChildExample() {
  const useContext = useTheContext();

  return (
    <>
      <div>
        <p>Personal Informations:</p>
        <p>
          <span>Username: {useContext.username}</span>
        </p>
        <p>
          <span>Age: {useContext.age}</span>
        </p>
        <p>
          <span>Gender: {useContext.gender}</span>
        </p>
      </div>
    </>
  );
}

export function TryUseContext() {
  return (
    <>
      <ContextParentExample>
        <ContextChildExample></ContextChildExample>
      </ContextParentExample>
    </>
  );
}

/*
-------------------------------------------------------------
🧠 COMPLETE DESCRIPTION OF createContext() & useContext()
-------------------------------------------------------------

-------------------------------------------------------------
🔹 createContext()
-------------------------------------------------------------
- Purpose:
  Creates a Context object that allows data to be passed 
  through the component tree without manually passing props 
  at every level (avoids prop drilling).

- Syntax:
  const MyContext = createContext(defaultValue);

- Notes:
  • The `defaultValue` is only used if a component consumes 
    the context **without a Provider above it**.
  • Can hold any type of value: string, number, object, function, etc.
  • Typically used for **global-ish data**:
      - Themes (dark/light)
      - Sockets / live connections
      - Configs or global settings
      - Shared API state or flags

-------------------------------------------------------------
🔹 Context.Provider
-------------------------------------------------------------
- Purpose:
  Wraps children components and passes a value down the tree.
- Syntax:
  <MyContext.Provider value={someValue}>
    {children}
  </MyContext.Provider>

- Notes:
  • `{children}` is automatically passed from the parent component.
  • Any consuming child will **re-render automatically** if the `value` changes.
  • Avoid putting frequently changing values unless necessary — can trigger multiple re-renders.

-------------------------------------------------------------
🔹 useContext()
-------------------------------------------------------------
- Purpose:
  Hook to **consume the context value** inside any child component
  without prop drilling.

- Syntax:
  const value = useContext(MyContext);

- Notes:
  • Must be used **inside a component wrapped by the Provider**.
  • Reading from context triggers re-render **only when the context value changes**.
  • Can wrap `useContext(MyContext)` inside a custom hook for cleaner usage:
      function useTheContext() { return useContext(MyContext); }

-------------------------------------------------------------
🔹 KEY INSIGHTS / BEST PRACTICES
-------------------------------------------------------------
1️⃣ useContext is best for **global-ish data**, not sensitive or per-component state.
2️⃣ It avoids passing props through many layers (“prop drilling”).
3️⃣ Changing the Provider’s value updates all consuming children automatically.
4️⃣ Can hold any data type (strings, objects, functions, arrays).
5️⃣ Combining with `useState` or `useReducer` in the Provider allows dynamic updates.

-------------------------------------------------------------
🔹 EXAMPLE:

const Context = createContext();

function ComponentExample({ children }) {
  const [person, setPerson] = useState("John Doe");

  return (
    <Context.Provider value={person}>
      {children}
    </Context.Provider>
  );
}

function useTheContext() {
  return useContext(Context);
}

function Child() {
  const aContext = useTheContext();
  return <p>{aContext}</p>;
}

-------------------------------------------------------------
💡 TL;DR SUMMARY
-------------------------------------------------------------
- createContext() → creates a context object.
- Context.Provider → wraps children and passes value.
- useContext() → consumes the context value in any child.
- Ideal for global-ish state like themes, sockets, configs.
- Not recommended for component-specific or sensitive data.
-------------------------------------------------------------
*/

