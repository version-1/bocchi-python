import { NextApiRequest, NextApiResponse } from 'next'
import axios, { Method } from 'axios'
import { setCookie, destroyCookie } from 'nookies'
import { baseUrl } from './index'

const POST = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<any> => {
  const { body: data, method } = req
  const apiRes = await axios.request({
    url: `${baseUrl}/auth`,
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

const DELETE = async (
  _req: NextApiRequest,
  res: NextApiResponse,
): Promise<any> => {
  res.statusCode = 200
  res.setHeader(`Content-Type`, `application/json`)
  destroyCookie({ res }, `jwt`, {
    path: `/`,
  })
  res.end()
}

const actionMap = {
  POST,
  DELETE,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<any> {
  const action = actionMap[req.method]
  if (!handler) {
    res.statusCode = 404
    res.end()
    return
  }

  action(req, res)
}
