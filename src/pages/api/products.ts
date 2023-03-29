import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from "@/types/types";
import { responses } from '@/helpers/responses';
import { apiDataHelper } from '@/helpers/apiDataHelper';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if(req.method === 'GET') {
    try {

      const data: Product[] = apiDataHelper.getAll();

      res.status(200).json({
        status: 'success',
        data: data,
        message: responses.getData.main.successMessage
      });

    } catch (error) {

      res.status(500).json({
        status: '500',
        error: error,
        message: responses.getData.main.errorMessage
      });

    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  return;
}
