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

export const logout = async (): Promise<AxiosResponse<void>> => {
  return instance.delete(`/auth`)
}

export const createUserTweet = async (data: {
  title: string
  content: string
  contentIds: number[]
  status: string
}): Promise<AxiosResponse<void>> => {
  return instance.post(`/proxy/users/tweets/`, data)
}

export const fetchUser = (client?: any) => {
  return async (): Promise<AxiosResponse<any>> => {
    const c = client || instance
    return c.get(`${baseURL}/proxy/users`)
  }
}

export const fetchUserTweets = (client?: any) => {
  return async (): Promise<AxiosResponse<any>> => {
    const c = client || instance
    return c.get(`${baseURL}/proxy/users/tweets/`)
  }
}

export const fetchUserCollections = (client?: any) => {
  return async (): Promise<AxiosResponse<any>> => {
    const c = client || instance
    return c.get(`${baseURL}/proxy/users/tweet-collections/`)
  }
}

export const withCookie = (token: string) => {
  instance.defaults.headers.jwt = token
  return instance
}
