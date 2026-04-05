// ================================================================
//            ADVANCED PATTERNS (SENIOR LEVEL CODE)
// ================================================================

// CONDITIONAL TYPES:
type IsString<T> = T extends string ? true : false;
type A = IsString<string>; // true
type B = IsString<number>; // false

// MAPPED TYPES:
// -> Make every value in an object an array
type ReadonlyType<T> = {
  readonly [K in keyof T]: T[K];
}

// -> Make every value in an object optional
type PartialType<T> = {
  [K in keyof T]?: T[K];
}

// -> Make every value in an object a function that returns the original type ()
type FunctionType<T> = {
  [K in keyof T]: () => T[K]; // must return the value (string or number or whatever the original type is)
}

// -> Combine multiple mapped types
type ReadonlyPartialType<T> = {
  readonly [K in keyof T]?: T[K];
}

// -> Use mapped types with utility types
type ReadonlyPartialUser = Readonly<Partial<SomeUser_001>>;
// ReadonlyPartialUser = {readonly name?: string; readonly age?: number}

// -> Use mapped types with conditional types
type OptionalStringProperties<T> = {
  [K in keyof T]: T[K] extends string ? T[K] : never;
}

// -> Use mapped types with infer keyword
type InferArrayElementType<T> = T extends (infer U)[] ? U : never;
type ElementType = InferArrayElementType<string[]>; // string

// INFER KEYWORD:
type InferReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type ReturnTypeOfFunc = InferReturnType<() => number>; // number

type SomeUser_001 = {name: string; age: number};
type ReadonlyUser_001 = ReadonlyType<SomeUser_001>;
// ReadonlyUser_001 = {readonly name?: string; readonly age?: number}

// -> INFER KEYWORD:
type ReturnTypeOfFunction<T> = T extends (...args: any[]) => infer R ? R : never;






