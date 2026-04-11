export interface Product {
  name: string;
  price: number;
  description: string;
};

export interface Shop {
  name: string;
  products: Product[];
  location: string;
};