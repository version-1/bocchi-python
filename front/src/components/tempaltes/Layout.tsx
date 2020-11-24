import React from 'react'
import { Layout } from 'antd'
import Sidebar from '@/components/tempaltes/Sidebar'
import useAuth from '@/hooks/useAuth'

const { Header, Footer, Content } = Layout

interface Props {
  hasSider?: boolean
  children?: JSX.Element[] | JSX.Element
}

const LayoutComponent: React.FC<Props> = ({ hasSider = true, children }) => {
  const { user } = useAuth()
  return (
    <Layout>
      <Header
        style={{
          color: `white`,
        }}
      >
        Bocchi
      </Header>
      <Layout>
        {hasSider && <Sidebar />}
        <Content>{children}</Content>
      </Layout>
      <Footer />
    </Layout>
  )
}

export default LayoutComponent
