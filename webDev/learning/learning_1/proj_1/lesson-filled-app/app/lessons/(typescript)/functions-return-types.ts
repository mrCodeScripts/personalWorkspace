// =================================================
//            FUNCTIONS & RETURN TYPES
// =================================================
// -> Always type your function parameters AND  return values.
// -> This is what separates professional code from amateru code.


// BASIC FUNCTION
function greet (name: string): string {
  return `Hello, ${name}!`;
};

// ARROW FUNCTION
const add = (a: number, b: number): number => a + b;

// OPTIONAL PARAMETER
const greetings = (name: string, title?: string): string => {
  return title ? `Hello ${title} ${name}!` : `Hello ${name}`;
};

// DEFAULT PARAMETER
const createSlug = (text: string, separator: string = '-'): string =>  {
  return text.toLowerCase().split(' ').join(separator);
};

// FUNCTION THAT RETURNS NOTHING
const logError = (message: string): void => {
  console.log(message);
}

// ASYNC FUNCTION - ALWAYS RETURNS PROMISE<SOMETHING>
type User = { id: string; name: string; };
const getUser = async (id: string): Promise<User> => {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
}

// FUNCTION TYPE AS PARAMETER (CALLBACK)
const runTask = (callback: (result: string) => void): void => {
  callback('done');
}
runTask((result: string): void => {console.log(result)});

export {getUser, runTask, createSlug, logError, greetings, add, greet};

