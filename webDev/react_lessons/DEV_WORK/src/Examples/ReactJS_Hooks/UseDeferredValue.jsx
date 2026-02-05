import { useDeferredValue, useEffect, useState } from "react"

function UseDeferredValueExample1 () {
  const [query, setQuery] = useState("");
  const [hasQuery, setHasQuery] = useState(false);
  const [job, setJob] = useState(false);
  const [loading, setLoading] = useState(false);
  const defferedValue = useDeferredValue(query);

  const inputAction = (e) => {
    setLoading(true);
    setJob(false);
    setQuery(e.target.value);
    setTimeout(() => {}, 0);
  };

  useEffect(() => {
    query == "" ? setHasQuery(false) : 
    setHasQuery(true)}, 
  [query]);

  useEffect(() => {
    const slowProcess = async () => {
      await new Promise(res => setTimeout(res, 3000));
      if (loading) setLoading(false);
      if (!job)  setJob(true);
    };
    slowProcess()
  }, [defferedValue]);

  return (
    <>
      <input 
        className="p-5 m-3 bg-gray-100 
        rounded-xl outline-none border-2
        border-blue-300 text-gray-700 text-sm"
        type="text" 
        value={query}
        onInput={inputAction}
      />
      {
        loading && job ? <p
          className="px-5 m-3 text-red-400 font-bold"
        >Loading...</p> : 
        !loading && job && hasQuery ? <p
          className="px-5 m-3 text-green-400 font-bold"
        >Done</p> : ""
      }
    </>
  ) 
}

export default function TryUseDeferredValue () {
  return (
    <>
      <UseDeferredValueExample1 />
    </>
  )
}

/*
 useDeferredValue hook (React 18+)

 Purpose:
 - Defers updates of a value to a lower priority.
 - Keeps urgent UI (typing, clicks, animations) responsive even if expensive work depends on the value.

 Mechanics:
 - Takes an input value and returns a "deferred" version of that value.
 - Deferred value updates **after urgent updates are finished**, allowing React to schedule low-priority work.
 - Not time-based; the update happens when React determines the main thread is free.

 Common Use Cases:
 1. Search bars filtering large datasets
    - Input remains instant
    - Expensive filtering or server fetch happens later
 2. Rendering heavy components based on user input
    - Prevents lag by deferring expensive renders
 3. Server-heavy operations
    - Works well with AbortController to cancel previous requests
 4. Combined with useTransition()
    - Deferred value triggers heavy computation inside startTransition()
    - Spinner or pending state can be displayed using isPending

 Key Points:
 - Always keep **urgent input state separate** (do not defer the main input value)
 - Deferred value should only be used for **expensive computations or renders**
 - Works beautifully with useMemo, useEffect, and startTransition for production-ready performance
 - Does NOT create a fixed delay in seconds — timing depends on React’s scheduling
 - Useful for UX performance optimization: smooth typing, preventing blocking renders, reducing server overload

 Example:
 const [query, setQuery] = useState("");
 const deferredQuery = useDeferredValue(query);

 useEffect(() => {
   // Expensive computation or fetch
   fetchData(deferredQuery);
 }, [deferredQuery]);

 Summary:
 - Makes your app feel snappy by deferring low-priority work
 - Input/interaction remains instant
 - Heavy updates happen only when React has free time
 */