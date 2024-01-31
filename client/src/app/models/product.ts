import { Stock } from "./stock";

export interface Product {
    id: number;
    name: string;
    description: string;
    value: number;
    stock: Stock;
  }