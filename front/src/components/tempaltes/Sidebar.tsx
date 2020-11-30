import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { Layout, Menu } from 'antd'
import { UserOutlined, LaptopOutlined } from '@ant-design/icons'
import { logout } from '@/services/api'

const { Sider } = Layout
const { SubMenu } = Menu

const Sidebar = () => {
  const router = useRouter()

  const onLogout = useCallback(async () => {
    const res = await logout()
    if (res.status === 200) {
      router.push(`/`)
    }
  }, [router])

  return (
    <Sider>
      <Menu
        mode="inline"
        defaultSelectedKeys={[`1`]}
        defaultOpenKeys={['tweet']}
        style={{ height: `100%`, borderRight: 0 }}
      >
        <Menu.Item key="1">ダッシュボード</Menu.Item>
        <SubMenu key="tweet" icon={<LaptopOutlined />} title="ツイート">
          <Menu.Item key="2">一覧</Menu.Item>
          <Menu.Item key="3">グループ</Menu.Item>
        </SubMenu>
        <Menu.Item key="4">スケジュール</Menu.Item>
        <SubMenu key="user" icon={<UserOutlined />} title="ユーザ">
          <Menu.Item key="5">プロフィール</Menu.Item>
          <Menu.Item key="6">設定</Menu.Item>
        </SubMenu>
        <Menu.Item key="9" onClick={onLogout}>
          ログアウト
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default Sidebar
