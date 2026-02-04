// TypeScript Practice File

import ts = require("typescript");

// Basic types
let name: string = "John Doe";
let age: number = 19;
let isActive: boolean = false;
let anyItem: any = false; // bypasses type checking; avoid if possible
let unknown: unknown = 5; // safer than any; you have to check type before using
let aVoid: void; // void no value
let nullValue: null = null; // null value
let arr: number[] = [1, 2, 3, 4]; // array
let tuple: [string, number] = ["Boss", 25]; // tuple
enum Colors {
  RED,
  GREEN,
  BLUE,
} // symbolic names for numbers
enum Status {
  PENDING = "pending",
  DONE = "done",
  CANCELLED = "cancelled",
} // symbolic names for numbers
let obj: { name: string; age: number } = { name: "John Doe", age: 19 };

// STRONG OBJECTS INSIDE ARRAYS
// there are two types, either using types for what specific type of
// objects are stored inside the array, using explicit specification of what
// to store inside the array, or using interfaces (almost similart to types).
// -> using explicit specification
let people1: { name: string; age: number }[] = [{ name: "John doe", age: 19 }];
// -> using types
type personObject = { name: string; age: number };
let people2: personObject[] = [
  { name: "John Doe", age: 19 },
  { name: "John Doe", age: 19 },
  { name: "John Doe", age: 19 },
  { name: "John Doe", age: 19 },
  { name: "John Doe", age: 19 },
];
// -> using interfaces
interface User {
  name: string;
  age: number;
}
let people3: User[] = [
  { name: "Jane Doe", age: 19 },
  { name: "Jane Doe", age: 19 },
];

// INTERFACE vs TYPE
// Big advantage of interface: it can be extended
interface Person {
  name: string;
  age: number;
}
interface Student extends Person {
  grade: number;
}
let student: Student = {
  name: "John Doe",
  age: 19,
  grade: 90,
};

// INTERFACES CAN BE MERGED
interface TheObject {
  property: string;
}
interface TheObject {
  item: string;
}
let theObject: TheObject = {
  property: "Property I",
  item: "Item I",
};

// INTERFACES + CLASSES (implement)
interface USER {
  username: string;
  login(): void;
}
class Admin implements USER {
  username: string;
  constructor(username: string) {
    this.username = username;
  }
  login(): void {
    console.log(`You are now logged in ${this.username.toLocaleUpperCase()}!`);
  }
}
const anAdmin: Admin = new Admin("John Doe");
// anAdmin.login();

// WHEN SHOULD YOU USE WHAT? (RULE_OF_THUMB)
// Use INTERFACE when:
// - you are modeling objects
// - you use classes
// - you are doing backend/big projects
// - you want extendable structures
// Use TYPE when:
// - You use union types
type ID = number | string;
// - You mix types
type Result = { name: string; age: number } | null;

// FUNCTIONS
function log(): void {
  console.log("This is a void function!");
}
// log();
function crash(): never {
  throw new Error("Something went wrong!");
}
// crash();
function forever(): never {
  while (true) {
    console.log("I never stop");
  }
}
// forever();
function add(a: number, b: number): number {
  // PARAMETERS + RETURN TYPES
  return a + b;
}
// console.log(add(2, 3));
function greet(name: string, age?: number): void {
  // ? -> OPTIONAL PARAMETERS
  console.log(`Hello ${name}${age ? `, you are ${age} years old` : `.`}`);
}
// greet("John Doe");
function greet2(name: string = "Boss") {
  console.log(`Hello ${name}!`);
}
// greet2();
type MathFucn = (a: number, b: number) => number; // FUNCTION TYPES
let multiply: MathFucn = (x, y) => {
  let answer: number = x * y;
  console.log(answer);
  return answer;
};
// multiply(2, 3);

// GENERICS
function multNum<T>(mult: T): T {
  // GENERICS on parameter and return type
  if (typeof mult == "number") {
    console.log(mult * 3);
    return (mult * 3) as T;
  }
  console.log("Not a number!");
  return mult;
}
// multNum<Number>(40);
function arrayGenerics1<T extends number>(arr: T[]): T[] {
  // Genererics for arrays, extends to allow numbers (optional)
  // this function only accepts numbers (T extends numbers)
  if (arr.length > 0 && typeof arr[0] == "number") {
    let newArr: T[] = [];
    for (let i = 0; i < arr.length; i++) {
      newArr.push(Number(arr[i]! * 3) as T); // ! -> "trust me this is not undefined"
      console.log(`Number ${arr[i]}.`);
    }
    return newArr;
  }
  return arr;
}
// console.log(arrayGenerics1<number>([1, 2, 3]));
function arrayGenerics2<T>(arr: T[]): T[] {
  // Genererics for arrays, extends to allow numbers (optional)
  const newArr: T[] = [];
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i]!; // trust me its not empty
    if (typeof val == "string") {
      newArr.push(val.repeat(3) as unknown as T);
      console.log(`String: ${val}.`);
    } else if (typeof val == "number") {
      newArr.push((val * 3) as unknown as T); // ! -> "trust me this is not undefined"
      console.log(`Number ${newArr[i]}.`);
    } else {
      newArr.push(val as unknown as T);
      console.log(`Other: ${val}.`);
    }
  }
  return arr;
}
// console.log(arrayGenerics2<number>([1, 2, 3]));

// TYPE NARROWING (SMART TYPE CHECKING)
// TYPEOF
function print(val: number | string): void {
  if (typeof val == "number") {
    console.log(`A number: ${val}.`);
  } else if (typeof val == "string") {
    console.log(`A string: ${val.toUpperCase()}`);
  }
}
// print("lksajdf");
// INSTANEOF
class UserA {}
class UserB {}
function printSomeShit(val: UserA | UserB) {
  if (val instanceof UserA) console.log("User A");
  else if (val instanceof UserA) console.log("User A");
}
// printSomeShit(new UserA());

// ADVANCED OBJECT TYPES
// READONLY
interface UserZ {
  readonly id: number | string;
  name: string;
}
let user: UserZ = { id: 12345, name: "John Doe" };
// user.id = 1; // error READ-ONLY

// PARTIAL USER (Partial<T>) -> makes all properties optional
interface UserReference {
  id: string | number;
  name: string;
  age: number;
}
type PartialUser = Partial<UserReference>;
let aPartialUser: PartialUser = {
  // other parts of teh UserReference are partial (or optional)
  name: "John Doe",
};

// REQUIRED (Required<T, K>) -> makes all optional properties required
interface UserK {
  id: number | string;
  name?: string; // can still be null
}
type FullUser = Required<UserK>;
let aRequiredUser: FullUser = {
  id: 12345,
  name: "John Doe", // now required
};

// PICK<T, K> -> select specific properties from a type
interface User1 {
  name: string;
  id?: number | string;
}
type pickUserProp = Pick<User1, "id">;
const u: pickUserProp = { id: "slkjsdf" };

// OMIT<T, K> -> excludes certain properties
interface UserExamp {
  name: string;
  id?: number | string;
}
type omitUserProp = Omit<UserExamp, "id">;
const omittedUser: omitUserProp = {
  name: "John Doe",
  // id: 123454, // ERROR not allowed (was omitted)
};

// REAL-WORDL USAGE COMBO
interface UserAcc {
  id: string | number;
  username: string;
  age: number;
}
function updateUser(user: UserAcc, updates: Partial<UserAcc>): any {
  return { ...user, ...updates };
}
const currentUser: UserAcc = { id: 123, username: "John Doe", age: 19 };
const updatedUser: UserAcc = updateUser(currentUser, { age: 20 });

// PRODUCTION TYPESCRIPT

// 1. STRICT MODE + NULL SAFETY (VERY IMPORTANT)
let userName1: string;
// userName1 = null; // ERROR
// username1 = undefined; // ERROR

// 2. UNION TYPES WITH NULL
let userName2: string | null;
userName2 = "Boss"; // ALLOWED
userName2 = null; // ALLOWED

// 3. OPTIONAL PROPERTIES = POSIBBLY UNDEFINED ?
interface User1 {
  name: string;
  age?: number; // pssible undefined (age: number | undefined)
}
// you are then forced to check the type
const RandUser: User1 = { name: "John Doe" };
if (RandUser.age !== undefined) {
  RandUser.age.toFixed();
}
// Optional Chaining
RandUser.age?.toFixed(); // works the same as if statement (?.)

// 4. NULL COALESCING ??
const userAge: number = RandUser.age ?? 0; // if user age is null, use 0.
// const userAge: number = RandUser.age || 0; // INVALID

// 5. NON-NULL ASSERTION ! (USE CAREFULLY)
// arr[i]! -> "trust me arr[i] is not null"
let iTem: string | null = null;
// console.log(iTem!); // "trust me iTem is not null"

// 6. FUNCTIONS RETURNING POSSIBLY NULL
interface UserInt {
  name: string;
  age: number;
}
function findUser(id: number): UserInt | null {
  if (id === 1) {
    return { name: "John Doe", age: 20 };
  }
  return null;
}
const aUser: UserInt | null = findUser(1);
/*
if (aUser) {
  console.log("Name:", aUser.name);
  console.log("Age:", aUser.age);
} else {
  console.log("User not found");
}
*/

// CUSTOM TYPE GUARD
interface CustomUser {
  name: string;
  age: number;
  isActive: boolean;
  permissions: string[];
}
interface AdminBS extends CustomUser {
  role: "Admin";
}
interface DefaultUser extends CustomUser {
  role: "Default User";
}
type Account = AdminBS | DefaultUser;
function isAdmin(acc: Account): acc is AdminBS {
  return acc.role == "Admin";
}
const adminUser: AdminBS = {
  name: "John Doe",
  age: 19,
  isActive: true,
  role: "Admin",
  permissions: ["shit"],
};
const func = (acc: Account) => {
  if (isAdmin(acc)) {
    console.log(`Admin name: ${acc.name}.`);
  } else {
    console.log(`Default-User name: ${acc.name}.`);
  }
};
// func(adminUser);

// DISCRIMINATED UNIONS (MOST IMPORTANT PATTERN)
type ResultStats =
  | { status: "success"; message: "Successfull!" }
  | { status: "failed"; message: "Error!" }
  | { message: "Error!" };
function handleResult(res: Partial<ResultStats>) {
  if ("status" in res && "message" in res && res.status == "success") {
    console.log(res.message);
  } else if ("status" in res && "message" in res && res.status == "failed") {
    console.log(res.message);
  } else if (!("status" in res) && "message" in res) {
    console.log(res.message);
  }
}
// handleResult({ status: "success", message: "Successfull!" });
// API EXAMPLE USING DISCRIMINATED UNIONS
interface UserAPI {
  name: string;
  age: number;
}
type APISTAT = { ok: true; data: UserAPI } | { ok: false; message: string };
function handleAPI (res: APISTAT) {
  if ("ok" in res && res.ok)  {
    console.log(`User: Name -> ${res.data.name}, Age -> ${res.data.age}.`);
  } else if ("ok" in res && !res.ok) {
    console.log(`Error message: ${res.message}`);
  }
} 
const currentStatus: APISTAT = {ok: true, data: {name: "John Doe", age: 19}};
// handleAPI(currentStatus);
