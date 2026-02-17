export default function PublicMarket2Home() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Welcome to PubMarket2</h1>
      <p className="text-gray-600">Your modern online marketplace for everything.</p>

      {/* Featured Section */}
      <div className="bg-base-100 p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Featured Products</h2>
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-base-200 p-3 rounded-lg text-center">
              <div className="h-32 bg-base-300 rounded mb-2 flex items-center justify-center">
                📦
              </div>
              <p className="text-sm font-medium">Product {i + 1}</p>
              <p className="text-xs text-gray-500">₱{(i + 1) * 100}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
