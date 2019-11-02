import * as React from 'react';
import { NextPage, NextContext } from 'next';
import * as commonActions from '../redux/action';

const IndexPage: NextPage = () => {
    return (
        <div>this is index</div>
    )
}

IndexPage.getInitialProps = async (ctx: NextContext) => {
    const { dispatch } = ctx.store;
    dispatch(commonActions.changeNameAction('狗宝宝'));
    return {};
}

export default IndexPage;
