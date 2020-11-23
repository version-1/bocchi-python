import React from 'react'
import { Layout } from 'antd'

const { Header, Footer, Content, Sider } = Layout

interface Props {
  hasSider?: boolean
  children?: JSX.Element[] | JSX.Element
}

const LayoutComponent: React.FC<Props> = ({ hasSider = true, children }) => {
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
        {hasSider && <Sider>Sider</Sider>}
        <Content>{children}</Content>
      </Layout>
      <Footer />
    </Layout>
  )
}

export default LayoutComponent
