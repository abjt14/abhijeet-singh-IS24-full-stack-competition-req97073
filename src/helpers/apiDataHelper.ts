import { APIProduct, Product } from '@/types/types';
import fs from 'fs';

let products: APIProduct[] = require('/data/products.json');

export const apiDataHelper = {
    set: SetProducts,
    getAll: () => products.filter((product: APIProduct) => product.deleted_at === null),
    create: createProduct,
    update: updateProduct,
    delete: deleteProduct,
    checkProductIdExists,
    checkProductNameExists
};

function SetProducts(data: Product[]) {
  products = data.map((product: Product) => {
    return setTimestamps(product);
  });

  saveData();
}

function createProduct(data: Product) {
  products = [...products, setTimestamps(data)];

  saveData();
}

function updateProduct(product: Product) {
  const productIndex = products.findIndex((p: Product) => p.productId === product.productId);
  products = [
    ...products.slice(0, productIndex),
    setTimestamps(product),
    ...products.slice(productIndex + 1)
  ];
  saveData();
}

function deleteProduct(productId: string) {
  const productIndex = products.findIndex((p: Product) => p.productId === productId);
  products = [
    ...products.slice(0, productIndex),
    {
      ...products[productIndex],
      deleted_at: getTimestamp()
    },
    ...products.slice(productIndex + 1)
  ];
  saveData();
}

function checkProductIdExists(productId: string): boolean {
  return products.filter((product: APIProduct) => product.deleted_at === null).some((product: Product) => product.productId === productId);
}

function checkProductNameExists(productName: string): boolean {
  return products.filter((product: APIProduct) => product.deleted_at === null).some((product: Product) => product.productName === productName);
}

// private helper functions
function saveData() {
  fs.writeFileSync('data/products.json', JSON.stringify(products, null, 4));
}
function getTimestamp() {
  return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}
function setTimestamps(data: Product): APIProduct {
  Object.assign(data, {
    created_at: getTimestamp(),
    updated_at: getTimestamp(),
    deleted_at: null
  });

  return data as APIProduct;
}
