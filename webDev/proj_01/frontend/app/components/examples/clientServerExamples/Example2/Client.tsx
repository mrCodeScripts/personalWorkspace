"use client";

import { Patrick_Hand } from "next/font/google";
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
      const req = await fetch("http://localhost:3001/fetch_users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await req.json();
      newUsers((prev) => data.users);
      if (req.ok) {
        console.log(
          `FINISHED FETCH SETUP USERS -> MESSAGE FROM SERVER: ${data.message}`,
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      newPendingState(false);
    }
  };

  useEffect(() => {
    UserEarlyFetch();
  }, []);

  const [currentUserTarget, setCurrentUserTarget] = useState<number | null>(
    null,
  );
  const [currentEditedUser, setCurrentEditedUser] = useState<USER>({
    name: "",
    age: 0,
  });

  const handleCancelEdit = () => {
    setCurrentEditedUser({ name: "", age: 0 });
    setCurrentUserTarget(null);
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    property: keyof User,
  ) => {
    setCurrentEditedUser((prev) => ({ ...prev, [property]: e.target.value }));
  };

  const [updateUserState, updateUserFormAction, userUpdateIsPending] =
    useActionState<USER, FormData>(
      async (prev, formData) => {
        try {
          const name: string = String(formData.get("username"));
          const age: number = Number(formData.get("age"));
          const userIndex: number = Number(currentUserTarget);
          const payload: { name: string; age: number; userIndex: number } = {
            name: name,
            age: age,
            userIndex: userIndex,
          };
          const req = await fetch("http://localhost:3001/updateUser", {
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
      "/alsdkfjlsakdfjd",
    );

  let UserComponents;
  if (isPending || isPendingState) {
    UserComponents = <p style={{ color: "green" }}>Loading Users...</p>;
  } else if (users.length <= 0 && !isPendingState) {
    UserComponents = <p style={{ color: "red" }}>No Users...</p>;
  } else {
    UserComponents = (
      <ul
        style={{
          border: "none",
          maxWidth: "700px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          color: "blue",
        }}
      >
        {users.map((e, i) =>
          currentUserTarget != i ? (
            <li key={i} style={{ display: "flex", flexDirection: "row" }}>
              <span>Name: {e.name},</span>
              <span>Age: {e.age}</span>
              <button
                style={{ marginLeft: "auto", backgroundColor: "blue", color: "#FFFFFF", userSelect: "none" }}
                type="button"
                onClick={() => {
                  setCurrentUserTarget(i);
                  setCurrentEditedUser({ name: e.name, age: e.age });
                }}
              >
                Edit
              </button>
            </li>
          ) : (
            <form
              key={i}
              style={{ display: "flex", flexDirection: "row" }}
              action={updateUserFormAction}
            >
              <input
                disabled={userUpdateIsPending}
                type="text"
                name="username"
                id=""
                placeholder="Enter username"
                value={currentEditedUser!.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOnChange(e, "name")
                }
              />
              <input
                disabled={userUpdateIsPending}
                type="number"
                name="age"
                id=""
                placeholder="Enter age"
                value={currentEditedUser!.age}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOnChange(e, "age")
                }
              />
              <button
                style={{
                  marginLeft: "auto",
                  background: "green",
                  color: "#FFFFFF",
                  userSelect: "none"
                }}
                type="submit"
                disabled={userUpdateIsPending}
              >
                Confirm
              </button>
              <button
                type="button"
                style={{
                  background: "red",
                  color: "#FFFFFF",
                  userSelect: "none"
                }}
                disabled={userUpdateIsPending}
                onClick={() => handleCancelEdit()}
              >
                Cancel
              </button>
            </form>
          ),
        )}
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
          <button
            style={{
              background: "green",
              color: "#FFFFFF",
                  userSelect: "none"
            }}
            type="submit"
            disabled={isPending}
          >
            Submit Form
          </button>
        </form>
        {UserComponents}
      </div>
    </>
  );
}
