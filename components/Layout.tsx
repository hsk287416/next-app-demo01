import * as React from 'react';
import Head from 'next/head';
import { TLayoutProps } from '../types/layout-props.type';

const Layout: React.FC<TLayoutProps> = (props: TLayoutProps) => {
  const { title, children } = props;
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        头部
      </header>
      {children}
      <footer>
        尾部
      </footer>
    </div>
  )
}

export default Layout
