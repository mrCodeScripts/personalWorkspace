"use client";
import { useEffect, useState } from "react";

function UseEffectExample1() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    console.log("Count has changed or setup:", count);
    return () => {console.log("UseEffect of count has been unmounted!");}
  }, [count]);

  return (
    <>
      <p>
        {count >= 0 ? count : "Count does not exist!"}
      </p>
      <button type="button" style={{backgroundColor: "green", border: "1px solid lime", borderRadius: "10px", padding: "5px", color: "#f3f3f3"}} onClick={() => setCount(prev => prev + 1)}>
        Click This!
      </button>
    </>
  );
};

export default function UseEffectExamples() {
  return (
    <>
      <UseEffectExample1 />
    </>
  );
}
