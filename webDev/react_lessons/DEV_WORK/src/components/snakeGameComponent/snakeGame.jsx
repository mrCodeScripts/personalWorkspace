import { useEffect, useRef, useState, useCallback } from "react";

class Snake {
  constructor () {

  }
}

function Game () {
  const canvasRef = useRef(null);
  const animate = useRef(true);
  const [gameSettings, setGameSettings] = useState({
    mapInfo: {
      map: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      blockInfo: {
        wall: { 
          color: '#000',
          stroke: 'red',
          strokeEnabled: true,
          thinWall: {
            width: 0.2,
            height: 1,
            color: 'red',
            stroke: 'white',
            strokeEnabled: true,
          }
        },
        floor: {
          color: '#FFF',
          strke: 'green',
          strokeEnabled: false,
        },
      },
      mapSizeInfo: {
        x: 500,
        y: 500,
      }
    }
  });

  const renderWall = useCallback((
    x, y, 
    width, height, 
    ctx, color, stroke,
    strokeEnabled
  ) => {
    ctx.beginPath();
    ctx.rect(x, y, width, height, ctx);
    ctx.fillStyle = color;
    ctx.strokeStyle = stroke;
    ctx.fill();
    if (strokeEnabled) ctx.stroke();
    ctx.closePath();
  }, []);

  const midBlockHalo = useCallback((blockX, blockY, blockSize, thinWallInfo, ctx) => {
    renderWall(
      (blockX + (thinWallInfo.width * blockSize.x)),
      (blockY + (thinWallInfo.width * blockSize.x)),
      blockSize.y - ((thinWallInfo.width * blockSize.y) * 2),
      blockSize.y - ((thinWallInfo.width * blockSize.y) * 2),
      ctx,
      thinWallInfo.color,
      thinWallInfo.stroke,
      thinWallInfo.strokeEnabled
    );
  }, []);

  const renderMainGameMap = useCallback((gameSettings, ctx) => {
    const mapYLen = gameSettings.mapInfo.map.length;
    const mapXLen = gameSettings.mapInfo.map[0].length;
    const blockSize = {
      x: gameSettings.mapInfo.mapSizeInfo.x / mapXLen,
      y: gameSettings.mapInfo.mapSizeInfo.y / mapYLen,
    };
    const blockInfo = gameSettings.mapInfo.blockInfo;
    const thinWallInfo = blockInfo.wall.thinWall;
    const map = gameSettings.mapInfo.map;
    for (let i = 0; i < mapYLen; i++) {
      for (let j = 0; j < mapXLen; j++) {
        const blockX = j * blockSize.x;
        const blockY = i * blockSize.y;
        ctx.beginPath();
        ctx.rect(
          blockX,
          blockY,
          blockSize.x, 
          blockSize.y
        );
        if (map[i][j] === 0) {
          ctx.fillStyle = blockInfo.wall.color;
          ctx.strokeStyle = blockInfo.wall.stroke;
          ctx.fill();
          if (blockInfo.wall.strokeEnabled) ctx.stroke();
          if ((i > 0 && i < map.length - 1) 
            && (j === 0 || j === map.length - 1)
          ) {
            midBlockHalo(blockX, blockY, blockSize, thinWallInfo, ctx);
            /*
            renderWall(
              (blockX + (thinWallInfo.width * blockSize.x)) - thinWallInfo.width * blockSize.x,
              blockY, 
              thinWallInfo.width * blockSize.x,
              thinWallInfo.height * blockSize.y,
              ctx,
              thinWallInfo.color,
              thinWallInfo.stroke,
              thinWallInfo.strokeEnabled
            );
            renderWall(
              blockX + blockSize.x - thinWallInfo.width * blockSize.x, 
              blockY, 
              thinWallInfo.width * blockSize.x,
              thinWallInfo.height * blockSize.y,
              ctx,
              thinWallInfo.color,
              thinWallInfo.stroke,
              thinWallInfo.strokeEnabled
            );
            */
          } else if (i == 0 && j == 0) {
            midBlockHalo(blockX, blockY, blockSize, thinWallInfo, ctx);
            /*
            renderWall(
              (blockX + (thinWallInfo.width * blockSize.x)) - thinWallInfo.width * blockSize.x,
              blockY, 
              thinWallInfo.width * blockSize.x,
              thinWallInfo.height * blockSize.y,
              ctx,
              thinWallInfo.color,
              thinWallInfo.stroke,
              thinWallInfo.strokeEnabled
            );
            renderWall(
              blockX + (thinWallInfo.width * blockSize.x),
              blockY, 
              blockSize.x,
              thinWallInfo.width * blockSize.y,
              ctx,
              thinWallInfo.color,
              thinWallInfo.stroke,
              thinWallInfo.strokeEnabled
            );
            */
          } else if (i === map.length - 1 && j === 0) {
            midBlockHalo(blockX, blockY, blockSize, thinWallInfo, ctx);
            /*
            renderWall(
              (blockX + (thinWallInfo.width * blockSize.x)) - thinWallInfo.width * blockSize.x,
              blockY, 
              thinWallInfo.width * blockSize.x,
              thinWallInfo.height * blockSize.y,
              ctx,
              thinWallInfo.color,
              thinWallInfo.stroke,
              thinWallInfo.strokeEnabled
            );
            renderWall(
              blockX + (thinWallInfo.width * blockSize.x),
              blockY + (blockSize.y - (thinWallInfo.width * blockSize.y)), 
              blockSize.x,
              thinWallInfo.width * blockSize.y,
              ctx,
              thinWallInfo.color,
              thinWallInfo.stroke,
              thinWallInfo.strokeEnabled
            );
            */
          } else if (i === 0 && j === map.length - 1) {
            midBlockHalo(blockX, blockY, blockSize, thinWallInfo, ctx);
            /*
            renderWall(
              blockX + blockSize.x - thinWallInfo.width * blockSize.x, 
              blockY, 
              thinWallInfo.width * blockSize.x,
              thinWallInfo.height * blockSize.y,
              ctx,
              thinWallInfo.color,
              thinWallInfo.stroke,
              thinWallInfo.strokeEnabled
            );
            renderWall(
              blockX,
              blockY, 
              blockSize.x - (thinWallInfo.width * blockSize.x),
              thinWallInfo.width * blockSize.y,
              ctx,
              thinWallInfo.color,
              thinWallInfo.stroke,
              thinWallInfo.strokeEnabled
            );
            */
          } else if (i === map.length - 1 && j === map.length - 1) {
            midBlockHalo(blockX, blockY, blockSize, thinWallInfo, ctx);
            /*
            renderWall(
              blockX + blockSize.x - thinWallInfo.width * blockSize.x, 
              blockY, 
              thinWallInfo.width * blockSize.x,
              thinWallInfo.height * blockSize.y,
              ctx,
              thinWallInfo.color,
              thinWallInfo.stroke,
              thinWallInfo.strokeEnabled
            );
            renderWall(
              blockX,
              blockY + (blockSize.y - (thinWallInfo.width * blockSize.y)), 
              blockSize.x - (thinWallInfo.width * blockSize.x),
              thinWallInfo.width * blockSize.y,
              ctx,
              thinWallInfo.color,
              thinWallInfo.stroke,
              thinWallInfo.strokeEnabled
            );
            */
          } else {
            midBlockHalo(blockX, blockY, blockSize, thinWallInfo, ctx);
            
            /*
            renderWall(
              blockX,
              blockY,
              blockSize.x,
              thinWallInfo.width * blockSize.y,
              ctx,
              thinWallInfo.color,
              thinWallInfo.stroke,
              thinWallInfo.strokeEnabled
            );
            renderWall(
              blockX,
              blockY + (blockSize.y - (thinWallInfo.width * blockSize.y)), 
              blockSize.x,
              thinWallInfo.width * blockSize.y,
              ctx,
              thinWallInfo.color,
              thinWallInfo.stroke,
              thinWallInfo.strokeEnabled
            );
            */
          }
        } else if (map[i][j] === 1) {
          ctx.fillStyle = blockInfo.floor.color;
          ctx.strokeStyle = blockInfo.floor.stroke;
          ctx.fill();
          if (blockInfo.floor.strokeEnabled) ctx.stroke();
        } else {
          continue;
        }
        ctx.closePath();
      }
    }
  }, []);

  const gameLoop = useCallback((gameSettings, ctx) => {
    ctx.clearRect(
      0, 
      0, 
      gameSettings.mapInfo.mapSizeInfo.x, 
      gameSettings.mapInfo.mapSizeInfo.y
    );
    renderMainGameMap(gameSettings, ctx);
    requestAnimationFrame((now) => {
      gameLoop(gameSettings, ctx)
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    const mapWidth = gameSettings.mapInfo.mapSizeInfo.x;
    const mapHeight = gameSettings.mapInfo.mapSizeInfo.y;

    canvas.width = mapWidth;
    canvas.height = mapHeight;

    const ctx = canvas.getContext("2d");

    const lastFrame = performance.now();

    gameLoop(gameSettings, ctx);
  }, [gameSettings]);

  return (
    <>
      <canvas ref={canvasRef} className="m-2"></canvas>
    </>
  ) 
}

export default function SnakeGame () {
  return (
    <>
      <Game />
    </>
  ) 
}