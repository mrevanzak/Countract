import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import { accessedUser, data } from '@/data/documents.data';

export default async function dokumen_detail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  if (req.method === 'GET') {
    const token = req.headers.authorization?.split(' ')[1];
    const { id } = req.query;

    const value = data.filter((item) => item.id === Number(id))[0];

    if (token === 'dummy-token') {
      return res.status(200).json({
        ...value,
        pihak_berakses: accessedUser,
      });
    } else {
      return res.status(401).json({
        code: 401,
        status: 'Error',
        message: "You're not authorized to access this resource",
      });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
