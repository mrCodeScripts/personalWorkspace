"use client";

import { request } from "http";
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
  const prevTime = useRef<number>(performance.now());
  const accumilator = useRef<number>(0);
  const canvasWidth = 800;
  const canvasHeight = 800;

  useEffect(() => {
    let FIXED_TIMESTAMP: number = 0.1;
    canvasRef.current!.width = canvasWidth;
    canvasRef.current!.height = canvasHeight;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas!.getContext("2d");
    if (!ctx) return;
    let animation: number;

    const renderBlock = (
      ctx: CanvasRenderingContext2D,
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

    type dir = { x: number; y: number };
    let snakeDir: dir = { x: 1, y: 0 };
    let snakeSegment: dir[] = [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
    ];

    const map: number[][] = [
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0,
      ],
    ];

    const updateSnake  = (snakeDirs: dir[], snakeDir: dir) => {
      // for (let i: number = 0; i < snakeDirs.length; i++) {
      // }
      let newPart: dir = {x: snakeDirs[0].x + snakeDir.x, y: snakeDirs[0].y + snakeDir.y};
      snakeDirs.pop();
      snakeDirs.unshift(newPart);
    };

    const detectKeyboard = (e: KeyboardEvent) => {
      let newSnakeDir: dir = snakeDir;
      switch (e.key) {
        case "ArrowUp":
          newSnakeDir.x = 0;
          newSnakeDir.y = -1;
          break;
        case "ArrowDown":
          newSnakeDir.x = 0;
          newSnakeDir.y = 1;
          break;
        case "ArrowLeft":
          newSnakeDir.x = -1;
          newSnakeDir.y = 0;
          break;
        case "ArrowRight":
          newSnakeDir.x = 1;
          newSnakeDir.y = 0;
          break;
        default:
          console.log("Invalid Keyboard Input");
          break;
      }
      snakeDir = newSnakeDir;
    };


    const renderMap = (mapMatrix: number[][]) => {
      for (let i: number = 0; i < mapMatrix.length; i++) {
        for (let j: number = 0; j < mapMatrix[0].length; j++) {
          const blockWidth = canvasWidth / mapMatrix[0].length;
          const blockHeight = canvasHeight / mapMatrix.length;
          const blockX = j * blockWidth;
          const blockY = i * blockHeight;

          let snakeBodyDetected: boolean = false;
          for (
            let snakeSeg: number = 0;
            snakeSeg < snakeSegment.length;
            snakeSeg++
          ) {
            if (i == snakeSegment[snakeSeg].y && j == snakeSegment[snakeSeg].x)
              snakeBodyDetected = true;
          }

          if (mapMatrix[i][j] == 0 && !snakeBodyDetected) {
            renderBlock(ctx, blockX, blockY, blockWidth, blockHeight, "red");
          } else if (mapMatrix[i][j] == 1 && !snakeBodyDetected) {
            renderBlock(ctx, blockX, blockY, blockWidth, blockHeight, "black");
          } else if (snakeBodyDetected) {
            renderBlock(ctx, blockX, blockY, blockWidth, blockHeight, "green");
          }
        }
      }
    };

    const run = (currentTime: number) => {
      const deltaTime: number = (currentTime - prevTime.current) / 1000;
      prevTime.current = currentTime;
      accumilator.current += deltaTime;
      window.addEventListener("keydown", (e: KeyboardEvent) => detectKeyboard(e));
      while (accumilator.current >= FIXED_TIMESTAMP) {
        console.log("run");
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        updateSnake(snakeSegment, snakeDir);
        renderMap(map);
        accumilator.current -= FIXED_TIMESTAMP;
      }
      animation = requestAnimationFrame(run);
    };

    requestAnimationFrame(run);

    return () => {
      window.removeEventListener("keydown", detectKeyboard);
      cancelAnimationFrame(animation);
    }
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
      {/* <ForwardRefExample2 /> */}
      <SnakeGame />
    </>
  );
}
