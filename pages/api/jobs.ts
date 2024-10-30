import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const data = await import('../../public/data.json');

    return res.status(200).json(data.default);
  } catch (error) {
    console.error('Error fetching jobs:', error);

    return res.status(500).end();
  }
}
