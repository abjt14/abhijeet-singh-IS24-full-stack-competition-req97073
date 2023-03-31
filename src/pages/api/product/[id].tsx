import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from "@/types/types";
import { addProductSchema, deleteProductSchema, updateProductSchema } from '@/helpers/schema';
import { processBody } from '@/helpers/utils';
import { responses } from '@/helpers/responses';
import { apiDataHelper } from '@/helpers/apiDataHelper';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  // get the id from the query string by destructuring and convert it to uppercase
  const { query, method } = req
  const productId = (query.id as string).toUpperCase();

  switch (method) {
    case 'GET':
      try {

        // check if the id exists in the database
        const checkIdExists = apiDataHelper.checkProductIdExists(productId);

        // if id does not exist, return error
        if(!checkIdExists) {
          // return error message as a json object with status code 500
          res.status(500).json({
            status: 'error',
            error: responses.getProduct.validator.error,
            message: responses.getProduct.validator.errorMessage
          });

          // throw an error to stop the function
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        // if id exists, get the product data from the database
        const data = apiDataHelper.get(productId);

        // return the product data as a json object with status code 200
        res.status(200).json({
          status: 'success',
          data: data
        });

      } catch (error) {

        // if error, return error message as a json object with status code 500
        res.status(500).json({
          status: 'error',
          error: error,
          message: responses.getProduct.schema.errorMessage
        });

      }
      break;
    case 'POST':
      try {

        // get the body from the request by destructuring
        let { body } = req;

        // parse the body using the addProductSchema
        const data = addProductSchema.parse(processBody(body));

        // check if the product name already exists in the database
        const checkExists = apiDataHelper.checkProductNameExists({
          productName: data.productName,
          productId: null
        });

        // if product name exists, return error
        if(checkExists) {
          // return error message as a json object with status code 500
          res.status(500).json({
            status: 'error',
            error: responses.addProduct.validator.error,
            message: responses.addProduct.validator.errorMessage
          });

          // throw an error to stop the function
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        // if product name does not exist, add the product to the database
        apiDataHelper.create(data as Product);

        // return success message as a json object with status code 200
        res.status(200).json({
          status: 'success',
          message: responses.addProduct.schema.successMessage
        });

      } catch (error) {

        // if error, return error message as a json object with status code 500
        res.status(500).json({
          status: 'error',
          error: error,
          message: responses.addProduct.schema.errorMessage
        });

      }
      break;
    case 'PUT':
      try {

        // check if the id exists in the database
        const checkIdExists = apiDataHelper.checkProductIdExists(productId);

        // if id does not exist, return error
        if(!checkIdExists) {
          // return error message as a json object with status code 500
          res.status(500).json({
            status: 'error',
            error: responses.updateProduct.validator.error,
            message: responses.updateProduct.validator.errorMessage
          });

          // throw an error to stop the function
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        // get the body from the request by destructuring
        let { body } = req;

        // parse the body using the updateProductSchema
        const data = updateProductSchema.parse(processBody(body));

        // check if the product name already exists in the database
        const checkNameExists = apiDataHelper.checkProductNameExists({
          productName: data.productName,
          productId: productId
        });

        // if product name exists, return error
        if(checkNameExists) {
          // return error message as a json object with status code 500
          res.status(500).json({
            status: 'error',
            error: responses.updateProduct.validator.error2,
            message: responses.updateProduct.validator.errorMessage2
          });

          // throw an error to stop the function
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        // if product name does not exist, update the product in the database
        apiDataHelper.update(data as Product);

        // return success message as a json object with status code 200
        res.status(200).json({
          status: 'success',
          message: responses.updateProduct.schema.successMessage
        });
      } catch (error) {
        // if error, return error message as a json object with status code 500
        res.status(500).json({
          status: 'error',
          error: error,
          message: responses.updateProduct.schema.errorMessage
        });
      }
      break;
    case 'DELETE':
      try {

        // check if the id exists in the database
        const checkIdExists = apiDataHelper.checkProductIdExists(productId);

        // if id does not exist, return error
        if(!checkIdExists) {
          // return error message as a json object with status code 500
          res.status(500).json({
            status: 'error',
            error: responses.deleteProduct.validator.error,
            message: responses.deleteProduct.validator.errorMessage
          });

          // throw an error to stop the function
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        // parse the body using the deleteProductSchema
        deleteProductSchema.parse({ productId: productId });

        // if id exists, delete the product from the database
        apiDataHelper.delete(productId);

        // return success message as a json object with status code 200
        res.status(200).json({
          status: 'success',
          message: responses.deleteProduct.schema.successMessage
        });

      } catch (error) {

        // if error, return error message as a json object with status code 500
        res.status(500).json({
          status: 'error',
          error: error,
          message: responses.deleteProduct.schema.errorMessage
        });

      }
      break;
    default:
      // Set the header to allow GET, POST, PUT, DELETE
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      // Return status code 405 Method Not Allowed
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}