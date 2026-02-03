// TypeScript Practice File

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
        newArr.push((val.repeat(3) as unknown as T));
        console.log(`String: ${val}.`);
    } else if (typeof val == "number") {
      newArr.push((val*3) as unknown as T); // ! -> "trust me this is not undefined"
      console.log(`Number ${newArr[i]}.`);
    } else {
        newArr.push(val as unknown as T);
        console.log(`Other: ${val}.`);
    }
  }
  return arr;
}
// console.log(arrayGenerics2<number>([1, 2, 3]));
