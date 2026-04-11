// ==============================================
//            TYPE NARROWING & GUARDS
// ==============================================
// What it is:
// -> When you have a value that could be multiple types,
// TypeScript needs you to "narrow it down" before using it. 
// This is how you safely handle unknown API response.

// TYPEOF NARROWING (FOR PRIMITIVES):
function processInput(input: string | number) {
  // typeof -> extracts the type (primitive | non-primitives)
  return typeof input === 'string' ? input.toUpperCase() : input.toFixed(2);
}


// INSTANCEOF NARROWING (FOR CLASSES/OBJECTS):
function handleError(error: unknown) {
  const message: string = error instanceof Error ? error.message : "Unknown error occurred";
  console.log("\n\n\n" + "%c" + message, "color: red; font-weight: bold");
}
function dateOrRegExp(value: Date | RegExp): string {
  if (value instanceof Date) {
    return ("It's a date:" + value.toISOString());
  } else {
    return ("It's a regex:" + value.source);
  }
}

// 'IN' OPERATOR NARROWING (CHECK IF PROPERTY EXISTS)
interface Cat { meow: () => void };
interface Dog { bark: () => void };

function makeSound(animal: Cat | Dog) {
  'meow' in animal ? animal.meow() : animal.bark();
};


// USER-DEFINED TYPE GUARDS (THE ADVANCED VERSION):
// -> Returns a boolean but tells TypeScript what the type is.
// -> Use this when handling API responses where you don't know what came back.
interface ApiUser {
  id: string;
  name: string;
  email: string;
}

const unknownDataFromFetch: unknown = {id: '1', name: 'Juan', email: 'juan@gmail.com'};

// -> The 'response is ApiUser' part is the type predicate
function isApiUser(response: unknown): response is ApiUser  {
  return (
    typeof response === 'object' &&
    response != null &&
    'id' in response
    // 'name' in response &&
    // 'email' in response
  )
}

if (isApiUser(unknownDataFromFetch)) {
  // TypeScript now knows data is ApiUser
  console.log(unknownDataFromFetch.name); 
} else {
  console.log('Not a valid user response');
}


// DISCRIMINATED UNIONS (CLEANEST PATTERN FOR COMPLEX TYPES):
type ApiResponse<T> = 
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }
  | { status: 'loading' };

function handleResponse(response: ApiResponse<ApiUser>) {
  switch (response.status) {
    case 'success':
      console.log('User data:', response.data); // knows data exists
      break;
    case 'error':
      console.error('Error:', response.error); // knows message exists
      break;
    case 'loading':
      console.log('Loading...');
      break;
  }
}

export { processInput, handleError, makeSound, isApiUser, handleResponse, dateOrRegExp};
