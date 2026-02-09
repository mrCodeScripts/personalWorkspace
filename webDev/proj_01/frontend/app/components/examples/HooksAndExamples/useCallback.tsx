"use client";

import { useCallback, useEffect, useState} from "react";

function UseCallbackExample1() {
  const [count, setCount] = useState<number>(0);

  type Message = {
    message?: string;
  };

  // will change if 'count' changes
  const memoizedFn1 = useCallback(({message}: Message) => {
    console.log("Memoized function with dependency re-rendering.", (message ? `Other Message: ${message}` : "No Other messages."));
  }, [count]);

  // will only re-render once every browser mount (after unmounting).
  // will remain the same function regardless of count state changes or refreshes.
  const memoizedFn2 = useCallback(({message}: Message) => {
    console.log("Memoized function without dependency re-rendering", (message ? `Other Message: ${message}` : "No Other messages."));
  }, []);

  const unmemoizedFn = ({message}: Message) => {
    console.log("Unmemoized function re-rendering.", (message ? `Other Message: ${message}` : "No Other messages."));
  };

  memoizedFn1({message: "Fuck You!"});
  memoizedFn2({message: "Fuck You Too!"});
  unmemoizedFn({message: "Fuck You Bitch!"});

  useEffect(() => {console.log(count)}, [count]);


  return (
    <>
      <button type="button" onClick={() => setCount(prev => prev  + 1)} style={{backgroundColor: "red", borderRadius: "10px", border: "1px solid gray"}}>
        Click This!
      </button>
    </>
  );
};

export default function UseCallbackExamples() {
  return (
    <>
      <UseCallbackExample1 />
    </>
  );
};
