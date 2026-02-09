"use client";

import { forwardRef, useEffect, useRef } from "react";

const FowardThis = forwardRef<
  HTMLButtonElement,
  { buttonName?: string; buttonClassnames?: string; onClickFn: () => void }
>(({ buttonName, buttonClassnames, onClickFn }, ref) => {
  return (
    <>
      <button ref={ref} className={buttonClassnames} onClick={onClickFn}>
        {buttonName}
      </button>
    </>
  );
});

function ForwardRefExample1() {
  const buttonElement_1 = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <FowardThis
        buttonName="Click me!"
        buttonClassnames="p-3 bg-green-300"
        onClickFn={() => {
          console.log("clicked");
          console.log(buttonElement_1);
        }}
        ref={buttonElement_1}
      />
      <button className="btn" onClick={() => buttonElement_1.current!.style.backgroundColor == "red" ? buttonElement_1.current!.style.backgroundColor = "green" : buttonElement_1.current!.style.backgroundColor = "red"}>
        This is a Dev Element
      </button>
    </>
  );
};

function ForwardRefExample2() {
  

  return (
    <>

    </>
  );
};

export default function ForwardRefExamples() {
  return (
    <>
      <ForwardRefExample1 />
    </>
  );
}
