import { memo, useMemo, useState } from "react"

function UseMemoExample1 () {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  // observes changes and will only change if count1 changes value.
  const expensiveCalculation = useMemo(() => {
    console.log("set a new value");
    return count1 * 10;
  }, [count1]);

  return (
    <>
      <p>
        The Expensive Calculated Value: {expensiveCalculation}
      </p>
      <button className="p-3 bg-green-500 m-3" onClick={() => setCount1(prev => prev + 1)}>Increment Count 1</button>
      <button className="p-3 bg-red-500 m-3" onClick={() => setCount2(prev => prev + 2)}>Increment Count 2</button>
    </>
  )
}

function UseMemoExample2 () {
  const products = [
    { name: "Laptop", price: 45000 },
    { name: "Smartphone", price: 25000 },
    { name: "Headphones", price: 1500 },
    { name: "Keyboard", price: 1200 },
    { name: "Mouse", price: 800 },
    { name: "Monitor", price: 7000 },
    { name: "USB Flash Drive", price: 600 },
    { name: "External Hard Drive", price: 3500 },
    { name: "Webcam", price: 2000 },
    { name: "Microphone", price: 1800 }
  ];

  const [filterPrice, setNewFilterPrice] = useState(1000);

  const filteredProducts = useMemo(() => {
    const prd = products.filter(p => p.price <= filterPrice);
    return prd;
  }, [filterPrice]);

  const ProductDisplay = memo(({filProd}) => {
    return (
      <>
        {
          !filProd ? "Filtering products..." : filProd.map((p, i) => 
          <div key={i} className="flex flex-col p-3 rounded-md border-2 border-blue-300 gap-10">
            <p>
              <span>
                Product Name: 
              </span>
              <span>
                {p.name}
              </span>
            </p>
            <p>
              <span>
                Price: 
              </span>
              <span>
                ${p.price}
              </span>
            </p>
          </div>
        )}
      </>
    )
  });

  console.log(filteredProducts);

  return (
    <>
      <input type="number" step={10} value={filterPrice} onInput={(e) => setNewFilterPrice(e.target.value)} />
      <ProductDisplay filProd={filteredProducts} />
    </>
  )
}

function UseMemoExample3 () { 
  const [count, newCount] = useState(0);

  console.log("re-render parent");

  const Child = memo(({onclick, items}) => {
    return (
      <>
        <p>Child</p>
        <button onClick={onclick}>Click this child button</button>
      </>
    )
  });

  const onclicks = useMemo(() => {
    console.log("click chidlren");
  }, []);

  return (
    <>
      <Child onclick={onclicks} />
      <button type="button" onclick={() => newCount(prev => prev + 1)}>Click increment</button>
    </>
  )
}

export default function TryUseMemo () {

  return (
    <>
      {/* <UseMemoExample1 /> */}
      {/* <UseMemoExample2 /> */}
      <UseMemoExample3 />
    </>
  )
}


/*
-------------------------------------------------------------
⚙️ COMPLETE DESCRIPTION OF useMemo(), React.memo(), and useCallback()
-------------------------------------------------------------

-------------------------------------------------------------
🧮 useMemo()
-------------------------------------------------------------
Purpose:
- useMemo() is used to **memoize** (cache) the result of an expensive calculation.
- It only re-runs the function when one of its dependencies changes.
- Prevents unnecessary recalculations on every re-render.

-------------------------------------------------------------
🔹 Syntax:
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

-------------------------------------------------------------
🧩 Example:
const total = useMemo(() => {
  console.log("Calculating...");
  return items.reduce((sum, item) => sum + item.price, 0);
}, [items]);

// ✅ Runs only when `items` changes.

-------------------------------------------------------------
⚙️ Key Points:
- Does NOT return a cleanup function (unlike useEffect).
- Only re-computes if dependencies change.
- Useful for CPU-heavy logic (sorting, filtering, computing totals, etc.).
- Prevents recalculating on every render when the result is the same.

-------------------------------------------------------------
💬 Analogy:
Think of `useMemo` as saying:
"Hey React, if these inputs didn’t change, 
don’t bother recalculating — just give me the last result."

-------------------------------------------------------------
🔹 Common Mistake:
❌ Don’t use useMemo everywhere — it adds overhead if the function is cheap to compute.
✅ Use it for performance optimization only when necessary.

-------------------------------------------------------------
*/
