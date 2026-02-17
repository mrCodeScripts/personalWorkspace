"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <form role="search" className="w-full" onSubmit={(e) => e.preventDefault()}>

      <label htmlFor="pubmarket-search" className="sr-only">Search products</label>

      <div className="join w-full">

        <input
          id="pubmarket-search"
          name="q"
          type="search"
          inputMode="search"
          placeholder="Search in PubMarket..."
          className="input input-bordered join-item w-full input-sm"
          aria-label="Search products"
        />

        <button type="submit" className="btn btn-primary join-item btn-sm" aria-label="Search">
          <Search size={16} />
        </button>

      </div>

    </form>
  );
}
