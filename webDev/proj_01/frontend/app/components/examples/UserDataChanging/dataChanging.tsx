"use client";
import React, { memo, useActionState, useCallback, useState } from "react";

type User = {
  name: string;
  age: number;
  location: string;
};

type UserForm = {
  users: User[];
  onUpdate: (userIndex: number, updatedUser: User) => void;
};

const UserListComponent = React.memo(({ users, onUpdate }: UserForm) => {
  const [indexState, newIndexState] = useState<number | null>(null);
  const [userDataState, newUserDataState] = useState<Partial<User>>({});

  const [state, formAction, isPending] = useActionState<User, FormData>(
    async (prev, formData) => {
      await new Promise((res) => setTimeout(res, 3000));
      const name: string = String(formData.get("name"));
      const age: number = Number(formData.get("age"));
      const location: string = String(formData.get("location"));
      onUpdate(indexState!, { name: name, age: age, location: location });
      console.log(`%cUser Account Updated: id-${indexState}.`, "color: green;");
      newIndexState(null);
      return { name, age, location };
    },
    { name: "", age: 0, location: "" },
    "/someForm",
  );

  const handleInput = useCallback(
    (userProperty: keyof User, e: React.ChangeEvent<HTMLInputElement>) => {
      newUserDataState((prev) => ({ ...prev, [userProperty]: e.target.value }));
    },
    [],
  );

  const clickUpdate = useCallback((i: number) => {
    newIndexState(i);
    newUserDataState(users[i]);
  }, []);

  const clickCancel = useCallback(() => {
    newIndexState(null);
    newUserDataState({});
  }, []);

  return (
    <>
      <div>
        <ul>
          {users.length > 0 ? (
            users.map((e, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  color: "green",
                }}
              >
                {indexState === i ? (
                  <>
                    <form action={formAction}>
                      <input
                        type="text"
                        disabled={isPending}
                        name="name"
                        placeholder="Username..."
                        value={userDataState.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInput("name", e)
                        }
                        id=""
                      />
                      <input
                        type="number"
                        disabled={isPending}
                        name="age"
                        placeholder="Age..."
                        value={Number(userDataState.age)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInput("age", e)
                        }
                        id=""
                      />
                      <input
                        type="text"
                        disabled={isPending}
                        name="location"
                        placeholder="Location..."
                        value={userDataState.location}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInput("location", e)
                        }
                        id=""
                      />
                      <button type="submit" disabled={isPending}>
                        {isPending ? "Confirming..." : "Confirm"}
                      </button>
                      <button
                        disabled={isPending}
                        type="button"
                        onClick={() => clickCancel()}
                      >
                        Cancel
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                      }}
                    >
                      <span> Name: {e.name}</span>
                      <span> Age: {e.age}</span>
                      <span> Location: {e.location}</span>
                      <button type="button" onClick={() => clickUpdate(i)}>
                        Update
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))
          ) : (
            <>
              <p style={{ color: "red" }}>No Users!</p>
            </>
          )}
        </ul>
      </div>
    </>
  );
});

export default function DataChangingComponent() {
  const [users, newUserList] = useState<User[]>([
    { name: "John Doe", age: 19, location: "Earth" },
    { name: "John Doe", age: 19, location: "Earth" },
    { name: "John Doe", age: 19, location: "Earth" },
    { name: "John Doe", age: 19, location: "Earth" },
    { name: "John Doe", age: 19, location: "Earth" },
  ]);

  const handleUpdate = useCallback((userIndex: number, updatedUser: User) => {
    newUserList((prev) => {
      const copy = [...prev];
      copy[userIndex] = updatedUser;
      return copy;
    });
  }, []);

  return (
    <>
      <UserListComponent users={users} onUpdate={handleUpdate} />
    </>
  );
}
