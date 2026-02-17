"use client";

import { useState } from "react";
import { products as sampleProducts } from "../../data/products";
import { Trash2, Edit } from "lucide-react";

export default function SellerProducts() {
  const [products, setProducts] = useState(sampleProducts);

  const removeProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-4">

      <h1 className="text-lg font-bold">My Products</h1>

      <div className="space-y-2">
        {products.map((p) => (
          <div key={p.id} className="flex items-center justify-between p-2 bg-base-100 shadow-sm rounded-md">
            <div className="flex items-center gap-3">
              <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-md" />
              <div>
                <p className="font-medium text-sm">{p.name}</p>
                <p className="text-primary text-sm">₱{p.price}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="btn btn-ghost btn-sm">
                <Edit size={16} />
              </button>
              <button className="btn btn-ghost btn-sm" onClick={() => removeProduct(p.id)}>
                <Trash2 size={16} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
