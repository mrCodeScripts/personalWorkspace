// Users.js
import React from "react";

const users = [
  "Alice Johnson",
  "Bob Smith",
  "Carol Davis",
  "David Wilson",
  "Eva Brown",
  "Frank Miller",
  "Grace Lee",
  "Henry Taylor",
  "Isla Anderson",
  "Jack Thomas",
  "Karen Martin",
  "Liam Harris",
  "Mia Clark",
  "Noah Lewis",
  "Olivia Walker",
  "Paul Hall",
  "Quinn Young",
  "Ruby King",
  "Sam Wright",
  "Tina Scott"
];

export default function Users() {
  return (
    <div>
      {users.map((v, i) => (
        <p key={i}>
          {i}. {v}
        </p>
      ))}
    </div>
  );
}
