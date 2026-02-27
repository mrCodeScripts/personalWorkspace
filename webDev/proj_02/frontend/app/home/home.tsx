"use client";

import {
  BellIcon,
  FilterIcon,
  HomeIcon,
  SearchIcon,
  ShoppingCart,
  UserIcon,
  VideoIcon,
} from "lucide-react";
import Link from "next/link";
import Product1 from "./../../public/assets/sampleProducts/product_1.png";
import { useEffect, useState } from "react";
import ProductCard from "./home_comp/product/product_card_v1";
import type { StaticImageData } from "next/image";  // for product typing

export default function HomePageComponent() {
  const items = [
    "Search shoes",
    "Find gadgets",
    "Look for clothes",
    "Discover deals",
    "Buy headphones",
    "Order food",
  ];

  interface Product {
    id: number;
    name: string;
    rating: number;
    price: number;
    image: string;
  }

  const products: Product[] = [
    {
      id: 1,
      name: "Portable Speaker",
      price: 49.99,
      rating: 4,
      image: "product_1.png",
    },
    {
      id: 2,
      name: "Stylish Sunglasses",
      price: 29.99,
      rating: 4,
      image: "product_2.png",
    },
    {
      id: 3,
      name: "Wireless Earbuds",
      rating: 4,
      price: 79.99,
      image: "product_3.png",
    },
    {
      id: 4,
      name: "Classic Watch",
      rating: 4,
      price: 129.99,
      image: "product_4.png",
    },
    {
      id: 5,
      name: "Leather Wallet",
      price: 39.99,
      rating: 4,
      image: "product_5.png",
    },
    {
      id: 6,
      name: "Running Sneakers",
      rating: 4,
      price: 89.99,
      image: "product_6.png",
    },
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
      <div className="flex w-full fixed items-center bg-[#f43f5e] p-5 pb-3! gap-3 z-9">
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
        {/* CART & MESSAGES */}
        <div className="flex flex-row justify-center gap-2">
          <Link href="#" className="p-2 text-white group">
            <FilterIcon
              className="group-hover:text-[#fbbf24] w-6 h-6 group-focus:text-[#fbbf24]"
              strokeWidth={3}
            />
          </Link>
          <Link href="#" className="p-2 text-white group">
            <ShoppingCart
              className="group-hover:text-[#fbbf24] w-6 h-6 group-hover:fill-[#fbbf24] group-focus:text-[#fbbf24] group-focus:fill-[#fbbf24] "
              strokeWidth={3}
              fill="#ffffff"
            />
          </Link>
        </div>
      </div>

      {/* PRODUCTS */}
      <section className="w-full py-12 bg-base-200">
        <div className="max-w-310 mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">
            Featured Products
          </h2>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* BAR */}
      <div className="fixed flex bottom-0 translate-y-0 flex-row w-full px-10 py-8 bg-[#f43f5e] justify-center gap-11">
        <Link
          href="#"
          className="text-[#f3f4f6] flex flex-col gap-2 items-center group"
        >
          <HomeIcon
            className="w-7 h-7 group-hover:text-[#fbbf24] group-focus:text-[#fbbf24]"
            strokeWidth={3}
          />
          <span className="text-xs group-hover:text-[#fbbf24] group-focus:text-[#fbbf24]">
            Home
          </span>
        </Link>
        <Link
          href="#"
          className="text-[#f3f4f6] flex flex-col gap-2 items-center group"
        >
          <UserIcon
            className="w-7 h-7 group-hover:text-[#fbbf24] group-focus:text-[#fbbf24]"
            strokeWidth={3}
          />
          <span className="text-xs group-hover:text-[#fbbf24] group-focus:text-[#fbbf24]">
            Me
          </span>
        </Link>
        <Link
          href="#"
          className="text-[#f3f4f6] flex flex-col gap-2 items-center group"
        >
          <VideoIcon
            className="w-7 h-7 group-hover:text-[#fbbf24] group-focus:text-[#fbbf24]"
            strokeWidth={3}
          />
          <span className="text-xs group-hover:text-[#fbbf24] group-focus:text-[#fbbf24]">
            Live
          </span>
        </Link>
        <Link
          href="#"
          className="text-[#f3f4f6] flex flex-col gap-2 items-center group"
        >
          <BellIcon
            className="w-7 h-7 group-hover:text-[#fbbf24] group-focus:text-[#fbbf24]"
            strokeWidth={3}
          />
          <span className="text-xs group-hover:text-[#fbbf24] group-focus:text-[#fbbf24]">
            Notifications
          </span>
        </Link>
      </div>
    </div>
  );
}
