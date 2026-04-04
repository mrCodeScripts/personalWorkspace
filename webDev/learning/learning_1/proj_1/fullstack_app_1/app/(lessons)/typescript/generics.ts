// =================================================
//      GENERICS - THE MOST POWERFUL FEATURE
// =================================================
// WHAT IT IS:
// -> Generics let you write ONE function or component that works
// with ANY type, while still being fully type-safe.
// -> Think of it as a "type variable".

// WITHOUT GENERICS (THE BAD WAY):
function getFirstITem(arr: string[]): string {
  return arr[0];
}
function getFirstItem(arr: number[]): number {
  return arr[0];
}

// WITH GENERICS (THE PRO WAY):
function getFirstITEM<T>(arr: T[]): T {
  return arr[0];
}
getFirstITEM(["Juan", "Maria"]); // returns string
getFirstITEM([1, 2, 3]); // returns number
getFirstITEM([{ id: 1 }]); // returns object

// REAL NEXT.JS REACT EXAMPLE - TYPED API FETCH
async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Fetch Failed");
  return res.json() as Promise<T>;
}

type User = { id: string; name: string; age: number };
type Product = { productId: string; productName: string; };
const a_user = fetchData<User>("/api/users/1");
const a_product = fetchData<Product[]>("/api/product/s");

// GENERIC REACT COMPONENT - TYPED DATATABLE:
interface datatableprops<tdata> {
  data: tdata[];
  columns: {
    key: keyof tdata;
    label: string;
  }[];
}

function datatable<tdata>({ data, columns }: datatableprops<tdata>) {
  // return (
  // <table>
  //   {data.map((row, i) => (
  //     <tr key={i}>
  //       {columns.map(col => (
  //         <td key={string(col.key)}>{string(row[col.key])}</td>
  //       ))}
  //     </tr>
  //   ))}
  // </table>
  // )
}

// CONSTRAINED GENERICS (LIMITS WHAT T CAN BE)
// T must have at least an 'id' property
type TYPE_RAND<T extends { id: string }> = {
  name: string;
};
let aUserSomewhere: TYPE_RAND<{ id: string }>;
aUserSomewhere = { name: "someone" };
function findByID<T extends { id: string }>(
  items: T[],
  id: string,
): T | undefined {
  return items.find((item) => item.id === id);
}

export {getFirstITEM, getFirstItem, getFirstITem, fetchData, a_user, a_product, datatable, aUserSomewhere}
