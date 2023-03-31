import type { NextApiRequest, NextApiResponse } from 'next';

// defines the lyrics for the test api
const lyrics: string[] = [
 "Never gonna give you up ⬆️",
 "Never gonna let you down ⬇️",
 "Never gonna run around and desert you 🌵",
 "Never gonna make you cry 😢",
 "Never gonna say goodbye 👋",
 "Never gonna tell a lie and hurt you ❤️",
];

// defines the response type for the test api
interface TestResponse {
  uptime: number;
  message: string;
  timestamp: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TestResponse>
) {
  // returns a random lyric from the lyrics array, the uptime of the server and the current timestamp
  res.status(200).json({
    uptime: process.uptime(),
    message: lyrics[Math.floor(Math.random() * lyrics.length)],
    timestamp: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
  });
}
