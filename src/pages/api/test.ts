import type { NextApiRequest, NextApiResponse } from 'next';

const lyrics: string[] = [
 "Never gonna give you up ⬆️",
 "Never gonna let you down ⬇️",
 "Never gonna run around and desert you 🌵",
 "Never gonna make you cry 😢",
 "Never gonna say goodbye 👋",
 "Never gonna tell a lie and hurt you ❤️",
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{data: string}>
) {
  res.status(200).json({
    data: lyrics[Math.floor(Math.random() * lyrics.length)]
  });
}
