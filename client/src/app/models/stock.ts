import { Product } from "./product";

export interface Stock {
    id: number;
    qty: number;
    product: Product;
  }
