import React from 'react'
import { Layout, Row, Col } from 'antd'
import LoginFrom from '@/components/organisms/LoginForm'
import { fetchUser } from '@/services/api'
import { parseCookies } from 'nookies'

const { Header, Footer, Content } = Layout

interface Props {
  user?: any
}

const Home: React.FC<Props> = ({ user }) => {
  if (user) {
    return null
  }
  return (
    <Layout>
      <Header
        style={{
          color: `white`,
        }}
      >
        Bocchi
      </Header>
      <Content>
        <Row
          align="middle"
          style={{
            minHeight: `100vh`,
          }}
        >
          <Col span={8} />
          <Col span={8}>
            <LoginFrom />
          </Col>
          <Col span={8} />
        </Row>
      </Content>
      <Footer />
    </Layout>
  )
}

export default Home

export async function getServerSideProps(context) {
  let res
  const cookie = parseCookies(context)
  try {
    res = await fetchUser(cookie.jwt)
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
