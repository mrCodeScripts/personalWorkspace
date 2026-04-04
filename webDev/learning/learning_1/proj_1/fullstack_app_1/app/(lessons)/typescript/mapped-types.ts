// ==============================================
//                  MAPPED TYPES
// ==============================================
// -> Just like how Array.map() loops over values and transforms them, Mapped Types loops over keys of a type and transforms them.

// JavaScript .map() - loops over VALUES
const nums = [1, 2, 3];
const doubled = nums.map((n) => n * 2);
// [2, 4, 6]

// Mapped type - loops over KEYS of a type
type User_Type_1 = { id: string; name: string; age: number };
type Transformed_User_Type_1 = {
  [K in keyof User_Type_1]: string;
};

// [K in keyof OBJECT] : Transformation
// K -> loop variable
// Transformation -> what you transform it into

// EXAMPLE 1
// -> Make value optional
type USER_TYPE_1 = {
  id: string;
  name: string;
  age: number;
};
type PartialOfUser<UserType> = {
  [Key in keyof UserType]?: UserType[Key];
};
const partial_user: PartialOfUser<USER_TYPE_1> = {
  id: "123",
  name: "John Doe",
};

// EXAMPLE 2
// -> Make value read-only
type USER_TYPE_2 = {
  id: string;
  name: string;
  age: number;
};
type ReadonlyUser<UserType> = {
  readonly [Key in keyof UserType]: UserType[Key];
};
const read_only_user: ReadonlyUser<USER_TYPE_2> = {
  id: "123",
  name: "John Doe",
  age: 17,
};
// read_only_user.age = 18; // ERROR: not allowed to modify readonly

// EXAMPLE 3
// -> Turn every value into an array
type USER_COLLECTIONS_1 = {
  user_collection_1: USER_TYPE_1;
  user_collection_2: USER_TYPE_2;
};
type USER_COLLECTIONS_2<USER_STORAGE> = {
  [Key in keyof USER_STORAGE]: USER_STORAGE[Key][];
};
let Array_User: USER_COLLECTIONS_2<USER_COLLECTIONS_1> = {
  user_collection_1: [{ id: "123", name: "John Doe", age: 19 }],
  user_collection_2: [{ id: "123", name: "John Doe", age: 19 }],
};

// EXAMPLE 4
// -> Turn every value into a getter function
type Getters<T> = {
  readonly [K in keyof T]?: () => T[K];
};
type UserGetter = Getters<USER_TYPE_1>;
const UserGetterVar: UserGetter = {
  name(): string {
    return "John Doe";
  },
  age(): number {
    return 12;
  },
};

// EXAMPLE 5
// -> The index access trick [keyof T] at the end:
type SOME_USER_TYPE1 = { id: string; name: string; age: number };
// Step 1 - create an object type first
type User = { id: string; name: string; age: number; socialSecurityNumber: number};
type Step1 = {
  [K in keyof SOME_USER_TYPE1]: { key: K; values: User[K][] };
};
// Step 2 - add [keyof User] to grab all values as a UNION
type Step2 = Step1[keyof SOME_USER_TYPE1];
// { key: 'id'; value: string }
// | { key: 'name'; value: string }
// | { key: 'age'; value: number }

// ================================================================
//                     MAPPED TYPES — QUICK REVIEW NOTES
// ================================================================
// Goal: Transform row-based data → column-based data using types.
// ================================================================

// ----------------------------------------------------------------
// THE PROBLEM WE'RE SOLVING
// ----------------------------------------------------------------
// We have an array of objects (rows):
//   [
//     { id: "1", name: "Juan", age: 22 },
//     { id: "2", name: "Maria", age: 20 },
//   ]

// We want to flip it into column-based data:
//   {
//     id:   { colName: "id",   colData: ["1", "2"] },
//     name: { colName: "name", colData: ["Juan", "Maria"] },
//     age:  { colName: "age",  colData: [22, 20] },
//   }

// ----------------------------------------------------------------
// STEP 1 — DEFINE THE RAW DATA TYPE
// ----------------------------------------------------------------
type FIRST_TYPE = { id: string; name: string; age: number };
//   ↑ just describes the shape of ONE row

// ----------------------------------------------------------------
// STEP 2 — DEFINE THE COLUMN SHAPE (generic, reusable)
// ----------------------------------------------------------------
type THIRD_TYPE<T, K> = { colName: T; colData: K[] };
//              ↑  ↑
//              T = type of the key name (will be a literal like "id")
//              K = type of the values in that column

// ----------------------------------------------------------------
// STEP 3 — MAPPED TYPE (the loop that builds column types)
// ----------------------------------------------------------------
type SECOND_TYPE<T> = {
  [K in keyof T]: THIRD_TYPE<K, T[K]>;
  // ↑                          ↑  ↑
  // loops every key of T       K = key as literal ("id","name","age")
  //                            T[K] = value type of that key
};

// What [K in keyof T] gives you simultaneously:
//   K    → the key as a literal type "id" | "name" | "age"
//   T[K] → the value type of that key (string, string, number)

// What the result looks like after the loop:
// {
//   id:   THIRD_TYPE<"id",   string>,
//   name: THIRD_TYPE<"name", string>,
//   age:  THIRD_TYPE<"age",  number>,
// }

// ----------------------------------------------------------------
// STEP 4 — LOCK IN THE FINAL TYPE
// ----------------------------------------------------------------
type FINAL_TYPE = SECOND_TYPE<FIRST_TYPE>;
// Just SECOND_TYPE with FIRST_TYPE plugged in as T
// No more generics — fully concrete type now

// ----------------------------------------------------------------
// STEP 5 — THE FUNCTION (runtime implementation)
// ----------------------------------------------------------------
const buildColumns = (data: FIRST_TYPE[]): FINAL_TYPE => {
  // Object.keys() = JavaScript runtime version of keyof
  // as (keyof FIRST_TYPE)[] = tell TS: this array only holds
  // valid keys of FIRST_TYPE, not just any string
  const keys = Object.keys(data[0]) as (keyof FIRST_TYPE)[];

  // {} as FINAL_TYPE = start with empty object but tell TS
  // "trust me, this will become FINAL_TYPE by the end"
  // needed because TS doesn't know the keys yet at this point
  const result = {} as FINAL_TYPE;

  for (const key of keys) {
    result[key] = {
      colName: key,
      colData: data.map((row) => row[key]),
      //             ↑ loop all rows and grab value for this key
    } as any;
    // ↑ needed because key is "id"|"name"|"age" union simultaneously
    // TS can't verify union key assignments in loops
    // YOU know it's correct — TS just can't see it
  }

  return result;
};

// ----------------------------------------------------------------
// KEY CONCEPTS TO REMEMBER
// ----------------------------------------------------------------

// keyof T
//   → extracts all keys of T as a union of literal types
//   → "id" | "name" | "age"
//   → TypeScript only (compile time) — disappears after build
//   → runtime version is Object.keys() which returns string[]

// T[K]
//   → gets the VALUE TYPE of key K inside type T
//   → if K is "age" and T is FIRST_TYPE → T[K] is number
//   → reads as "index into T using K"

// [K in keyof T]
//   → loops over every key of T
//   → each iteration: K = one literal key, T[K] = its value type
//   → BOTH available at the same time inside the transform

// {} as FINAL_TYPE
//   → empty object told to be treated as FINAL_TYPE
//   → use when TS doesn't know the keys yet but you will fill them

// as (keyof T)[]
//   → tell TS: this string array only contains valid keys of T
//   → needed because Object.keys() returns string[] by default
//   → you are narrowing it down to only the valid keys

// as any (when acceptable)
//   → use ONLY when TS limitation prevents it, not to hide errors
//   → acceptable: dynamic key assignment inside a loop (union key)
//   → not acceptable: silencing a real type mismatch

// ----------------------------------------------------------------
// TYPESCRIPT vs JAVASCRIPT — TWO WORLDS
// ----------------------------------------------------------------
// TYPESCRIPT (compile time)       JAVASCRIPT (runtime)
// ────────────────────────────    ────────────────────────────
// keyof T                         Object.keys(obj)
// type, interface                 const, let, function
// Partial<T>, Omit<T>             actual logic and loops
// Disappears after build          Actually runs in browser

// ----------------------------------------------------------------
// THE MENTAL MODEL IN ONE PARAGRAPH
// ----------------------------------------------------------------
// Mapped Types are a TYPE-LEVEL loop. Just like Array.map() loops
// over values and transforms them, [K in keyof T] loops over the
// KEYS of a type and transforms each one into something new. K
// gives you the key as a literal type. T[K] gives you its value
// type. Together they let you rebuild any type into a new shape
// automatically — without manually writing every field.

// ================================================================
//                         END OF NOTES
// ================================================================
