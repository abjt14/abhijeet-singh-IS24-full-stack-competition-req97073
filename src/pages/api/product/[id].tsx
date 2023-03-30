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

  const { query, method } = req
  const productId = (query.id as string).toUpperCase();

  switch (method) {
    case 'GET':
      try {
        const checkIdExists = apiDataHelper.checkProductIdExists(productId);

        if(!checkIdExists) {
          res.status(500).json({
            status: 'error',
            error: responses.getProduct.validator.error,
            message: responses.getProduct.validator.errorMessage
          });

          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = apiDataHelper.get(productId);

        res.status(200).json({
          status: 'success',
          data: data
        });

      } catch (error) {

        res.status(500).json({
          status: 'error',
          error: error,
          message: responses.getProduct.schema.errorMessage
        });

      }
      break;
    case 'POST':
      try {

        let { body } = req;

        const data = addProductSchema.parse(processBody(body));
        const checkExists = apiDataHelper.checkProductNameExists({
          productName: data.productName,
          productId: null
        });

        if(checkExists) {
          res.status(500).json({
            status: 'error',
            error: responses.addProduct.validator.error,
            message: responses.addProduct.validator.errorMessage
          });

          throw new Error(`HTTP error! status: ${res.status}`);
        }

        apiDataHelper.create(data as Product);

        res.status(200).json({
          status: 'success',
          message: responses.addProduct.schema.successMessage
        });

      } catch (error) {

        res.status(500).json({
          status: 'error',
          error: error,
          message: responses.addProduct.schema.errorMessage
        });

      }
      break;
    case 'PUT':
      try {
        const checkIdExists = apiDataHelper.checkProductIdExists(productId);

        if(!checkIdExists) {
          res.status(500).json({
            status: 'error',
            error: responses.updateProduct.validator.error,
            message: responses.updateProduct.validator.errorMessage
          });

          throw new Error(`HTTP error! status: ${res.status}`);
        }


        let { body } = req;

        const data = updateProductSchema.parse(processBody(body));
        const checkNameExists = apiDataHelper.checkProductNameExists({
          productName: data.productName,
          productId: productId
        });

        if(checkNameExists) {
          res.status(500).json({
            status: 'error',
            error: responses.updateProduct.validator.error2,
            message: responses.updateProduct.validator.errorMessage2
          });

          throw new Error(`HTTP error! status: ${res.status}`);
        }

        apiDataHelper.update(data as Product);

        res.status(200).json({
          status: 'success',
          message: responses.updateProduct.schema.successMessage
        });
      } catch (error) {

        res.status(500).json({
          status: 'error',
          error: error,
          message: responses.updateProduct.schema.errorMessage
        });
      }
      break;
    case 'DELETE':
      try {
        const checkIdExists = apiDataHelper.checkProductIdExists(productId);

        if(!checkIdExists) {
          res.status(500).json({
            status: 'error',
            error: responses.deleteProduct.validator.error,
            message: responses.deleteProduct.validator.errorMessage
          });

          throw new Error(`HTTP error! status: ${res.status}`);
        }

        deleteProductSchema.parse({ productId: productId });
        apiDataHelper.delete(productId);

        res.status(200).json({
          status: 'success',
          message: responses.deleteProduct.schema.successMessage
        });

      } catch (error) {

        res.status(500).json({
          status: '500',
          error: error,
          message: responses.deleteProduct.schema.errorMessage
        });

      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}