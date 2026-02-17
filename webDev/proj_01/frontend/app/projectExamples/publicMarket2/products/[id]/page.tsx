"use client";

import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);

  return (
    <div className="space-y-4 pb-24">
      <div className="bg-base-100 p-4 rounded-lg">
        <div className="bg-base-200 h-64 rounded flex items-center justify-center text-4xl mb-4">
          📦
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Product {productId}</h1>
        <p className="text-primary font-bold text-lg mb-3">₱{productId * 150}</p>
        <p className="text-gray-600 mb-4">
          This is a great product with excellent quality and features. Perfect for your needs!
        </p>

        <div className="flex gap-2">
          <input
            type="number"
            defaultValue="1"
            min="1"
            className="input input-bordered input-sm w-20"
          />
          <button className="btn btn-primary flex-1">Add to Cart</button>
        </div>
      </div>

      <div className="bg-base-100 p-4 rounded-lg">
        <h2 className="font-semibold mb-2">Specifications</h2>
        <ul className="text-sm space-y-1 text-gray-600">
          <li>• High quality materials</li>
          <li>• Fast shipping</li>
          <li>• Money back guarantee</li>
          <li>• In stock</li>
        </ul>
      </div>
    </div>
  );
}
