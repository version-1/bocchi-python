import { NextApiRequest, NextApiResponse } from 'next'
import axios, { Method } from 'axios'
import { setCookie } from 'nookies'

const baseUrl = process.env.NEXT_API_URL || `http://localhost:8000/api/v1/`

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { body: data, method } = req

  const apiRes = await axios.request({
    url: `${baseUrl}auth`,
    data,
    method: method as Method,
  })

  res.statusCode = apiRes.status
  res.setHeader(`Content-Type`, `application/json`)
  setCookie({ res }, `jwt`, apiRes.data.token, {
    secure: process.env.NODE_ENV === `production`,
    httpOnly: true,
    sameSite: `strict`,
    path: `/`,
  })
  res.end(JSON.stringify(apiRes.data))
}
