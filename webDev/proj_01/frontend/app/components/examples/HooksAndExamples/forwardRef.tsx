"use client";

import { forwardRef, useEffect, useEffectEvent, useRef } from "react";

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
      <button
        className="btn"
        onClick={() =>
          buttonElement_1.current!.style.backgroundColor == "red"
            ? (buttonElement_1.current!.style.backgroundColor = "green")
            : (buttonElement_1.current!.style.backgroundColor = "red")
        }
      >
        This is a Dev Element
      </button>
    </>
  );
}

function ForwardRefExample2() {
  const i = useRef(0);
  const divElement = useRef<HTMLDivElement | null>(null);

  const handleCount = () => {
    i.current++;
    console.log(i.current);
    divElement.current!.style.transform = `translateX(${i.current * 20}px)`;
  };

  return (
    <>
      <button onClick={handleCount}>Click This!</button>
      <div
        ref={divElement}
        className="p-10 bg-red-500 duration-300 ease-in-out"
      >
        This element!
      </div>
    </>
  );
}

function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasWidth = 300;
  const canvasHeight = 300;

  useEffect(() => {
    let ctx = canvasRef.current!.getContext("2d");
    let animation: number;

    const renderBlock = (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      blockX: number,
      blockY: number,
      blockW: number,
      blockH: number,
      blockColor: string,
    ) => {
      ctx.beginPath();
      ctx.rect(blockX, blockY, blockW, blockH);
      ctx.fillStyle = blockColor;
      ctx.fill();
      ctx.closePath();
    };

    

    const run = () => {
      animation = requestAnimationFrame(run);
    };

    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} />
    </>
  );
}

export default function ForwardRefExamples() {
  return (
    <>
      {/* <ForwardRefExample1 /> */}
      <ForwardRefExample2 />
    </>
  );
}
