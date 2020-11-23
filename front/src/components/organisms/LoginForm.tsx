import React, { useState } from 'react'
import { Form, Input, Button, Card } from 'antd'
import { login, setToken } from '@/services/api'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

const LoginForm = () => {
  const [username, setUsername] = useState(``)
  const [password, setPassword] = useState(``)

  return (
    <Card>
      <Form
        {...layout}
        name="basic"
        onFinish={async (values) => {
          const res = await login(values)
          if (res.data) {
            setToken(res.data.token)
          }
        }}
        initialValues={{
          username: ``,
          password: ``,
        }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: `Please input your username!` }]}
        >
          <Input placeholder="admin" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: `Please input your password!` }]}
        >
          <Input.Password placeholder="*********" />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default LoginForm
