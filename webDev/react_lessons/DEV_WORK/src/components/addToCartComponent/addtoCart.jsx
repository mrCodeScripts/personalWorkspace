import { useActionState } from "react"

const products = [
  { product_key: 1, product_name: "Phone 1", product_price: "$99" },
  { product_key: 2, product_name: "Phone 1", product_price: "$99" },
  { product_key: 3, product_name: "Phone 1", product_price: "$99" },
  { product_key: 4, product_name: "Phone 1", product_price: "$99" },
  { product_key: 5, product_name: "Phone 1", product_price: "$99" },
  { product_key: 6, product_name: "Phone 1", product_price: "$99" },
  { product_key: 7, product_name: "Phone 1", product_price: "$99" },
  { product_key: 8, product_name: "Phone 1", product_price: "$99" },
];

function productExist (id, prod) {
  return prod.some(p => p.product_key === id);
}

function CartForm ({id, name, price}) {
  const [message, formAction, isPending] = useActionState(async (state, formData) => {
    if (productExist(id, products)) {
      await new Promise(res => setTimeout(res, 1000));
      return "Successfuly added to cart!";
    } else {
      await new Promise(res => setTimeout(res, 1000));
      return "Coudn't add item to cart!"
    }
  }, null);

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="product-key" value={id} />
        <p><span>Name: </span> {name}</p>
        <p><span>Price: </span> {price}</p>
        <button>
          Add to Cart
        </button>
        {isPending ? "Loading..." : message}
      </form>
    </>
  )
}

export function TheCart () {
  return (
    <>
      {products.length === 0 ? "No Products" : 
      products.map((v, i) => 
        <div key={i}>
          <CartForm 
            id={v.product_key} 
            name={v.product_name} 
            price={v.product_price} 
          />
        </div>
      )}
      <CartForm id={10} name={"shit"} price={"$999"} />
    </>
  )
}
