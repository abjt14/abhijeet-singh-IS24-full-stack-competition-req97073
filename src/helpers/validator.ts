import { ProductBase, products } from "@/static-data/products";
import Error from "next/error";


export function checkProductIdExists(productId: string): boolean | Error {
  return products.some((product: ProductBase) => product.productId === productId);
}

export function checkProductNameExists(productName: string): boolean | Error {
  return products.some((product: ProductBase) => product.productName === productName);
}
