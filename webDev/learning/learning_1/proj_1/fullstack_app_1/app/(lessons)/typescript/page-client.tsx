"use client";

import {
  getUser,
  runTask,
  createSlug,
  logError,
  greetings,
  add,
  greet,
} from "./functions-return-types";
import {
  getFirstITEM,
  getFirstItem,
  getFirstITem,
  fetchData,
  a_user,
  a_product,
  datatable,
  aUserSomewhere,
} from "./generics";
// import { PartialOfUser, ReadonlyUser, USER_COLLECTIONS_2, UserGetter } from "./mapped-types";
import { user, firstObjectSample } from "./interfaces-vs-type-aliases";
import {
  processInput,
  handleError,
  makeSound,
  isApiUser,
} from "./type-narrowing-guards";
import {
  TheProduct,
  config,
  nameCollections,
  shopCollections,
  users,
  scores,
  names,
} from "./arrays-objects";

function TypeScriptSample1() {
  const someFunction = async (
    param: { id: string; name: string },
    adminId: string,
  ) => {
    return Promise.resolve(
      Promise.resolve({ id: param.id, name: param.name, adminId }),
    );
  };
  type SomeFunctionType = Parameters<typeof someFunction>;
  const SomeFunctionVariable: SomeFunctionType = [
    { id: "123", name: "John Doe" },
    "admin123",
  ];

  someFunction(...SomeFunctionVariable).then((result) => {
    console.log(result);
  });

  interface TableProps<T> {
    data: T[];
    columns: { colName: keyof T };
  }

  const fetchData1 = async () => {
    try {
      // const response = await fetch('/api/mySlug?message=hello');
      const response = await fetch("/api/mySlug?message=fuck the world");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchData2 = async () => {
    try {
      const data = await fetch("/api/mySlug", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: "123",
          name: "John Doe",
          email: "johndoe@gmail.com",
        }),
      });
      if (!data.ok) {
        throw new Error("Network response was not ok");
      }
      const response = await data.json();
      console.log(response);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchData3 = async () => {
    // const response = await fetch('/api/mySlug?message=hello');
    const response = await fetch("/api/mySlug");
    const data = await response.json();
    if (!response.ok) {
      console.log("Network response was not ok");
      console.log(data.error);
    } else {
      console.log();
      console.log(data.message);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={fetchData3}
          className="p-3 bg-blue-500 text-white rounded"
        >
          Click this to send message!
        </button>
        <button
          type="button"
          onClick={fetchData2}
          className="p-3 bg-blue-500 text-white rounded"
        >
          Click this another button!
        </button>
      </div>
    </>
  );
}

export default function TypeScriptLessonsClient() {
  return (
    <>
      <TypeScriptSample1 />
    </>
  );
}
