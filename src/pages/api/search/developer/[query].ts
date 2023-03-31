import type { NextApiRequest, NextApiResponse } from 'next';
import { apiDataHelper } from '@/helpers/apiDataHelper';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  // get the query from the request by destructuring the query property
  const { query } = req;

  try {

    // search for the product with the developer name in the query
    const result = apiDataHelper.SearchByDeveloper(
      (query.query as string).toLowerCase()
    );

    // return the data as a json response with a 200 status code and a success message
    res.status(200).json({
      status: 'success',
      data: result,
      message: `Found ${result.length} products.`
    });
  } catch (error) {
    // return the error as a json response with a 500 status code and an error message
    res.status(500).json({
      status: 'error',
      error: (error as Error).message,
      message: 'Could not search for scrum master. Please try again.'
    });
  }
}