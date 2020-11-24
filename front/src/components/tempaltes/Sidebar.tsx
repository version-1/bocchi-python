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
        <Menu.Item key="9" onClick={onLogout}>
          ログアウト
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default Sidebar
