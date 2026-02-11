"use client";
import React, {
  memo,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";

function UseMemoExample1() {
  const [state, newState] = useState<number>(0);
  const [data, setNewData] = useState<number>(0);

  const someExpensiveCalc: number = useMemo(() => {
    // if state changes, it will recalculate and execute this block.
    console.log("Re-execute this block for SOME EXPENSIVE CALCULATION.");
    return state * 3;
  }, [state]);

  return (
    <>
      <p style={{ color: "green", padding: "10px" }}>
        {someExpensiveCalc}
        <button type="button" onClick={() => newState((prev) => prev + 1)}>
          Increment
        </button>
      </p>
    </>
  );
}

function UseMemoExample2() {
  type Product = { name: string; price: number };
  const [filterPrice, newFilterPrice] = useState<string>("1000");
  const ExistingProducts: Product[] = [
    { name: "Fish", price: 200 },
    { name: "Chicken Breast", price: 180 },
    { name: "Pork Belly", price: 320 },
    { name: "Beef Steak", price: 450 },
    { name: "Shrimp", price: 280 },
    { name: "Crab", price: 500 },
    { name: "Eggs (Dozen)", price: 160 },
    { name: "Rice (5kg)", price: 350 },
    { name: "Milk", price: 90 },
    { name: "Bread", price: 65 },
    { name: "Cheese", price: 120 },
    { name: "Butter", price: 140 },
    { name: "Apples (1kg)", price: 150 },
    { name: "Bananas (1kg)", price: 70 },
    { name: "Oranges (1kg)", price: 130 },
    { name: "Tomatoes (1kg)", price: 90 },
    { name: "Onions (1kg)", price: 85 },
    { name: "Garlic (250g)", price: 60 },
  ];

  const ExpensiveProductCalc = useMemo(() => {
    const price = Number(filterPrice);
    const products = ExistingProducts;
    const filteredProducts = price > 0 ? products.filter(e => e.price <= price) : products;
    return filteredProducts;
  }, [filterPrice]);
  
  const ProductListComponent = React.memo((props: {products: Product[]}) => {
    return (
      <ul style={{color: "red"}}>
        {props.products.map((e, i) => <li key={i}>{e.name} ${e.price}</li>)}
      </ul>
    );
  });

  return (
    <>
      <input type="number" value={Number(filterPrice)} onInput={(e: React.InputEvent<HTMLInputElement>) => newFilterPrice(e.currentTarget.value)} />
      <ProductListComponent products={ExpensiveProductCalc} />
    </>
  );
}

export default function UseMemoExamples() {
  return (
    <>
      {/* <UseMemoExample1 /> */}
      <UseMemoExample2 />
    </>
  );
}
