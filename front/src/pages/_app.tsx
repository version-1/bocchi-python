import React, { createContext, useState } from 'react'
import Head from 'next/head'
import Modal from '@/components/molecules/Modal'
import { Global, css } from '@emotion/react'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
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

const queryCache = new QueryCache()

const App: React.FC<Props> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Bocchi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {GlobalStyles}
      <ReactQueryCacheProvider queryCache={queryCache}>
        <Component {...pageProps} />
      </ReactQueryCacheProvider>
      <Modal />
    </>
  )
}

export default App
