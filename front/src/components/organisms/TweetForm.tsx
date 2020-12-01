import React, { useState } from 'react'
import { Button, Form, Input, Radio, Select } from 'antd'

interface Props {
  collections: any[]
  initialValues: any
  onFinish: any
}

const { Option } = Select

const TweetForm: React.FC<Props> = ({
  collections,
  initialValues,
  onFinish,
}) => {
  const [count, setCount] = useState(0)

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      initialValues={initialValues}
      onValuesChange={(changedValue, allValues) => {
        setCount(allValues.content.length)
      }}
    >
      <Form.Item
        label="title"
        name="title"
        rules={[{ required: true, message: `Please input title` }]}
      >
        <Input placeholder="タイトルを入力してください" />
      </Form.Item>
      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: `Please input content` }]}
      >
        <Input.TextArea rows={10} placeholder="つぶやきの内容を書く" />
      </Form.Item>
      <Form.Item>
        <span>{count} / 140</span>
      </Form.Item>
      <Form.Item
        label="Collections"
        name="collection_ids"
        rules={[{ required: true, message: `Please select collection` }]}
      >
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
  )
}

export default TweetForm
