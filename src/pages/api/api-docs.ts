import type { NextApiRequest, NextApiResponse } from 'next';

const swaggerJSON = require('/data/swagger.json');

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // get the swagger json data
  const data = swaggerJSON;

  // set the content type to json so the browser knows how to handle the response
  res.setHeader('Content-Type', 'application/json');

  // return the data as a json response with a 200 status code
  res.send(JSON.stringify(data, null, 2));
}
