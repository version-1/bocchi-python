import { NextApiRequest, NextApiResponse } from 'next'
import { destroyCookie } from 'nookies'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === `DELETE`) {
    res.statusCode = 200
    res.setHeader(`Content-Type`, `application/json`)
    destroyCookie({ res }, `jwt`)
    res.end()
  }
}
