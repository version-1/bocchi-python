import { NextApiRequest, NextApiResponse } from 'next'
import axios, { Method } from 'axios'
import nookies from 'nookies'
import { baseUrl } from '../index'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const cookies = nookies.get({ req })
  if (!req.headers.jwt && !cookies.jwt) {
    res.statusCode = 401
    res.end()
    return
  }
  const jwt = req.headers.jwt || cookies.jwt
  const { body: data, method } = req
  const { path } = req.query

  const url = `${baseUrl}/${(path as string[]).join(`/`)}/`
  try {
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
  } catch (error) {
    console.log(error.message)
    res.statusCode = error.response.status
    res.end(error.response.data)
  }
}
