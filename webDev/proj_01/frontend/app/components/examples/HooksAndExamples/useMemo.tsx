"use client";
import React, { memo, useCallback, useEffect, useId, useMemo, useState } from "react";

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
  // --------------------------
  // 1️⃣ Type
  // --------------------------
  type Product = {
    name: string;
    price: number;
  };

  // --------------------------
  // 2️⃣ State
  // --------------------------
  const [filterPrice, setFilterPrice] = useState<number>(1000);

  // --------------------------
  // 3️⃣ Data
  // --------------------------
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

  // --------------------------
  // 4️⃣ Memoized Filtered Products
  // --------------------------
  const FilteredProducts = useMemo(() => {
    return ExistingProducts.filter((p) => p.price <= filterPrice);
  }, [filterPrice]);

  // --------------------------
  // 5️⃣ Child Components
  // --------------------------
  const FilteredProductsDisplay = React.memo(
    ({ products }: { products: Product[] }) => {
      return (
        <ul>
          {products.map((e, i) => (
            <li key={i}>
              {`{e.name} -> ${e.price}`}
            </li>
          ))}
        </ul>
      );
    }
  );

  const InputFilterer = React.memo(
    ({ inputAction }: { inputAction: (val: number) => void }) => {
      const input_id = useId();

      const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        inputAction(Number(e.currentTarget.value));
      };

      return (
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor={`inpt_${input_id}`}>Max Price: </label>
          <input
            type="number"
            id={`inpt_${input_id}`}
            style={{ padding: "5px", borderRadius: "5px", width: "100px" }}
            onChange={handleInput}
            placeholder="Enter price"
          />
        </div>
      );
    }
  );

  // --------------------------
  // 6️⃣ Render
  // --------------------------
  return (
    <div style={{ padding: "10px", display: "flex", flexDirection: "column" }}>
      <InputFilterer inputAction={setFilterPrice} />
      <FilteredProductsDisplay products={FilteredProducts} />
    </div>
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
