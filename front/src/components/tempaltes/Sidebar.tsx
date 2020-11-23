import React from 'react'
import { Layout, Menu } from 'antd'
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons'

const { Sider } = Layout
const { SubMenu } = Menu

const Sidebar = () => {
  return (
    <Sider>
      <Menu
        mode="inline"
        defaultSelectedKeys={[`1`]}
        defaultOpenKeys={[`sub1`]}
        style={{ height: `100%`, borderRight: 0 }}
      >
        <SubMenu key="sub2" icon={<LaptopOutlined />} title="ツイート">
          <Menu.Item key="5">一覧</Menu.Item>
          <Menu.Item key="6">グループ</Menu.Item>
        </SubMenu>
        <Menu.Item key="6">スケジュール</Menu.Item>
        <SubMenu key="sub1" icon={<UserOutlined />} title="ユーザ">
          <Menu.Item key="1">プロフィール</Menu.Item>
          <Menu.Item key="2">設定</Menu.Item>
        </SubMenu>
        <Menu.Item key="9">ログアウト</Menu.Item>
      </Menu>
    </Sider>
  )
}

export default Sidebar
