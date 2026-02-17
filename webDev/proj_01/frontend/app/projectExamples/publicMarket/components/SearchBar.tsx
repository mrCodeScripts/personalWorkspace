"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="w-full">

      <div className="join w-full">

        <input
          type="text"
          placeholder="Search in PubMarket..."
          className="input input-bordered join-item w-full input-sm"
        />

        <button className="btn btn-primary join-item btn-sm">
          <Search size={16} />
        </button>

      </div>

    </div>
  );
}
