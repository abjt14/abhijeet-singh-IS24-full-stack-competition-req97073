import type { NextApiRequest, NextApiResponse } from 'next';
import { products } from "../../static-data/products";
import { productOwners } from "../../static-data/productOwners";
import { developers } from "../../static-data/developers";
import { scrumMasters } from "../../static-data/scrumMasters";
import { Product } from "../../types/types";
import { addProductSchema, deleteProductSchema, updateProductSchema } from '@/helpers/schema';
import { processBody } from '@/helpers/utils';
import { responses } from '@/helpers/responses';
import { checkProductIdExists, checkProductNameExists } from '@/helpers/validator';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  switch (req.method) {
    case 'GET':
      try {

        const generatedData = datagenerator();

        res.status(200).json({
          status: 'success',
          data: generatedData,
          message: responses.getData.main.successMessage
        });

      } catch (error) {

        res.status(500).json({
          status: '500',
          error: error,
          message: responses.getData.main.errorMessage
        });

      }

      break;
    case 'POST':

      try {

        let { body } = req;

        const data = addProductSchema.parse(processBody(body));
        const checkExists = checkProductNameExists(data.productName);

        if(checkExists) {
          res.status(500).json({
            status: 'error',
            error: responses.addProduct.validator.error,
            message: responses.addProduct.validator.errorMessage
          });
        }

        Object.assign(body, {
          productId: generateID(body.productName)
        });

        res.status(200).json({
          status: 'success',
          message: responses.addProduct.schema.successMessage
        });

      } catch (error) {

        res.status(500).json({
          status: '500',
          error: error,
          message: responses.addProduct.schema.errorMessage
        });

      }
      break;
    case 'PUT':
      try {

        let { body } = req;

        const data = updateProductSchema.parse(processBody(body));
        const checkExists = checkProductIdExists(data.productId);

        if(!checkExists) {
          res.status(500).json({
            status: 'error',
            error: responses.updateProduct.validator.error,
            message: responses.updateProduct.validator.errorMessage
          });
        }

        res.status(200).json({
          status: 'success',
          message: responses.updateProduct.schema.successMessage
        });

      } catch (error) {

        res.status(500).json({
          status: '500',
          error: error,
          message: responses.updateProduct.schema.errorMessage
        });

      }
      break;
    case 'DELETE':
      try {

        let { body } = req;

        const data = deleteProductSchema.parse(body);
        const checkExists = checkProductIdExists(data.productId);

        if(!checkExists) {
          res.status(500).json({
            status: 'error',
            error: responses.updateProduct.validator.error,
            message: responses.updateProduct.validator.errorMessage
          });
        }

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
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res
        .status(405)
        .json({
          status: '405',
          message: `Method ${req.method} Not Allowed`
        });
      break;
  }
  return;
}

function datagenerator(): Product[] {

  const productCount: number = 40;
  let data: Product[] = [];

  [...Array(productCount).keys()].forEach((i) => {
    let randomDeveloperOffset: number = Math.floor(Math.random() * developers.length);
    randomDeveloperOffset = randomDeveloperOffset > developers.length - 5 ? developers.length - 5 : randomDeveloperOffset;

    let randomProduct: Product = {
      productId: products[i].productId,
      productName: products[i].productName,
      productOwnerName: productOwners[Math.floor(Math.random() * productOwners.length)],
      developers: [],
      scrumMasterName: scrumMasters[Math.floor(Math.random() * scrumMasters.length)],
      startDate: products[i].startDate,
      methodology: Math.random() > 0.5 ? "Agile" : "Waterfall"
    }

    for (let j = Math.floor(Math.random() * 5); j < 5; j++) {
      randomProduct.developers.push(developers[randomDeveloperOffset + j]);
    }

    data.push(randomProduct);
  });

  return data;
}

function generateID(name: string): string {
  const words = name.split(' ');
  const firstLetters = words.map(word => word.charAt(0).toUpperCase());
  const id = `P-${firstLetters.join('')}-${Math.floor(Math.random() * 9000) + 1000}`;

  return id;
}
