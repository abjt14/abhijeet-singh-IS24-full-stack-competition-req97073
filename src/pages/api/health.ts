import type { NextApiRequest, NextApiResponse } from 'next';

interface HealthResponse {
  uptime: number;
  message: string;
  timestamp: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthResponse>
) {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
  };
  try {
    res.send(healthcheck);
  } catch (error) {
    healthcheck.message = error as string;
    res.status(503).send(healthcheck);
  }
}
