import React, { useState } from 'react'
import { Form, Input, Button, Card } from 'antd'

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
      <Form {...layout} name="basic">
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: `Please input your username!` }]}
        >
          <Input
            value={username}
            onChange={(e: any) => {
              setUsername(e.target.value)
            }}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: `Please input your password!` }]}
        >
          <Input.Password
            value={password}
            onChange={(e: any) => {
              setPassword(e.target.value)
            }}
          />
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
