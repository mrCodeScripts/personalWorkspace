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
import { z } from "zod";
// npm install react-hook-form @hookform/resolvers zod
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Product, getProducts } from "./zod-inference";
import { useState } from "react";

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
      // const response = await fetch('/api/api-1/mySlug?message=hello');
      const response = await fetch("/api/api-1/mySlug?message=fuck the world");
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
      type UserType01 = { id: string; name: string; age: string };
      type ReqBodyType = { message: string; data: UserType01[] };
      const reqBody: ReqBodyType = {
        message: "These are the data",
        data: [{ id: "123", name: "John Doe", age: "30" }],
      };
      const req = await fetch("/api/api-1/mySlug", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });
      if (!req.ok) {
        throw new Error("Network response was not ok");
      }
      const response = await req.json();
      console.log(response);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchData3 = async () => {
    const response = await fetch("/api/api-1/mySlug?message=hello");
    // const response = await fetch("/api/api-1/mySlug");
    const data = await response.json();
    if (!response.ok) {
      console.log("Network response was not ok");
      console.log(data.error);
    } else {
      console.log();
      console.log(data.message);
    }
  };

  const [loading, setLoading] = useState<boolean>(false);
  const fetchData4 = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/api-2/products");
      const data = await response.json();
      if (!response.ok) {
        if (data.message) {
          throw new Error(
            `Something went wrong: ${data.message ? data.message : "No Error Message"}, ERROR: ${data.error ? data.error : "No Error Details"}`,
          );
        }
      }
      setLoading(false);
      console.log(data.message, data.products);
    } catch (error) {
      setLoading(false);
      console.log((error as Error).message);
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
        <button
          type="button"
          onClick={fetchData4}
          disabled={loading}
          className="p-3 bg-blue-300 text-white rounded"
        >
          {loading ? "Loading products..." : "Click this to get products!"}
        </button>
      </div>
    </>
  );
}

function ZodUsageExample1() {
  // ZOD PRIMITIVE TYPES
  const StringSchema = z.string();
  const NumberSchema = z.number();
  z.boolean();
  z.date();
  z.undefined();
  z.null();
  z.any();
  z.unknown();
  z.never();
  z.void();
  z.symbol();
  z.literal("specific value"); // exactly the string "admin"
  z.literal(123); // exactly the number 123
  z.literal(true); // exactly the boolean true

  // ZOD COMPLEX TYPES
  z.enum(["Admin", "User", "Guest"]); // one of the specified strings
  z.array(z.string()); // array of strings
  z.array(z.object()); // array of objects
  z.object({ name: z.string(), age: z.number() }); // object with specific properties
  z.union([z.string(), z.number()]); // string or number
  z.intersection(z.object({ name: z.string() }), z.object({ age: z.number() })); // object with both name and age
  z.tuple([z.string(), z.number()]); // tuple of string and number
  z.record(z.string(), z.number()); // object with string keys and number values
  z.map(z.string(), z.number()); // Map with string keys and number values
  z.set(z.string()); // Set of strings

  // ZOD INFERENCE (TYPESCRIPT TYPES INFERED FROM ZOD SCHEMAS)
  type Str = z.infer<typeof StringSchema>; // inferred as string or type string
  type Num = z.infer<typeof NumberSchema>; // inferred as number or type number

  // STRING VALIDATIONS
  z.string()
    .min(5, "String must be at least 5 characters long")
    .max(100, "String must be at most 100 characters long")
    .length(10, "String must be exactly 10 characters long")
    .regex(/^[a-zA-Z0-9]+$/, "String must be alphanumeric")
    .startsWith("Hello", "String must start with 'Hello'")
    .endsWith("World", "String must end with 'World'")
    .includes("TypeScript", "String must include 'TypeScript'")
    .trim()
    .toLowerCase()
    .toUpperCase()
    .nonempty("String cannot be empty");

  // OTHER STRING VALIDATIONS
  z.email("Invalid email address");
  z.emoji("Invalid emoji");
  z.url("Invalid URL");
  z.uuid("Invalid UUID");
  z.cuid("Invalid CUID");
  z.date({ message: "Invalid datetime" });
  z.ipv4("Invalid IPv4 address");
  z.ipv6("Invalid IPv6 address");
  z.hex("Invalid hex color");
  z.base64("Invalid base64 string");
  z.regex(/^[a-zA-Z0-9]+$/, "String must be alphanumeric");

  return (
    <>
      <div></div>
    </>
  );
}

export default function TypeScriptLessonsClient() {
  return (
    <>
      <TypeScriptSample1 />
      {/* <TypeScriptSample2 /> */}
    </>
  );
}
