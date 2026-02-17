"use client";

import { useState } from "react";
import { products as sampleProducts } from "../../data/products";
import { Trash2, Plus } from "lucide-react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(sampleProducts);

  const removeProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addProduct = () => {
    const newId = products.length + 1;
    setProducts((prev) => [
      ...prev,
      {
        id: newId,
        name: `New Product ${newId}`,
        price: 100,
        image: "https://via.placeholder.com/300x200",
      },
    ]);
  };

  return (
    <div className="space-y-4">

      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">Products</h1>
        <button className="btn btn-primary btn-sm flex items-center gap-1" onClick={addProduct}>
          <Plus size={16} /> Add Product
        </button>
      </div>

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

            <button className="btn btn-ghost btn-sm" onClick={() => removeProduct(p.id)}>
              <Trash2 size={16} className="text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
