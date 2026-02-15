"use client";

import { useState } from "react";

export default function ClientComponent1(props: {title: string}) {
  const [state, newState] = useState<number>(0);
  return (
    <>
      <p style={{color: "green"}}>{props.title ? props.title : 'No title'}</p>
      <button style={{color: "white", backgroundColor: "green", padding: "10px"}} type="button" onClick={() => {newState(prev => prev + 1)}}>Count: {state}</button>
    </>
  );
}
