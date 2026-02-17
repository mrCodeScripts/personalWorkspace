"use client";

import { Apple, Fish, Beef, ShoppingBag, Smartphone, Shirt } from "lucide-react";

const categories = [
  { name: "Fruits", icon: Apple },
  { name: "Seafood", icon: Fish },
  { name: "Meat", icon: Beef },
  { name: "Grocery", icon: ShoppingBag },
  { name: "Gadgets", icon: Smartphone },
  { name: "Clothes", icon: Shirt },
];

export default function CategorySlider() {
  return (
    <div className="overflow-x-auto py-2">

      <div className="flex gap-3 px-1">

        {categories.map((cat) => {
          const Icon = cat.icon;

          return (
            <button
              key={cat.name}
              className="flex flex-col items-center justify-center min-w-[70px] p-2 rounded-lg bg-base-200 hover:bg-base-300"
            >
              <Icon size={20} className="text-primary" />

              <span className="text-xs mt-1">
                {cat.name}
              </span>
            </button>
          );
        })}

      </div>

    </div>
  );
}
