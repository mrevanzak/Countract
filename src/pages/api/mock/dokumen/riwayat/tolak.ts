import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

export default async function tolak(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  if (req.method === 'POST') {
    const token = req.headers.authorization?.split(' ')[1];
    if (token === 'dummy-token') {
      return res.status(200).json({
        code: 200,
        message: `Successfully change history of id ${req.body.id_riwayat}`,
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
