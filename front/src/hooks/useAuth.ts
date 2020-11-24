import { useMemo, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { logout, fetchUser } from '@/services/api'

const useAuth = (): { user: any; needAuth: boolean } => {
  const { pathname, push } = useRouter()
  const [user, setUser] = useState()

  const needAuth = useMemo(() => !!pathname.match(/\/dashboard*/), [pathname])

  useEffect(() => {
    if (!process.browser) {
      return
    }

    if (!needAuth) {
      return
    }

    const check = async (): Promise<void> => {
      try {
        const { data } = await fetchUser()()
        setUser(data)
      } catch (error) {
        await logout()
        push(`/`)
      }
    }

    check()
  }, [])

  return { user, needAuth }
}

export default useAuth
