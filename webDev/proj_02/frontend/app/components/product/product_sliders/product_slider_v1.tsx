'use client';
import { ChevronLeft, ChevronRight, Percent } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

type ImageSliderProps = {
  images: string[];
  discount: number;
};

export default function ImageSliderV1({ images, discount }: ImageSliderProps) {
  const [index, setIndex] = useState<number>(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  const length = images.length;


  /* ================= AUTO SLIDE ================= */
  useEffect(() => {
    startAuto();

    return stopAuto;
  }, [index]);


  const startAuto = (): void => {
    stopAuto();

    intervalRef.current = setInterval(() => {
      next();
    }, 4000);
  };


  const stopAuto = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };


  /* ================= CONTROLS ================= */

  const next = (): void => {
    setIndex((prev) => (prev + 1) % length);
  };

  const prev = (): void => {
    setIndex((prev) => (prev - 1 + length) % length);
  };


  /* ================= SWIPE ================= */

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>): void => {
    const endX = e.changedTouches[0].clientX;

    handleSwipe(endX);
  };


  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!isDragging.current) return;

    isDragging.current = false;

    handleSwipe(e.clientX);
  };


  const handleSwipe = (endX: number): void => {
    const diff = startX.current - endX;

    if (diff > 50) next();
    if (diff < -50) prev();
  };


  /* ================= RENDER ================= */

  return (
    <div
      className="relative w-full h-56 bg-base-300 overflow-hidden select-none"

      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}

      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={() => (isDragging.current = false)}
    >

      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-3 right-3 z-20 bg-[#1f2937] px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg text-[#fbbf24] animate-bounce">

          <Percent size={14} strokeWidth={3} />

          <span className="text-xs font-bold">
            {discount}% OFF
          </span>
        </div>
      )}


      {/* Images */}
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{
          transform: `translateX(-${index * 100}%)`,
        }}
      >
        {images.map((src: string, i: number) => (
          <div
            key={i}
                className="relative min-w-full h-full flex items-center justify-center"
          >
            <Image
              src={`/assets/sampleProducts/${src}`}
              alt={`product-${i}`}
              fill
              className="object-contain p-4"
            />
          </div>
        ))}
      </div>


      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1.5 rounded-full hover:bg-black/60 transition"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1.5 rounded-full hover:bg-black/60 transition"
      >
        <ChevronRight size={20} />
      </button>


      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">

        {images.map((_: string, i: number) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === index
                ? "bg-primary scale-125"
                : "bg-gray-400"
            }`}
          />
        ))}

      </div>

    </div>
  );
}