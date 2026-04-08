// =================================================
//      GENERICS - THE MOST POWERFUL FEATURE
// =================================================
// WHAT IT IS:
// -> Generics let you write ONE function or component that works
// with ANY type, while still being fully type-safe.
// -> Think of it as a "type variable".

import { ReactServerDOMWebpackServer } from "next/dist/server/route-modules/app-page/vendored/rsc/entrypoints";

// WITHOUT GENERICS (THE BAD WAY):
function getFirstITem(arr: string[]): string {
  return arr[0];
}
function getFirstItem(arr: number[]): number {
  return arr[0];
}

// WITH GENERICS (THE PRO WAY):
function getFirstITEM<T>(arr: T[]): T {
  return arr[0];
}
getFirstITEM(["Juan", "Maria"]); // returns string
getFirstITEM([1, 2, 3]); // returns number
getFirstITEM([{ id: 1 }]); // returns object

// REAL NEXT.JS REACT EXAMPLE - TYPED API FETCH
async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Fetch Failed");
  return res.json() as Promise<T>;
}

type User = { id: string; name: string; age: number };
type Product = { productId: string; productName: string; };
const a_user = fetchData<User>("/api/users/1");
const a_product = fetchData<Product[]>("/api/product/s");

// GENERIC REACT COMPONENT - TYPED DATATABLE:
interface datatableprops<tdata> {
  data: tdata[];
  columns: {
    key: keyof tdata;
    label: string;
  }[];
}

function datatable<tdata>({ data, columns }: datatableprops<tdata>) {
  // return (
  // <table>
  //   {data.map((row, i) => (
  //     <tr key={i}>
  //       {columns.map(col => (
  //         <td key={string(col.key)}>{string(row[col.key])}</td>
  //       ))}
  //     </tr>
  //   ))}
  // </table>
  // )
}




// EXTENDS IN GENERICS (THE "CONSTRAINT")
// -> When you see extends in a generic type parameter, it means "T must be at least this type".
// -> It allows you to use properties of that type safely inside the function/component.
// -> You are telling TypeScript: "You can pass any type you want in this generic
// , AS LONG AS it has at least the properties of this type."
function logLength<T extends { length: number}> (item: T) {
  console.log(item.length);
};

// -> Basically, these works because they are temporarily wrapped by javascript with length property 
// when we call logLength, so they satisfy the constraint of T extends { length: number }.
logLength("hello world"); // works because string has length
logLength([1, 2, 3]); // works because array has length
// -> But this one works because we are passing an object that has a length 
// property, so it satisfies the constraint of T extends { length: number }.
logLength({ length: 10, name: "test" }); // works because it has length
// logLength(123); // error because number doesn't have length
// -> In English: T extends { length: number } means "T must satisfy the shape of an object with a numeric length property".

// T must have at least an 'id' property
type TYPE_RAND<T extends { id: string }> = {
  name: string;
};
let aUserSomewhere: TYPE_RAND<{ id: string }>;
aUserSomewhere = { name: "someone" };
function findByID<T extends { id: string }>(
  items: T[],
  id: string,
): T | undefined {
  return items.find((item) => item.id === id);
}





// EXTENDS IN CONDITIONAL TYPES (THE "QUESTION")
// -> When you see extends outside of the angle brackets and followed by a ?, it is not a rule anymore.
// -> It is a conditional question (a ternary operator).

// -> Think of it as: Is X assignable to Y ? Yes : No
type IsItString<T>  = T extends string ? "Yes, it's a string!" : "No, it's not a string!";
type Test1 = IsItString<"some_string">; // "Yes, it's a string!"
type Test2 = IsItString<123>; // "No, it's not a string"
// -> In English: T extends string ? "Yes, it's a string!" : "No, it's not a string" means "If T is assignable to string, then the type is 'Yes, it's a string!', otherwise it's 'No, it's not a string'".

// We create a function that takes a value, and returns our custom types
function checkType<T>(value: T): IsItString<T> {
  if (typeof value === "string") {
    return "Yes, it's a string!" as IsItString<T>;
  } else {
    return "No, it's not a string!" as IsItString<T>;
  }
}
// Usage
// -> One quick reminder, T was not defined like checkType<string>("something"), because TypeScript can infer T from the argument we pass in. 
// So when we call checkType("something"), TypeScript infers that T is string, and therefore the return type is "Yes, it's a string!". 
// When we call checkType(42), TypeScript infers that T is number, and therefore the return type is "No, it's not a string!".
const result1 = checkType("something"); // TypeScript types this as exactly "Yes, it's a string!".
const result2 = checkType(42);          // TypeScript tyeps this as exactly "No, it's not a string!"
console.log(result1); // Logs: Yes, it's a string!
console.log(result2); // Logs: No, it's not a string!

type Speaker<T> = T extends { voice: string } ? T['voice'] : 'silent';
type Dog = { voice: "bark"; breed: "pug" };
type Rock = { hardness: 10 };

type DogSound = Speaker<Dog>; // Result: 'bark'
type RockSoudn = Speaker<Rock>; // Result: 'silent'





export {getFirstITEM, getFirstItem, getFirstITem, fetchData, a_user, a_product, datatable, aUserSomewhere}
