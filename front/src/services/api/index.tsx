import axios, { AxiosResponse } from 'axios'

const client = axios.create({
  baseURL: process.env.NEXT_API_URL || `http://localhost:3000/api/v1`,
  timeout: 1000,
  withCredentials: true,
})

export const login = async ({
  username,
  password,
}: {
  username: string
  password: string
}): Promise<AxiosResponse<any>> => {
  return client.post(`/auth`, {
    username,
    password,
  })
}

export const fetchUser = async (jwt?: string): Promise<AxiosResponse<any>> => {
  const params = jwt ? { headers: { jwt: `${jwt}` } } : {}
  return client.get(`http://localhost:3000/api/v1/proxy/users`, params)
}

export const setToken = (token?: string) => {
  const jwt = token || localStorage.getItem(`jwt`)
  client.defaults.headers.common.Authorization = `JWT ${jwt}`
  localStorage.setItem(`jwt`, jwt)
}
