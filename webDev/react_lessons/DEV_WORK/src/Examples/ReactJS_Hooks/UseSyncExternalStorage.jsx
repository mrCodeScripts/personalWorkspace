import {
  useCallback,
  useEffect,
  useOptimistic,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

function UseSyncExternalStoreExample1() {
  const windowGetData = {
    subscribe: useCallback((cb) => {
      window.addEventListener("resize", cb);
      return () => window.removeEventListener("resize", cb);
    }, []),
    widthGetData: { getSnapshot: useCallback(() => window.innerWidth, []) },
    heightGetData: { getSnapshot: useCallback(() => window.innerHeight, []) },
  };

  const windowWidth = useSyncExternalStore(
    windowGetData.subscribe,
    windowGetData.widthGetData.getSnapshot
  );
  const windowHeight = useSyncExternalStore(
    windowGetData.subscribe,
    windowGetData.heightGetData.getSnapshot
  );

  return (
    <>
      <p className="p-3 mx-3 text-gray-500">
        Window Width: <span className="px-3 font-bold">{windowWidth}px</span>
      </p>
      <p className="p-3 mx-3 text-gray-500">
        Window Height: <span className="px-3 font-bold">{windowHeight}px</span>
      </p>
    </>
  );
}

function UseSyncExternalStoreExample2() {
  const scrollX = useSyncExternalStore(
    useCallback((cb) => {
      window.addEventListener("scroll", cb);
      return () => window.removeEventListener("scroll", cb);
    }, []),
    () => window.scrollX
  );

  const scrollY = useSyncExternalStore(
    useCallback((cb) => {
      window.addEventListener("scroll", cb);
      return () => window.removeEventListener("scroll", cb);
    }, []),
    () => window.scrollY
  );

  return (
    <>
      <div className="w-full h-[200vh] relative">
        <div
          className={`w-[100px] h-[100px] absolute bg-green-300 right-0`}
          style={{
            top: `${scrollY}px`,
            willChange: 'top',
            transition: "top ease 0.1s 0.1s"
          }}
        ></div>
        <div className="static">
          <p className="p-3 mx-3 text-gray-500">
            Scroll X:
            <span className="px-3 font-bold">{scrollX}</span>
          </p>
          <p className="p-3 mx-3 text-gray-500">
            Scroll Y:
            <span className="px-3 font-bold">{scrollY}</span>
          </p>
        </div>
      </div>
    </>
  );
}


function UseSyncExternalStoreExample3 () {
  const getMousePoints = () => {
      const pointRef = useRef({x: 0, y: 0});

      return useSyncExternalStore(useCallback((cb) => {
        const pointHandle = (e) => {
          pointRef.current = {x: e.clientX, y: e.clientY};
          cb();
        };

        document.addEventListener("mousemove", pointHandle);
        return () => document.removeEventListener("mousemove", pointHandle);
      }, []), useCallback(() => pointRef.current, []));
  };

  const {x, y} = getMousePoints();

  return (
    <>
      <p className="p-3 mx-3 text-gray-500">
        Mouse X: <span className="px-3 font-bold">{x}px</span>
      </p>
      <p className="p-3 mx-3 text-gray-500">
        Mouse Y: <span className="px-3 font-bold">{y}px</span>
      </p>
      <div 
        className="w-[10px] h-[10px] absolute 
        bg-green-300 rounded-xl"
        style={{
          top: `${y}px`,
          left: `${x}px`,
          transform: "translate(-50%, -50%)",
          willChange: 'top, left',
          transition: "top ease-in-out 0.1s 0.1s, left ease-in-out 0.1s 0.1s"
        }}
      >
      </div>
    </>
  )
}

export default function TryUseSyncExternalStore() {
  return (
    <>
      <UseSyncExternalStoreExample1 />
      <UseSyncExternalStoreExample2 />
      <UseSyncExternalStoreExample3 />
    </>
  );
}

/**
 * useSyncExternalStore Hook - Full Summary
 *
 * SYNTAX / STRUCTURE:
 * 
 * const value = useSyncExternalStore(
 *   subscribe,       // function: (callback) => cleanup function
 *   getSnapshot,     // function: () => current value from store
 *   getServerSnapshot // optional function: () => value for SSR
 * );
 *
 * Example:
 * const width = useSyncExternalStore(
 *   (cb) => {
 *     window.addEventListener("resize", cb);
 *     return () => window.removeEventListener("resize", cb);
 *   },
 *   () => window.innerWidth
 * );
 *
 * WHAT IT IS:
 * - A React hook introduced to safely subscribe to external (or internal) stores 
 *   while preventing inconsistent UI states, known as "tearing."
 * - Ensures that your component always renders with consistent values, even 
 *   during concurrent rendering or multiple React roots.
 *
 * PRIMARY USE CASE:
 * - Reading external data sources like:
 *    - Window properties (scroll, size)
 *    - Mouse positions
 *    - Global state stores (Redux, Zustand, custom stores)
 * - Avoids subtle bugs that can occur when using useState/useEffect for external subscriptions.
 *
 * HOW IT WORKS:
 * - subscribe(callback) is called by React; callback triggers re-render.
 * - getSnapshot() returns the current value from the store or source.
 * - getServerSnapshot() is optional for SSR.
 * - React re-renders if the value returned by getSnapshot() changes.
 *
 * IMPORTANT MECHANICS & PITFALLS:
 * - getSnapshot returns a value that is compared by reference.
 *   - Returning objects or arrays causes re-renders every time (different reference).
 *   - Fix: memoize return values or split into separate hooks per value.
 * - Functions are first-class objects; can be returned safely if memoized.
 * - Subscription callback (cb) only triggers re-render, does not carry data.
 * - Always clean up event listeners in the subscribe function to avoid memory leaks.
 *
 * BEST PRACTICES:
 * - Use useCallback to memoize subscription and snapshot functions if they depend on other variables.
 * - Avoid returning new objects or arrays on every snapshot call; memoize if needed.
 * - Use multiple hooks for multiple related values to avoid unnecessary re-renders.
 * - Ideal for consistent, reactive subscriptions to any external data source in a concurrent-safe way.
 *
 * REAL-LIFE EXAMPLES:
 * - Window resize:
 *     const width = useSyncExternalStore(subscribeToResize, () => window.innerWidth);
 * - Scroll position:
 *     const scrollY = useSyncExternalStore(subscribeToScroll, () => window.scrollY);
 * - Mouse position:
 *     const {x, y} = useSyncExternalStore(subscribeToMouseMove, () => ({x: e.clientX, y: e.clientY}));
 * - Any custom store (like Redux or Zustand) to safely subscribe to data changes.
 *
 * SUMMARY OF DISCUSSION:
 * - Designed to prevent tearing and inconsistent state.
 * - Compare by reference vs value is crucial.
 * - Subscription callback triggers re-render; getSnapshot returns the data.
 * - Can replace some useEffect/useState patterns for external subscriptions.
 * - Use memoization when needed (useCallback, useMemo) to prevent unnecessary re-renders.
 */
