"use client";

import { useState } from "react";
import { products as sampleProducts } from "../../data/products";

export default function AddProductPage() {
  const [products, setProducts] = useState(sampleProducts);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = {
      id: products.length + 1,
      name,
      price: Number(price),
      image: image || "https://via.placeholder.com/300x200",
    };

    setProducts((prev) => [...prev, newProduct]);
    alert("Product added!");
    setName(""); setPrice(""); setImage("");
  };

  return (
    <div className="space-y-4">

      <h1 className="text-lg font-bold">Add Product</h1>

      <form className="space-y-3" onSubmit={handleAdd}>

        <input
          type="text"
          placeholder="Product Name"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="input input-bordered w-full"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Image URL (optional)"
          className="input input-bordered w-full"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button type="submit" className="btn btn-primary w-full rounded-full">
          Add Product
        </button>
      </form>

      <div className="text-sm text-gray-500">
        Total Products: {products.length}
      </div>
    </div>
  );
}
