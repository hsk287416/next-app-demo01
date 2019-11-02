import * as React from 'react';
import Layout from '../components/Layout';
import { NextPage, NextContext } from 'next';

const IndexPage: NextPage = () => {
    return (
        <Layout title="Home">
            this is index page.
        </Layout>
    )
}

IndexPage.getInitialProps = async (ctx: NextContext) => {

    return {};
}

export default IndexPage;
