import { useCallback, memo, useState } from "react"

const MemoizedComponent = memo(function MemoComponent ({callback, buttonName}) {
  console.log("Rendered Memoized Component");
  return (
    <>
      <button
        className="p-2 m-2 bg-green-500 text-white rounded-xl font-bold"
        type="button"
        onClick={callback}
      >
        {buttonName}
      </button>
    </>
  )
});

export default function TryUseCallback () { 
  const [buttonName, newButtonName] = useState("Button 1");
  const [anotherState, setNewAnotherState] = useState(0);

  const memoizedFn = useCallback(() => {
    console.log("Button clicked!");
  }, []); // you can put a dependency to watch, and the memoized function will only re-render or recreated when those dependencies changes.

  const unMemoizedFn = () => {
    console.log("Button clicked!");
  };


  return (
    <>
      <MemoizedComponent callback={memoizedFn} buttonName={buttonName} />
      <button 
        className="p-2 m-2 bg-red-500 text-white rounded-xl font-bold"
        onClick={() => {
          buttonName == "" | buttonName == "Button 1" ?
            newButtonName("Button 2") :
            newButtonName("Button 1")
        }}
      >
        Change Button Name
      </button>


      {/* 
        If the increment button is clicked an you are using a unMemoizedFn, the memoized
        component will always re-render due to the unMemoizedFn re-creating every render
        which triggers the memoized component to re-render because it notice that the
        function paramter changes. Except if you use the memoizedFn it will not
        re-render everytime the parent re-renders because the same function that was
        created is passed to the paramter of the memoized component which avoids
        triggering re-rendering.
      */}
      <button
        type="button"
        className="p-2 m-2 bg-red-500 text-white rounded-xl font-bold"
        onClick={() => setNewAnotherState(prev => prev + 1)}
      >
        Increment {anotherState}
      </button>
    </>
  )
}


/*
-------------------------------------------------------------
🔁 useCallback()
-------------------------------------------------------------
Purpose:
- useCallback() memoizes a **function** reference, 
  preventing React from creating a new one every render.

-------------------------------------------------------------
🔹 Syntax:
const memoizedFn = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

-------------------------------------------------------------
🧩 Example:
const handleClick = useCallback(() => {
  console.log("Clicked!");
}, []);

const Button = React.memo(({ onClick }) => {
  console.log("Button rendered!");
  return <button onClick={onClick}>Click</button>;
});

function App() {
  return <Button onClick={handleClick} />;
}

// ✅ Button won't re-render unnecessarily because `handleClick` reference stays the same.

-------------------------------------------------------------
⚙️ Why it exists:
When you pass functions as props (like event handlers) 
to memoized components, React creates new function references 
every render — causing child re-renders.

`useCallback()` locks the function identity in memory 
until its dependencies change.

-------------------------------------------------------------
💬 Analogy:
useCallback is like saying:
"Hey React, keep this function exactly the same unless 
these dependencies change."

-------------------------------------------------------------


-------------------------------------------------------------
🔗 HOW THEY CONNECT:
-------------------------------------------------------------
1. useMemo → Memoizes a **value** or **calculation result**.
2. React.memo → Memoizes a **whole component**, avoiding re-render unless props change.
3. useCallback → Memoizes a **function**, preventing re-render caused by new function identity.

-------------------------------------------------------------
🧩 Example (all together):
function App({ products }) {
  const [filter, setFilter] = useState("");

  const filtered = useMemo(() => {
    return products.filter(p => p.name.includes(filter));
  }, [filter, products]);

  const handleClick = useCallback((id) => {
    console.log("Clicked product", id);
  }, []);

  return (
    <>
      <input onChange={e => setFilter(e.target.value)} />
      {filtered.map(p => (
        <MemoizedProduct key={p.id} product={p} onClick={handleClick} />
      ))}
    </>
  );
}

const MemoizedProduct = React.memo(function Product({ product, onClick }) {
  return <p onClick={() => onClick(product.id)}>{product.name}</p>;
});

-------------------------------------------------------------
💬 TL;DR SUMMARY:
-------------------------------------------------------------
- 🧮 useMemo → Memoizes values (avoid recalculating stuff)
- ⚛️ React.memo → Memoizes components (avoid unnecessary re-renders)
- 🔁 useCallback → Memoizes functions (avoid new function identity)

Together, they make React apps **faster**, **cleaner**, and **smarter**.
-------------------------------------------------------------
*/