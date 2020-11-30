import React, { useState } from 'react'
import Layout from '@/components/tempaltes/Layout'
import { Table, Button, Row, Col, Card } from 'antd'
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
    key: 'uuid',
    render: (content: string, record: any) => (
      <span key={record.uuid}>
        {content.length > 80 ? `${content.slice(0, 80)} ...` : content}
      </span>
    ),
  },
  {
    title: 'Collection',
    dataIndex: 'collection',
    key: 'uuid',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'uuid',
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    key: 'uuid',
  },
  {
    title: 'Action',
    render: (content: string, record: any) => (
      <Row>
        <Button type="link">Edit</Button>
        <Button type="link" danger>
          Delete
        </Button>
      </Row>
    ),
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
            <Button type="primary">New Tweet</Button>
            <Table
              dataSource={data}
              columns={columns}
              rowKey={(record: any) => record.uuid}
            />
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
