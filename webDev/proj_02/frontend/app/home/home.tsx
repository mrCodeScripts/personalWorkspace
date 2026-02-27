"use client";

import { FilterIcon, HomeIcon, LibraryIcon, SearchIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePageComponent() {
  const items = [
    "Search shoes ",
    "Find gadgets ",
    "Look for clothes ",
    "Discover deals ",
    "Buy headphones ",
    "Order food ",
  ];

  // Duplicate list for infinite loop
  const loopItems = [...items, ...items];

  const ITEM_HEIGHT = 43;

  const [index, setIndex] = useState(0);
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const [noAnim, setNoAnim] = useState(false);

  /* Auto slide */
  useEffect(() => {
    if (focused || value) return;

    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 2500);

    return () => clearInterval(timer);
  }, [focused, value]);

  /* Reset silently when reaching end */
  useEffect(() => {
    if (index === items.length) {
      setTimeout(() => {
        setNoAnim(true);
        setIndex(0);
        requestAnimationFrame(() => {
          setNoAnim(false);
        });
      }, 500); // must match transition duration
    }
  }, [index, items.length]);

  return (
    <div className="flex flex-col w-full min-h-screen">

      {/* HEADER */}
      <div className="flex w-full fixed items-center bg-[#f43f5e] p-5 gap-3">
        {/* SEARCH */}
        <form className="relative flex w-full border-2 border-white rounded-sm overflow-hidden bg-white">
          {/* PLACEHOLDER SLIDER */}
          {!focused && !value && (
            <div className="absolute inset-0 pl-5 pr-12 pointer-events-none overflow-hidden">
              <div
                className={`${
                  noAnim ? "" : "transition-transform duration-500 ease-in-out"
                }`}
                style={{
                  transform: `translateY(-${index * ITEM_HEIGHT}px)`,
                }}
              >
                {loopItems.map((text, i) => (
                  <div
                    key={i}
                    className="h-11 flex items-center text-gray-400 text-sm"
                  >
                    {text}
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* INPUT */}
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full py-3 pl-5 pr-12 outline-none text-[#f43f5e] font-semibold"
          />
          {/* BUTTON */}
          <button
            type="submit"
            className="absolute right-0 top-0 h-full px-3 text-[#f43f5e]"
          >
            <SearchIcon size={20} />
          </button>
        </form>
        {/* FILTER */}
        <button
          type="button"
          className="px-3 text-white group"
        >
          <FilterIcon  className="group-hover:text-[#fbbf24]"/>
        </button>
      </div>

      {/* PRODUCTS */}
      <div className="w-full">

      </div>

      {/* BAR */}
      <div className="absolute flex bottom-0 translate-y-0 flex-row w-full p-10 bg-[#f43f5e] justify-center gap-10">
        <Link href="" className="text-[#f3f4f6] flex flex-col gap-2 items-center group">
          <HomeIcon className="w-8 h-8 group-hover:text-[#fbbf24]" />
          <span className="text-xs group-hover:text-[#fbbf24]">Home</span>
        </Link>
        <Link href="" className="text-[#f3f4f6] flex flex-col gap-2 items-center group">
          <UserIcon className="w-8 h-8 group-hover:text-[#fbbf24]" />
          <span className="text-xs group-hover:text-[#fbbf24]">Me</span>
        </Link>
        <Link href="" className="text-[#f3f4f6] flex flex-col gap-2 items-center group">
          <LibraryIcon className="w-8 h-8 group-hover:text-[#fbbf24]" />
          <span className="text-xs group-hover:text-[#fbbf24]">Favorites</span>
        </Link>
      </div>
    </div>
  );
}
