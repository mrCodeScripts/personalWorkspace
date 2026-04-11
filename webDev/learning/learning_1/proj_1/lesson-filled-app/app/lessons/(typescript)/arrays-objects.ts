// ========================================
//            ARRAYS & OBJECTS
// ========================================

// ARRAYS
const names: string[] = ['Juan', 'Maria', 'Pedro'];
const scores: number[] = [95, 87, 33];
type User = {id: string; name: string; email: string; age: number};
const users: User[] = [{id: "123", name: "John Doe", email: "johndoe@gmail.com", age: 19}];
// Alternative syntax
const nameCollections: Array<string> = ['Juan', 'Maria'];
const shopCollections: Array<Capitalize<string>> = ['Shopee', 'Lazada'];

// OBJECTIVES WITH INLINE TYPES
const TheProduct: {id: string; name: string; price: number} = {
  id: "123",
  name: "ProductName",
  price: 1200
};

// READONLY (prevents accidental mutation):
const config: Readonly<{apiURL: string}> = {
  apiURL: 'https://api.example.com'
};
// config.apiURL = 'something else'; // TypeScript error


export { TheProduct, config, nameCollections, shopCollections, users, scores, names };
