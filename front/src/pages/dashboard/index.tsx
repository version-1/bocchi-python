import React from 'react'
import Layout from '@/components/tempaltes/Layout'
import { Row, Col, Card } from 'antd'

interface Props {
  user?: any
}

const Home: React.FC<Props> = ({ user }) => {
  if (user) {
    return null
  }
  return (
    <Layout>
      <Row
        align="middle"
        style={{
          minHeight: `100vh`,
        }}
      >
        <Card>dashboard</Card>
      </Row>
    </Layout>
  )
}

export default Home

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
