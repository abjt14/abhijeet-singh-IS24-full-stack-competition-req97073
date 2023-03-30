import type { NextApiRequest, NextApiResponse } from 'next';
import { apiDataHelper } from '@/helpers/apiDataHelper';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;

  try {

    const result = apiDataHelper.SearchByDeveloper(
      (query.query as string).toLowerCase()
    );

    res.status(200).json({
      status: 'success',
      data: result,
      message: `Found ${result.length} products.`
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: (error as Error).message,
      message: 'Could not search for scrum master. Please try again.'
    });
  }
}