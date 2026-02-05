import { useDebugValue, useState } from "react"

function useDebugValueExample1 () {
  const [count, newCount] = useState(0);

  useDebugValue(count);

  const increment = () => newCount(prev => prev + 1);
  const decrement = () => newCount(prev => prev - 1);

  return {count, increment, decrement};
}

export default function TryUseDebugValue () {
  return (
    <></>
  )
}


/**
 * 
 * INSTALL CHROME FIRST TO USE THE REACT DEV TOOLS
 * 
 */