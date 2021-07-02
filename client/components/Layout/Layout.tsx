import React, { ReactNode } from 'react'
import Head from 'next/head'
import Menu from './Menu';
import Footer from './Footer';
import layoutStyles from './Layout/Layout.module.css';
type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'Workflow Manager' }: Props) => {

  return (
    <div className={layoutStyles.layout_wrapper}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Menu />
      </header>
      <div className={layoutStyles.content}>
        {children}
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout
