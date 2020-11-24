import React from 'react'
import Layout from '@/components/tempaltes/Layout'
import { Row, Col, Card } from 'antd'
import { fetchUserTweets, withCookie } from '@/services/api'
import { parseCookies } from 'nookies'
import { NextPageContext } from 'next'

interface Props {
  tweets?: any
}

const Dashboard: React.FC<Props> = ({ tweets }) => {
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

export async function getServerSideProps(
  context: NextPageContext,
): Promise<any> {
  let res: any
  const cookie = parseCookies(context)
  try {
    res = await fetchUserTweets(withCookie(cookie.jwt))()
  } catch (error) {
    return {
      props: {}, // will be passed to the page component as props
    }
  }
  const { data: tweets } = res

  const tweetsMap = tweets.reduce((acc: any, item: any) => {
    return { ...acc, [item.id]: item }
  }, {})

  return {
    props: { tweets: tweetsMap },
  }
}
