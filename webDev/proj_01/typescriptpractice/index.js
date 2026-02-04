"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TypeScript Practice File
// import ts = require("typescript");
require("typescript");
const isParameter = require("typescript");
// Basic types
let name = "John Doe";
let age = 19;
let isActive = false;
let anyItem = false; // bypasses type checking; avoid if possible
let unknown = 5; // safer than any; you have to check type before using
let aVoid; // void no value
let nullValue = null; // null value
let arr = [1, 2, 3, 4]; // array
let tuple = ["Boss", 25]; // tuple
var Colors;
(function (Colors) {
    Colors[Colors["RED"] = 0] = "RED";
    Colors[Colors["GREEN"] = 1] = "GREEN";
    Colors[Colors["BLUE"] = 2] = "BLUE";
})(Colors || (Colors = {})); // symbolic names for numbers
var Status;
(function (Status) {
    Status["PENDING"] = "pending";
    Status["DONE"] = "done";
    Status["CANCELLED"] = "cancelled";
})(Status || (Status = {})); // symbolic names for numbers
let obj = { name: "John Doe", age: 19 };
// STRONG OBJECTS INSIDE ARRAYS
// there are two types, either using types for what specific type of
// objects are stored inside the array, using explicit specification of what
// to store inside the array, or using interfaces (almost similart to types).
// -> using explicit specification
let people1 = [{ name: "John doe", age: 19 }];
let people2 = [
    { name: "John Doe", age: 19 },
    { name: "John Doe", age: 19 },
    { name: "John Doe", age: 19 },
    { name: "John Doe", age: 19 },
    { name: "John Doe", age: 19 },
];
let people3 = [
    { name: "Jane Doe", age: 19 },
    { name: "Jane Doe", age: 19 },
];
let student = {
    name: "John Doe",
    age: 19,
    grade: 90,
};
let theObject = {
    property: "Property I",
    item: "Item I",
};
class Admin {
    username;
    constructor(username) {
        this.username = username;
    }
    login() {
        console.log(`You are now logged in ${this.username.toLocaleUpperCase()}!`);
    }
}
const anAdmin = new Admin("John Doe");
// FUNCTIONS
function log() {
    console.log("This is a void function!");
}
// log();
function crash() {
    throw new Error("Something went wrong!");
}
// crash();
function forever() {
    while (true) {
        console.log("I never stop");
    }
}
// forever();
function add(a, b) {
    // PARAMETERS + RETURN TYPES
    return a + b;
}
// console.log(add(2, 3));
function greet(name, age) {
    // ? -> OPTIONAL PARAMETERS
    console.log(`Hello ${name}${age ? `, you are ${age} years old` : `.`}`);
}
// greet("John Doe");
function greet2(name = "Boss") {
    console.log(`Hello ${name}!`);
}
let multiply = (x, y) => {
    let answer = x * y;
    console.log(answer);
    return answer;
};
// multiply(2, 3);
// GENERICS
function multNum(mult) {
    // GENERICS on parameter and return type
    if (typeof mult == "number") {
        console.log(mult * 3);
        return (mult * 3);
    }
    console.log("Not a number!");
    return mult;
}
// multNum<Number>(40);
function arrayGenerics1(arr) {
    // Genererics for arrays, extends to allow numbers (optional)
    // this function only accepts numbers (T extends numbers)
    if (arr.length > 0 && typeof arr[0] == "number") {
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
            newArr.push(Number(arr[i] * 3)); // ! -> "trust me this is not undefined"
            console.log(`Number ${arr[i]}.`);
        }
        return newArr;
    }
    return arr;
}
// console.log(arrayGenerics1<number>([1, 2, 3]));
function arrayGenerics2(arr) {
    // Genererics for arrays, extends to allow numbers (optional)
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
        const val = arr[i]; // trust me its not empty
        if (typeof val == "string") {
            newArr.push(val.repeat(3));
            console.log(`String: ${val}.`);
        }
        else if (typeof val == "number") {
            newArr.push((val * 3)); // ! -> "trust me this is not undefined"
            console.log(`Number ${newArr[i]}.`);
        }
        else {
            newArr.push(val);
            console.log(`Other: ${val}.`);
        }
    }
    return arr;
}
// console.log(arrayGenerics2<number>([1, 2, 3]));
// TYPE NARROWING (SMART TYPE CHECKING)
// TYPEOF
function print(val) {
    if (typeof val == "number") {
        console.log(`A number: ${val}.`);
    }
    else if (typeof val == "string") {
        console.log(`A string: ${val.toUpperCase()}`);
    }
}
// print("lksajdf");
// INSTANEOF
class UserA {
}
class UserB {
}
function printSomeShit(val) {
    if (val instanceof UserA)
        console.log("User A");
    else if (val instanceof UserA)
        console.log("User A");
}
let user = { id: 12345, name: "John Doe" };
let aPartialUser = {
    // other parts of teh UserReference are partial (or optional)
    name: "John Doe",
};
let aRequiredUser = {
    id: 12345,
    name: "John Doe", // now required
};
const u = { id: "slkjsdf" };
const omittedUser = {
    name: "John Doe",
    // id: 123454, // ERROR not allowed (was omitted)
};
const recordedUsers = {
    1: { id: 1, name: "John Doe", age: 19 },
    2: { id: 2, name: "Jane Doe", age: 19 },
    3: { id: 3, name: "Jack Doe", age: 19 },
};
// SafeUser is {name: string; age: number}; and will never accept null undefined 
// RETURNTYPE<T>
function getUser() {
    return { name: "Boss", age: 19 };
}
function someReturnType() {
    return true;
}
const item123 = true;
const item1234 = { name: "Someone", age: 20 };
// console.log(item123);
// console.log(item1234);
// PARAMETERS<typeof function>
function someBullshitFn(id, name) {
    return { id, name };
}
;
let PossibleParameter = [1, "someString"];
someBullshitFn(...PossibleParameter);
function updateUser(user, updates) {
    return { ...user, ...updates };
}
const currentUser = { id: 123, username: "John Doe", age: 19 };
const updatedUser = updateUser(currentUser, { age: 20 });
// PRODUCTION TYPESCRIPT
// 1. STRICT MODE + NULL SAFETY (VERY IMPORTANT)
let userName1;
// userName1 = null; // ERROR
// username1 = undefined; // ERROR
// 2. UNION TYPES WITH NULL
let userName2;
userName2 = "Boss"; // ALLOWED
userName2 = null; // ALLOWED
// you are then forced to check the type
const RandUser = { name: "John Doe" };
if (RandUser.age !== undefined) {
    RandUser.age.toFixed();
}
// Optional Chaining
RandUser.age?.toFixed(); // works the same as if statement (?.)
// 4. NULL COALESCING ??
const userAge = RandUser.age ?? 0; // if user age is null, use 0.
// const userAge: number = RandUser.age || 0; // INVALID
// 5. NON-NULL ASSERTION ! (USE CAREFULLY)
// arr[i]! -> "trust me arr[i] is not null"
let iTem = null;
function findUser(id) {
    if (id === 1) {
        return { name: "John Doe", age: 20 };
    }
    return null;
}
const aUser = findUser(1);
function isAdmin(acc) {
    return acc.role == "Admin";
}
const adminUser = {
    name: "John Doe",
    age: 19,
    isActive: true,
    role: "Admin",
    permissions: ["shit"],
};
const func = (acc) => {
    if (isAdmin(acc)) {
        console.log(`Admin name: ${acc.name}.`);
    }
    else {
        console.log(`Default-User name: ${acc.name}.`);
    }
};
function handleResult(res) {
    if ("status" in res && "message" in res && res.status == "success") {
        console.log(res.message);
    }
    else if ("status" in res && "message" in res && res.status == "failed") {
        console.log(res.message);
    }
    else if (!("status" in res) && "message" in res) {
        console.log(res.message);
    }
}
function handleAPI(res) {
    if ("ok" in res && res.ok) {
        console.log(`User: Name -> ${res.data.name}, Age -> ${res.data.age}.`);
    }
    else if ("ok" in res && !res.ok) {
        console.log(`Error message: ${res.message}`);
    }
}
const currentStatus = {
    ok: true,
    data: { name: "John Doe", age: 19 },
};
// handleAPI(currentStatus);
//# sourceMappingURL=index.js.map