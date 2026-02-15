"use client";

import React, {memo, useState} from "react";

interface User {
  name: string;
  age: number;
  location: string;
}

interface UserListProps {
  users: User[];
  onUpdate: (index: number, updated: User) => void;
}

const UserListComponent = memo(({ users, onUpdate }: UserListProps) => {
  // Track which row is being edited
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Partial<User>>({});

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setEditValues(users[index]); // populate inputs with current values
  };

  const handleInputChange = (field: keyof User, value: string | number) => {
    setEditValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirm = () => {
    if (editingIndex !== null) {
      onUpdate(editingIndex, editValues as User);
      setEditingIndex(null);
      setEditValues({});
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditValues({});
  };

  return (
    <ul
      style={{
        maxWidth: "500px",
        minWidth: "300px",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
      }}
    >
      {users.length > 0 ? (
        users.map((user, i) => (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {editingIndex === i ? (
              <>
                <input
                  value={editValues.name ?? ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
                <input
                  type="number"
                  value={editValues.age ?? ""}
                  onChange={(e) => handleInputChange("age", Number(e.target.value))}
                />
                <input
                  value={editValues.location ?? ""}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                />
                <button onClick={handleConfirm}>✅</button>
                <button onClick={handleCancel}>❌</button>
              </>
            ) : (
              <>
                <span style={{ color: "green" }}>
                  Name: {user.name}, Age: {isNaN(Number(user.age)) ? "No Age" : user.age}, Location: {user.location}
                </span>
                <button onClick={() => handleEditClick(i)}>Update</button>
              </>
            )}
          </li>
        ))
      ) : (
        <p style={{ color: "red" }}>No Users</p>
      )}
    </ul>
  );
});

export default function UserDataChangingComponent() {
  const [users, setUsers] = useState<User[]>([
    { name: "Alice", age: 25, location: "Earth" },
    { name: "Bob", age: 30, location: "Mars" },
  ]);

  const handleUpdate = (index: number, updated: User) => {
    setUsers((prev) => {
      const copy = [...prev];
      copy[index] = updated;
      return copy;
    });
  };

  return <UserListComponent users={users} onUpdate={handleUpdate} />;
}
