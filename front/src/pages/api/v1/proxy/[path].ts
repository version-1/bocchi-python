import { NextApiRequest, NextApiResponse } from 'next'
import axios, { Method } from 'axios'
import { baseUrl } from '../index'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!req.headers.jwt) {
    res.statusCode = 401
    res.end()
    return
  }
  const { jwt } = req.headers
  const { body: data, method } = req
  const { path } = req.query

  const url = `${baseUrl}/${path}`
  const apiRes = await axios.request({
    url,
    data,
    method: method as Method,
    headers: {
      Authorization: `JWT ${jwt}`,
    },
  })

  res.statusCode = apiRes.status
  res.setHeader(`Content-Type`, `application/json`)
  res.end(JSON.stringify(apiRes.data))
}
