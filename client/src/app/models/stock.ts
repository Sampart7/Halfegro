import { Product } from "./product";

export interface Stock {
    id: number;
    description: string;
    qty: number;
    product: Product;
  }