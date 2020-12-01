import React, { useState } from 'react'
import Layout from '@/components/tempaltes/Layout'
import Modal from '@/components/molecules/Modal'
import {
  Table,
  Button,
  Form,
  Input,
  Tag,
  Radio,
  Row,
  Col,
  Card,
  Select,
} from 'antd'
import {
  fetchUserTweets,
  fetchUserCollections,
  createUserTweet,
  withCookie,
} from '@/services/api'
import { parseCookies } from 'nookies'
import { NextPageContext } from 'next'

const { Option } = Select

interface Props {
  tweets?: any
  collections?: any[]
}

const format = (datetime: string) => datetime.slice(0, 16).replace('T', ' ')

const columns = [
  {
    title: 'ID',
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
    dataIndex: 'collections',
    render: (collections: any[], record: any) =>
      collections.map((collection: any) => {
        return <Tag key={collection.key}>{collection.name}</Tag>
      }),
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    render: format,
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    render: format,
  },
  {
    title: 'Action',
    render: (content: string, record: any) => (
      <Row>
        <Button type="link" disabled>
          Edit
        </Button>
        <Button type="link" danger>
          Delete
        </Button>
      </Row>
    ),
  },
]

const Dashboard: React.FC<Props> = ({ collections = [], tweets }) => {
  const [data, setTweets] = useState<any[]>(Object.values(tweets))
  const [form] = Form.useForm()

  const onNew = (): void => {
    Modal.show({
      title: 'New Tweet',
      component: (
        <Form
          name="basic"
          onFinish={async (values: any) => {
            Modal.hide()
            await createUserTweet({ ...values, status: Number(values.status) })
            const res = await fetchUserTweets()()
            setTweets(res.data)
          }}
          initialValues={{
            title: '',
            content: ``,
            status: '0',
            collectionIds: [],
          }}
        >
          <Form.Item
            label="title"
            name="title"
            rules={[{ required: true, message: `Please input title` }]}
          >
            <Input placeholder="admin" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="content"
            rules={[{ required: true, message: `Please input content` }]}
          >
            <Input.TextArea placeholder="つぶやきの内容を書く" />
          </Form.Item>
          <Form.Item label="Collections" name="collection_ids">
            <Select mode="multiple" placeholder="Please select">
              {collections.map((collection: any) => {
                return (
                  <Option key={collection.key} value={collection.id}>
                    {collection.name}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Radio.Group>
              <Radio.Button value="0">Draft</Radio.Button>
              <Radio.Button value="100">Publish</Radio.Button>
              <Radio.Button value="900">Pending</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      ),
    })
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
          >
            <Button type="primary" onClick={onNew}>
              New Tweet
            </Button>
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
  let tweetsRes: any
  let collectionRes: any
  const cookie = parseCookies(context)
  try {
    tweetsRes = await fetchUserTweets(withCookie(cookie.jwt))()
    collectionRes = await fetchUserCollections(withCookie(cookie.jwt))()
  } catch (error) {
    return {
      props: {}, // will be passed to the page component as props
    }
  }
  const { data: tweets } = tweetsRes
  const { data: collections } = collectionRes

  const tweetsMap = tweets.reduce((acc: any, item: any) => {
    return { ...acc, [item.id]: item }
  }, {})

  return {
    props: { tweets: tweetsMap, collections },
  }
}
