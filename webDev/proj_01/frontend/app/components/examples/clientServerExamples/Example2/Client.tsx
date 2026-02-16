"use client";

import { useActionState, useCallback, useState } from "react";

export default function ClientLayout() {
  type USER = {
    name: string;
    age: number;
  };

  const Fetch = async () => {
    try {
      const res = await fetch("http://localhost:3001/shit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "shti", age: 19 }),
      });
      const data = await res.json();
      console.log(data.message);
    } catch (err) {
      console.log(err);
    }
  };

  const [users, newUsers] = useState<USER[]>([]);

  // const ServerConnection = useCallback(async () => {

  // }, []);
  Fetch();

  const [formState, formAction, isPending] = useActionState<USER, FormData>(
    async (prev, formData) => {
      const name: string = String(formData.get("username"));
      const age: number = Number(formData.get("age"));
      const user: USER = { name: name, age: age };
      try {
        const data = await fetch("http://localhost:3001/route_ex_1", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });

        if (!data.ok || data.status !== 200) {
          throw new Error(
            `Connection error: ${data.status} ${data.statusText}`,
          );
        }

        const res = await data.json();
        console.log(`STATUS: ${res.status}, MSG: ${res.message}`);
      } catch (err) {
        console.log(`ERROR: ${err}`);
      }
      return { name: name, age: age };
    },
    { name: "", age: 0 },
    "/someData",
  );

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
      </div>
    </>
  );
}
