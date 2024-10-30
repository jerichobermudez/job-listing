import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await import('../../public/data.json');

    res.status(200).json(data.default);
  } catch (error) {
    console.error('Error fetching jobs:', error);

    res.status(500).json([]);
  }
}
