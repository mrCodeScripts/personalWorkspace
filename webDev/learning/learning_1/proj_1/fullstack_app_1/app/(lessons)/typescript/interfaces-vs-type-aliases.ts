// ===================================================
//            INTERFACES VS TYPE ALIASES
// ===================================================
// -> Two ways to describe the shape of an object in TypeScript.
// -> Both work.
// -> Knowing when to use which makes you look senior.


// INTERFACE
// -> use for objects and classes
interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
}
interface Admin {
  id: string;
  name: string;
  email: string;
  age?: number;
}

const user: User = {
  id: '123',
  name: 'Juan',
  email: 'juan@gmail.com',
  age: 10, // age is optional we can skip it.
}

// TYPE ALIAS
// -> use for unions, intersections, and complex types
type Status = 'active' | 'inactive' | 'pending';
type ID = string | number;
type UserOrAdmin = User | Admin;

// THE KEY DIFFERENCE - DECLARATION MERGING:
// -> Interfaces can be declared twice and they MERGE together.
// -> Types cannot be re-declared.

// This works with interface:
interface Product {
  id: string;
  name: string;
}
interface Product {
  price: number;
}

// This BREAKS with type:
type Shop = {id: string;};
// type Shop = {name: string;}; // Error: duplicate identifier

// INHERITANCE EXTENDING
type ObjectDir = 'left' | 'right' | 'top' | 'bottom';
type ObjectColor = 'green' | 'red' | 'blue' | 'yellow';
interface FirstObject {
  objectName: string;
};
interface SecondObject {
  objectId: string;
};
interface FirstObject extends SecondObject {
  objectPosition: ObjectDir;
  objectColor: ObjectColor;
};
let firstObjectSample: FirstObject = {
  objectId: "123",
  objectName: "Object 1",
  objectColor: "blue",
  objectPosition: "bottom"
};
// THE SIMPLE RULE:
// Use INTERFACE  -> for objects, props, and API response shapes
// Use TYPE       -> for unions, mapped types, and complex logic





export { user, firstObjectSample };

