import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from "@/types/types";
import { responses } from '@/helpers/responses';
import { apiDataHelper } from '@/helpers/apiDataHelper';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // returns all products from the database
  if(req.method === 'GET') {
    try {
      // get all products from the database
      const data: Product[] = apiDataHelper.getAll();

      // return the data as a json response with a 200 status code and a success message
      res.status(200).json({
        status: 'success',
        data: data,
        message: responses.getData.main.successMessage
      });

    } catch (error) {

      // return the error as a json response with a 500 status code and an error message
      res.status(500).json({
        status: 'error',
        error: error,
        message: responses.getData.main.errorMessage
      });

    }
  } else {
    // return a 405 status code and a message if the method is not allowed
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  return;
}
