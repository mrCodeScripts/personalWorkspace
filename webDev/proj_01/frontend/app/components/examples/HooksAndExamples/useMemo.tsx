import { useMemo, useState } from "react";

function UseMemoExample1 () {
  const [state, newState] = useState<number>(0);

  const someExpensiveCalc = useMemo(() => {
    // if state changes, it will recalculate and execute this block.
    console.log("Re-execute this block for SOME EXPENSIVE CALCULATION.");
    return 

  }, [state]);

  return (
    <>

    </>
  )
};

export default function UseMemoExamples() {
  return (
    <>
      <div></div>
    </>
  );
}
