import React from 'react'
import Head from 'next/head'
import { Global, css } from '@emotion/react'
import '@/assets/stylesheets/style.css'

interface Props {
  Component: any
  pageProps: any
}

export const GlobalStyles = (
  <Global
    styles={css`
      html,
      body {
        padding: 0;
        margin: 0;
      }
    `}
  />
)

const App: React.FC<Props> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Bocchi</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {GlobalStyles}
    <Component {...pageProps} />
  </>
)

export default App
