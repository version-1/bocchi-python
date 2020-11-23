import React from 'react'
import Layout from '@/components/tempaltes/Layout'
import { Row, Col, Card } from 'antd'

interface Props {
  user?: any
}

const Dashboard: React.FC<Props> = ({ user }) => {
  if (user) {
    return null
  }
  return (
    <Layout>
      <Row
        align="middle"
        style={{
          padding: `32px`,
          minHeight: `100vh`,
        }}
      >
        <Col
          span={24}
          style={{
            minHeight: `100vh`,
          }}
        >
          <Card
            title="Dashboard"
            style={{
              height: `100vh`,
            }}
          />
        </Col>
      </Row>
    </Layout>
  )
}

export default Dashboard

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
