import axios, { AxiosResponse } from 'axios'

const baseURL = process.env.NEXT_API_URL || `http://localhost:3000/api/v1`

const instance = axios.create({
  baseURL,
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
  return instance.post(`/auth`, {
    username,
    password,
  })
}

export const fetchUser = (client?: any) => {
  return async (): Promise<AxiosResponse<any>> => {
    const c = client || instance
    return c.get(`${baseURL}/proxy/users`)
  }
}

export const withCookie = (token: string) => {
  instance.defaults.headers.jwt = token
  return instance
}
