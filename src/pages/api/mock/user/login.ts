import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  if (req.method === 'POST') {
    res.status(200).json({
      id: 1,
      name: 'Test',
      token: 'dummy-token',
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
