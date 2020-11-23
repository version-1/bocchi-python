import React from 'react'
import { Layout, Row, Col } from 'antd'
import LoginFrom from '@/components/organisms/LoginForm'

const { Header, Footer, Content } = Layout

const Home: React.FC = () => (
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

export default Home
