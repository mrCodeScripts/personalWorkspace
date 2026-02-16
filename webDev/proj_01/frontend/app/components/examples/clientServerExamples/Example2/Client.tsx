"use client";

import { useActionState, useCallback, useEffect, useState } from "react";

export default function ClientLayout() {
  type USER = {
    name: string;
    age: number;
  };
  const [users, newUsers] = useState<USER[]>([]);
  const [isPendingState, newPendingState] = useState<boolean>(false);
  type User = { name: string; age: number };
  const [formState, formAction, isPending] = useActionState<USER, FormData>(
    async (prev, formData) => {
      try {
        const name: string = String(formData.get("username"));
        const age: number = Number(formData.get("age"));
        const payload: User = { name: name, age: age };
        const req = await fetch("http://localhost:3001/route_ex_1", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await req.json();
        newUsers((prev) => data.users);
        if (req.ok) console.log(`MESSAGE FROM SERVER: ${data.message}`);
      } catch (err) {
        console.log(err);
      }
      return prev;
    },
    { name: "", age: 0 },
    "/someData",
  );

  const UserEarlyFetch = async () => {
    newPendingState(true);
    try {
      const req = await fetch("http://localhost:3001/fetch_users", { method: "POST", headers: { "Content-Type": "application/json" }});
      const data = await req.json();
      newUsers((prev) => data.users);
      if (req.ok) {
        console.log(`FINISHED FETCH SETUP USERS -> MESSAGE FROM SERVER: ${data.message}`);
      }
    } catch (err) {
      console.log(err);
    } finally {
      newPendingState(false);
    }
  };

  useEffect(() => {UserEarlyFetch()}, []);

  const [currentUserTarget, setCurrentUserTarget] = useState<number | null>(null);
  const 

  let UserComponents;
  if (isPending || isPendingState) {
    UserComponents = <p style={{ color: "green" }}>Loading Users...</p>;
  } else if (users.length <= 0 && !isPendingState) {
    UserComponents = <p style={{ color: "red" }}>No Users...</p>;
  } else {
    UserComponents = (
      <ul
        style={{ border: "none", maxWidth: "700px", display: "flex", flexDirection: "column", gap: "10px", color: "blue" }}
      >
        {users.map((e, i) => (
          currentUserTarget != i ? (
          <li key={i} style={{display: "flex", flexDirection: "row"}}>
            <span>
              Name: {e.name}, 
            </span>
            <span>
              Age: {e.age}
            </span>
            <button style={{marginLeft: "auto"}} type="button">
              Edit
            </button>
          </li>) : (
          <li key={i} style={{display: "flex", flexDirection: "row"}}>
            <input type="text" name="username" id="" placeholder="Username" value={}/>
            <span>
              Name: {e.name}, 
            </span>
            <span>
              Age: {e.age}
            </span>
            <button style={{marginLeft: "auto"}} type="button">
              Edit
            </button>
          </li>
          )
        ))}
      </ul>
    );
  }

  return (
    <>
      <div>
        <form action={formAction}>
          <input
            type="text"
            disabled={isPending}
            name="username"
            placeholder="Enter your name"
          />
          <input
            type="number"
            disabled={isPending}
            name="age"
            placeholder="Enter your age"
          />
          <button type="submit" disabled={isPending}>
            Submit Form
          </button>
        </form>
        {UserComponents}
      </div>
    </>
  );
}
