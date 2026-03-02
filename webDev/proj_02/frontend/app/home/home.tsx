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
import ProductCard from "../components/product/product_cards/product_card_v1";
import type { StaticImageData } from "next/image"; // for product typing
import ProductCardV1 from "../components/product/product_cards/product_card_v1";
import ProductCardV2 from "../components/product/product_cards/product_card_v2";
import ProductCardV3 from "../components/product/product_cards/product_card_v3";
import ProductPageV1 from "@/components/product/product_pages/product_page_v1";
import ProductCategoryBarV1 from "@/components/product/product_category_bars/product_vategory_bar_v1";
import PubMarketLogo from "../../public/assets/PubMarket_noBG.png";
import Image from "next/image";
import ProductPageV2 from "@/components/product/product_pages/product_page_v2";

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
    // image: string;
    rating: number;
    price: number;
    originalPrice: number;
    discount: number;
    imageFolder?: string;
    images: string[];
  }

  const products: Product[] = [
    {
      id: 1,
      name: "Portable Speaker",
      price: 49.99,
      rating: 4,
      // image: "product_3.png",
      originalPrice: 300,
      discount: 30,
      imageFolder: "/assets/sampleProducts/",
      images: [
        "product_5.png",
        "product_2.png",
        "product_3.png",
        "product_5.png",
        "product_1.png",
        "product_3.png",
        "product_4.png",
        "product_6.png",
        "product_3.png",
        "product_1.png",
      ],
    },
    {
      id: 2,
      name: "Stylish Sunglasses",
      price: 29.99,
      rating: 4,
      images: [
        "product_5.png",
        "product_2.png",
        "product_3.png",
        "product_5.png",
        "product_1.png",
        "product_3.png",
        "product_4.png",
        "product_6.png",
        "product_3.png",
        "product_1.png",
      ],
      originalPrice: 300,
      discount: 30,
    },
    {
      id: 3,
      images: [
        "product_5.png",
        "product_2.png",
        "product_3.png",
        "product_5.png",
        "product_1.png",
        "product_3.png",
        "product_4.png",
        "product_6.png",
        "product_3.png",
        "product_1.png",
      ],
      name: "Wireless Earbuds",
      rating: 4,
      price: 79.99,
      originalPrice: 300,
      discount: 30,
    },
    {
      id: 4,
      name: "Classic Watch",
      rating: 4,
      price: 129.99,
      images: [
        "product_5.png",
        "product_2.png",
        "product_3.png",
        "product_5.png",
        "product_1.png",
        "product_3.png",
        "product_4.png",
        "product_6.png",
        "product_3.png",
        "product_1.png",
      ],
      originalPrice: 300,
      discount: 30,
    },
    {
      id: 5,
      name: "Leather Wallet",
      price: 39.99,
      images: [
        "product_5.png",
        "product_2.png",
        "product_3.png",
        "product_5.png",
        "product_1.png",
        "product_3.png",
        "product_4.png",
        "product_6.png",
        "product_3.png",
        "product_1.png",
      ],
      rating: 4,
      originalPrice: 300,
      discount: 30,
    },
    {
      id: 6,
      name: "Running Sneakers",
      rating: 4,
      images: [
        "product_5.png",
        "product_2.png",
        "product_3.png",
        "product_5.png",
        "product_1.png",
        "product_3.png",
        "product_4.png",
        "product_6.png",
        "product_3.png",
        "product_1.png",
      ],
      price: 89.99,
      originalPrice: 300,
      discount: 30,
    },
  ];

  const productCategories: { name: string; logo: string }[] = [
    { name: "Fresh Fish", logo: "fish_logo_nobg.png" },
    { name: "Seafood", logo: "oyster_logo_nobg.png" },
    { name: "Meat & Poultry", logo: "meat_logo_nobg.png" },
    { name: "Vegetables", logo: "vegetable_logo_nobg.png" },
    { name: "Fruits", logo: "fruits_logo_nobg.png" },
    { name: "Rice & Grains", logo: "rice_logo_nobg.png" },
    { name: "Spices & Condiments", logo: "spices_logo_nobg.png" },
    { name: "Frozen Foods", logo: "hotdogs_logo_nobg.png" },
    { name: "Street Food", logo: "burger_logo_nobg.png" },
    { name: "Snacks", logo: "frenchFries_logo_nobg.png" },
    { name: "Beverages", logo: "beer_logo_nobg.png" },
    { name: "Bakery", logo: "bread_logo_nobg.png" },
    { name: "Dairy & Eggs", logo: "milkAndEggs_logo_nobg.png" },
    { name: "Organic Goods", logo: "organicGoods_logo_nobg.png" },
    { name: "Kitchen Supplies", logo: "utensil_logo_nobg.png" },
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
      <div className="flex w-full fixed items-center bg-[#f43f5e] p-2 pb-3! gap-3 z-25">
        {/* SEARCH */}
        <form className="relative flex w-full border-2 border-white rounded-sm overflow-hidden bg-white flex-row! pl-2">
          {/* PLACEHOLDER SLIDER */}
          {!focused && !value && (
            <div className="absolute inset-0 pl-5 pr-12 pointer-events-none overflow-hidden translate-x-15">
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
          {/* <div className="relative w-10 h-10">
            <Image
              src={PubMarketLogo}
              alt="PubMarket Logo"
              fill
              className="object-contain scale-200"
            />
          </div> */}
          <div className="relative w-20 h-12 overflow-hidden">
            <Image
              src={PubMarketLogo}
              alt="PubMarket Logo"
              fill
              className="object-contain scale-200 object-[50%_60%]"
            />
          </div>
          <input
            type="text"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
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
      <div className="flex flex-col w-full h-full pt-20 pb-30 bg-[#f43f5e] gap-3">
        <div className="w-full h-auto bg-[#f3f4f6] p-5 rounded-none">
          <ProductCategoryBarV1
            productCategories={productCategories}
            sectionTitle="Categories"
          />
        </div>
        <div className="w-full h-auto bg-[#f3f4f6] p-3 py-10 rounded-none">
          <ProductPageV1 products={products} pageTitle="Featured products" />
        </div>
        <div className="w-full h-auto bg-[#f3f4f6] p-3 py-10! rounded-none">
          <ProductPageV2 products={products} pageTitle="For you products" />
        </div>
        <ProductPageV1 products={products} />
      </div>







      {/* BAR */}
      <div className="fixed flex bottom-0 translate-y-0 flex-row w-full px-10 py-8 bg-[#f43f5e] justify-center gap-11 z-25">
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
