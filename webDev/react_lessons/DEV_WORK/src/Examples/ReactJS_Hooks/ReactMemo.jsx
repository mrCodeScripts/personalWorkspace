import { memo, useCallback, useEffect, useState } from "react"

const MemoizedChildComponent = memo(function Child({score}) {
  console.log("Child component re-rendered!");
  return (
    <>
      <p>
        <span>Score: <b>{score}</b></span>
      </p>
    </>
  )
});

function ParentComponent () {
  const [sec, newSec] = useState(0);
  const [score, newScore] = useState(0);
  useEffect(() => {
    const intv = setInterval(() => {
      newSec(prev => prev + 1);
    }, 1000);
    return () => clearInterval(intv);
  }, []);

  console.log("Parent component re-rendered!");

  return (
    <>
      <p>
        <span>
          Seconds <b>{sec}</b> 
        </span>
      </p>
      <hr />
        <MemoizedChildComponent score={score} />
      <hr />
      <button
        type="button"
        onClick={() => newScore(prev => prev + 1)}
      >
        Add Score
      </button>
    </>
  )
}

export default function TryReactMemo() {

  return (
    <>
      <ParentComponent />
    </>
  )
}

/*
-------------------------------------------------------------
⚛️ React.memo()
-------------------------------------------------------------
Purpose:
- React.memo() is used to **memoize a component**.
- It prevents the component from re-rendering unless its props change.

-------------------------------------------------------------
🔹 Syntax:
const MyComponent = React.memo(function MyComponent({ data }) {
  return <div>{data}</div>;
});

-------------------------------------------------------------
🧩 Example:
function Product({ name, price }) {
  console.log("Rendered:", name);
  return <p>{name} - ${price}</p>;
}

const MemoizedProduct = React.memo(Product);

function ProductList({ products }) {
  return (
    <>
      {products.map((p) => (
        <MemoizedProduct key={p.id} name={p.name} price={p.price} />
      ))}
    </>
  );
}

// ✅ Each product re-renders ONLY if its own props change.

-------------------------------------------------------------
⚙️ Key Points:
- Great for lists, cards, and UI parts that don’t need to re-render every time.
- Works best with stable props (like primitive values).
- Functions as props will cause re-renders unless you use `useCallback()`.

-------------------------------------------------------------
💬 Analogy:
"Don’t re-paint this component unless its props really changed."


-------------------------------------------------------------
*/
