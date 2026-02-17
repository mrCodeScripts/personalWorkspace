"use client";

import { useState } from "react";
import { Trash2, Plus } from "lucide-react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Juan Dela Cruz", email: "juan@email.com" },
    { id: 2, name: "Maria Santos", email: "maria@email.com" },
  ]);

  const removeUser = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const addUser = () => {
    const newId = users.length + 1;
    setUsers((prev) => [
      ...prev,
      { id: newId, name: `New User ${newId}`, email: `user${newId}@email.com` },
    ]);
  };

  return (
    <div className="space-y-4">

      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">Users</h1>
        <button className="btn btn-primary btn-sm flex items-center gap-1" onClick={addUser}>
          <Plus size={16} /> Add User
        </button>
      </div>

      <div className="space-y-2">
        {users.map((u) => (
          <div key={u.id} className="flex items-center justify-between p-2 bg-base-100 shadow-sm rounded-md">
            <div>
              <p className="font-medium text-sm">{u.name}</p>
              <p className="text-gray-500 text-xs">{u.email}</p>
            </div>

            <button className="btn btn-ghost btn-sm" onClick={() => removeUser(u.id)}>
              <Trash2 size={16} className="text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
