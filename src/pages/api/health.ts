import type { NextApiRequest, NextApiResponse } from 'next';

interface HealthResponse {
  status: string;
  data: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthResponse>
) {
  res.status(200).json({
    status: 'success',
    data: 'Server is healthy.'
  });
}
