// ===================================================
//            PRIMITIVES AND LITERAL TYPES
// ===================================================
// -> The most basic types in TypeScript. Every variable has one

// PRIMITIVES
let item1: string = "This is a string";
let item2: number = 1;
let item3: boolean = true;
let item4: null = null;
let item5: undefined = undefined;
let item6: any = "Any types";
let item7: unknown = null;
let item8: never;
let item9: void;

// LITERAL TYPES (MORE SPECIFIC THAN PRIMITIVES)
// -> More specific than primitives. Instead of just saying "it's a string", you say  "it's THIS specific string and nothing else".
type Direction = "left" | "right" | "up" | "down";
type StatusCode = 200 | 400 | 404 | 500;
let move: Direction = "down"; // correct
let statusCode: StatusCode = 404; // correct
// let move: Direction = 'diagonal'; // wrong
// let statusCode: StatusCode = 300; // wrong

// TEMPLATE LITERALS
// -> Real world use. Useful for strictly typing API routes, CSS classes, or event names so you never mistype a string.
type ApiRoute = `/api/${string}`;
// Only accepts strings that start with "/api/"
type CssSize = `${number}px` | `${number}rem` | `${number}%`;
// Only accepts strings like '16px', '2rem', '100%'.
type EventName = `ont${Capitalize<string>}`;
// Only accepts 'onClick', onChange', 'onSubmit', etc.

// TEMPLATE LITERALS WITH BUILT-IN UTILITY TYPES
type NameFormat1 = `NAME: ${Capitalize<string>}`;
type NameFormat2 = `NAME: ${Uncapitalize<string>}`;
type NameFormat3 = `NAME: ${Uppercase<string>}`;
type NameFormat = `NAME: ${Lowercase<string>}`;

// WHAT TO REMEMBER:
// -> Avoid 'any' at all costs. It turns off TypeScript.
// -> User 'unknown' when you don't know the type yet.
// -> Use literal thypes to lock down specific allowed values.

export { item1, item2, item3, item4, item5, item6, item7, item8, item9 };
