import type { NextApiRequest, NextApiResponse } from 'next';

// defines the response type for the health api
interface HealthResponse {
  status: string;
  message: string | unknown;
  uptime: number;
  timestamp: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthResponse>
) {
  try {
    // defines the healthcheck response object with the status, message, uptime, and timestamp
    const healthcheck = {
      status: 'success',
      message: 'OK',
      uptime: process.uptime(),
      timestamp: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    };
    // returns the healthcheck response object with a 200 status code
    res.send(healthcheck);
  } catch (error) {
    // defines the healthcheck response object with the status, message, uptime, and timestamp
    const healthcheck = {
      status: 'error',
      message: 'failed',
      uptime: process.uptime(),
      timestamp: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    };
    // returns the healthcheck response object with a 503 status code meaning the service is unavailable
    res.status(503).send(healthcheck);
  }
}
