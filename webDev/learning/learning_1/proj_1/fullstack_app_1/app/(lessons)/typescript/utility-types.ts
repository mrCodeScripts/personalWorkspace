// ==============================================
//                  UTILITY TYPES
// ==============================================
// WHAT IT IS:
// -> Built-in TypeScript helpers that transform existing types into
// new ones. You use these constantly in real projects.

// Setup - the base type we'll use for all examples:
interface Someone_User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  createdAt?: Date
} 

// PARTIAL<T>
// -> Makes all fields optional:
// -> Use when updating data (you only send what changed)
type UserUpdate = Partial<Someone_User>;
// All fields become optional - good for PATCH requests
const updateUser = (id: string, dasta: Partial<Someone_User>) => {
  // data can have any combination of user fields.
}
updateUser('123', {name: 'New name'}); // only send what changed


// REQUIRED<T>
// -> Makes all fields required:
// -> Opposite of Partial<T>. Forces everything to be present.
type CompleteUser = Required<Someone_User>;
// -> Every single field must be provided - no optionals


// PICK<T, KEYS>
// -> Pick only specific fields:
// -> Use when you only need certain fields from a bigger type.
type PublicUser = Pick<Someone_User, 'id' | 'name' | 'role'>;
// {id: string, name: string, role: 'admin' | 'user'}
// Password and email are GONE - safe to send the frontend


// OMIT<T, KEYS>
// -> Remove specific fields:
// -> Opposite of Pick. Keep everything EXCEPT what you specify.
type UserWithoutPassword = Omit<Someone_User, 'password'>;
// Everything except password - also safe for frontend.
type NewUser = Omit<Someone_User, 'id' | 'createdAt'>;
// For creating a new user - id and createdAt are auto-generated


// READONLY<T> 
// -> Prevents mutation:
type ImmutableUser = Readonly<Someone_User>
const user_: ImmutableUser = {
  id: '123', 
  name: 'John Doe', 
  email: 'johndoe@gmail.com', 
  password: '123', 
  role: 'admin',
};
// user_.name = 'new'; // Typescript error - cannot mutate


// RECORD<Keys, Value>
// -> Typed key-value map:
// -> Use when you need an object with dynamic keys but consistent value types.
type UserRoles = Record<string, 'admin' | 'user' | 'guest'>;
const roles: UserRoles = {
  someone_1: 'admin',
  someone_2: 'user',
  someone_3: 'guest',
};
// -> More specific keys
// -> use when you know the exact keys but they are dynamic (not known at coding time)
// -> Example: website metadata with fixed keys but dynamic values
type PageMeta = Record<'title' | 'description' | 'url', string | number>;


// RETURNTYPE<T> 
// -> Extract what a function returns:
async function getAUser () {
  return {id: '1', name: 'Juan', role: 'admin' as const}
}
async function wrappedPromise () {
  return Promise.resolve(Promise.resolve(Promise.resolve({username: 'John Doe'})));
}
// -> This is still Promise<T> type. 
type UserData1 = ReturnType<typeof getAUser>;
// -> To get the actual value type, we need Awaited<T>
type UserData2 = Awaited<ReturnType<typeof getAUser>>;
// -> Awaited<> will automatically dig down and unwrap the 
type WrappedPromiseType = Awaited<ReturnType<typeof wrappedPromise>>;
// { id: string, name: string, role: 'admin' }
// -> No need to manuall define this type - it's automatic


// PARAMETERS<T>
// -> Extract function parameter types:
function createProduct(name: string, price: number, stock: number) {};
// -> [name: string, price: number, stock: number]
// -> Even if its a tuple, TypeScript will still not allow you 
// to mess up the arrangement.
type CreateProductParams = Parameters<typeof createProduct>;
// -> This helps you for convention, to avoid re-typing the 
// parameters again and just use (...) spread operator to pass the arguments.
function someFunction (...args: Parameters<typeof createProduct>) {
  createProduct(...args);
}


// -> Removes null and undefined.
type MaybeUser = Someone_User | null | undefined;
type DefinitelyUser = NonNullable<MaybeUser>;
async function someRAndomFunctionThatINeed123 (name: string, id: null) {}
// -> NonNullable is useless here, since Parameters return a tuple (map) of types.
type randomFuncType = NonNullable<Parameters<typeof someRAndomFunctionThatINeed123>>;


