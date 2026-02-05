"use client";
import { useEffect, useState } from "react";
import { giveDataExample1, User } from "./serverComponentExamples";
export type ButtonComponent1 = {
  text: string;
  classNames?: string;
  onClick?: () => void;
};

export type ButtonComponent2 = {
  text: string;
  classNames?: string;
  onClick?: () => void;
};

type DashboardExampleType = {
  title: string;
  classStyle: string;
  button: ButtonComponent1 | ButtonComponent2;
};

export default function DashboardDisplayExample({
  title,
  classStyle,
  button,
}: DashboardExampleType) {
  const [users, addUsers] = useState<User[]>([]);
  const handleClick = async () => {
    try {
      const data = await giveDataExample1();
      addUsers((prev) => [...prev, ...data]);
    } catch (e) {
      console.log("ERROR:", e);
    }
    console.log();
  };

  useEffect(() => {
    if (users.length > 0) {
      users.forEach((e, i) =>
        console.log(
          `User ${i} [ name: ${e.name}, age: ${e.age ? e.age : `No Age`}]`,
        ),
      );
    } else {
      console.log("No Users");
    }
  }, [users]);

  return (
    <>
      <div>
        <h1 className={classStyle}>{title}</h1>
        <button className="btn-primary" type="button" onClick={handleClick}>
          {button.text}
        </button>

        {users.length < 1 ? (
          <p className="text-red-300 text-sm">No Users</p>
        ) : (
          <ul>
            {users.map((v, i) => (
              <li key={i}>
                {v.name} - {v.age} years old
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
