import { APIProduct, Product } from '@/types/types';
import fs from 'fs';

// get the data from the json file
let products: APIProduct[] = require('/data/products.json');

// export the functions
export const apiDataHelper = {
  set: SetProducts,
  getAll: getAllProducts,
  get: getProduct,
  create: createProduct,
  update: updateProduct,
  delete: deleteProduct,
  checkProductIdExists,
  checkProductNameExists,
  SearchByScrumMaster,
  SearchByDeveloper
};

// set the data to the json data variable
function SetProducts(data: Product[]) {
  products = data.map((product: Product) => {
    return setTimestamps(product);
  });

  saveData();
}

// return all products where deleted_at is null
function getAllProducts() {
  return products.filter((product: APIProduct) => product.deleted_at === null);
}

// return the product with the matching productId
function getProduct(productId: string) {
  return products.find((product: APIProduct) => product.productId === productId);
}

// add a product to the data
function createProduct(data: Product) {
  products = [...products, setTimestamps(data)];

  saveData();
}

// update a product in the data
function updateProduct(product: Product) {
  const productIndex = products.findIndex((p: Product) => p.productId === product.productId);
  products = [
    ...products.slice(0, productIndex),
    setTimestamps(product),
    ...products.slice(productIndex + 1)
  ];
  saveData();
}

// delete a product from the data
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

// check if the productId exists
function checkProductIdExists(productId: string): boolean {
  return products.filter(
    (product: APIProduct) => product.deleted_at === null
  )
  .some(
    (product: Product) => product.productId === productId
  );
}

// defines the props for the checkProductNameExists function
interface CheckProductNameExistsParams {
  productName: string;
  productId: string | null;
}
// check if the productName exists
function checkProductNameExists({ productName, productId }: CheckProductNameExistsParams): boolean {
  if (productId) {
    return products.filter(
      (product: APIProduct) => product.deleted_at === null
    )
    .some(
      (product: Product) => (product.productName === productName) && (product.productId !== productId)
    );
  } else {
    return products.filter(
      (product: APIProduct) => product.deleted_at === null
    )
    .some(
      (product: Product) => product.productName === productName
    );
  }
}

// search for products by scrum master name
function SearchByScrumMaster(scrumMasterName: string) {
  return products.filter(
    (product: APIProduct) => product.deleted_at === null &&
    product.scrumMasterName.toLowerCase().includes(scrumMasterName)
  );
}

// search for products by developer name
function SearchByDeveloper(developerName: string) {
  return products.filter(
    (product: APIProduct) => product.deleted_at === null &&
    product.developers.some(
      (developer: string) => developer.toLowerCase().includes(developerName)
    )
  );
}

// save the data to the json file
function saveData() {
  fs.writeFileSync('data/products.json', JSON.stringify(products, null, 4));
}

// create a timestamp
function getTimestamp() {
  return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

// set the timestamps for the product
function setTimestamps(data: Product): APIProduct {
  Object.assign(data, {
    created_at: getTimestamp(),
    updated_at: getTimestamp(),
    deleted_at: null
  });

  return data as APIProduct;
}
