import React from 'react'
import { useRouter } from 'next/router'
import { Row, Col, Spin } from 'antd'
import Layout from '@/components/tempaltes/Layout'
import LoginFrom from '@/components/organisms/LoginForm'
import { fetchUser, withCookie } from '@/services/api'
import { parseCookies } from 'nookies'
import { NextPageContext } from 'next'

interface Props {
  user?: any
}

const Home: React.FC<Props> = ({ user }) => {
  const router = useRouter()
  if (user) {
    if (typeof window !== `undefined`) {
      router.push(`/dashboard`)
      return <></>
    }
    return (
      <Row
        align="middle"
        style={{
          minHeight: `100vh`,
        }}
      >
        <Col span={24}>
          <Spin style={{ display: `block` }} size="large" />
        </Col>
      </Row>
    )
  }
  return (
    <Layout hasSider={false}>
      <Row
        style={{
          marginTop: '100px',
          minHeight: '100vh',
        }}
      >
        <Col span={8}>
          <LoginFrom />
        </Col>
      </Row>
    </Layout>
  )
}

export default Home

export async function getServerSideProps(
  context: NextPageContext,
): Promise<{ props: { user?: any } }> {
  let res: any
  const cookie = parseCookies(context)
  try {
    res = await fetchUser(withCookie(cookie.jwt))()
  } catch (error) {
    return {
      props: {}, // will be passed to the page component as props
    }
  }
  const { data: user } = res

  return {
    props: { user }, // will be passed to the page component as props
  }
}
