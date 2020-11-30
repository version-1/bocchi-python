import React, { useMemo, useEffect, useState } from 'react'
import Layout from '@/components/tempaltes/Layout'
import { Table, Row, Col, Card } from 'antd'
import { fetchUserTweets, withCookie } from '@/services/api'
import { parseCookies } from 'nookies'
import { NextPageContext } from 'next'

interface Props {
  tweets?: any
}

const columns = [
  {
    title: 'Uuid',
    dataIndex: 'uuid',
    key: 'uuid',
  },
  {
    title: 'Content',
    dataIndex: 'content',
    key: 'content',
    render: (content: string) => (
      <span>
        {content.length > 80 ? `${content.slice(0, 80)} ...` : content}
      </span>
    ),
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
]

const Dashboard: React.FC<Props> = ({ tweets }) => {
  const [data, setTweets] = useState<any[]>(Object.values(tweets))
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
          >
            <Table dataSource={data} columns={columns} />
          </Card>
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
