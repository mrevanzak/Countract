import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import { data } from '@/data/documents.data';

export default async function dokumen(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  if (req.method === 'GET') {
    res.status(200).json(data);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
