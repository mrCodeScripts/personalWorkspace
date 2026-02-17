"use client";

export default function SellerDashboard() {
  // Fake data
  const stats = [
    { name: "Total Products", value: 12 },
    { name: "Total Orders", value: 34 },
    { name: "Pending Orders", value: 5 },
  ];

  return (
    <div className="space-y-4">

      <h1 className="text-lg font-bold">Seller Dashboard</h1>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.name} className="card bg-base-100 p-4 shadow-sm rounded-lg text-center">
            <p className="text-gray-500 text-xs">{s.name}</p>
            <p className="text-xl font-bold text-primary">{s.value}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
