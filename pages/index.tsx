import React, { useCallback } from 'react';
import { NextPage, NextContext } from 'next';
import * as commonActions from '../redux/action';
import { request } from '../libs/github-api.lib';
import { AxiosResponse } from 'axios';
import { CommonState } from '../redux/reducer';
import { connect } from 'react-redux';
import { Root, UserInfo, Avatar, Login, Name, Bio, Email, UserRepos } from '../styles/Index.style';
import { IUserInfo } from '../types/user-info.interface';
import { Icon, Tabs } from 'antd';
import RepoComp from '../components/Repo';

export interface IndexPage {
    userRepos?: any;
    userStarred?: any;
    userInfo: IUserInfo | null;
}

const IndexPage: NextPage<IndexPage> = (props: IndexPage) => {
    const { userRepos, userStarred, userInfo } = props;

    if (userInfo) {
        return (
            <Root>
                <UserInfo>
                    <Avatar src={userInfo.avatar_url} alt="user avatar" />
                    <Login>{userInfo.login}</Login>
                    <Name>{userInfo.name}</Name>
                    <Bio>{userInfo.bio}</Bio>
                    <Email>
                        <Icon type="mail" style={{ marginRight: 10 }} />
                        <a href={`mailto:${userInfo.email}`}>{userInfo.email}</a>
                    </Email>
                </UserInfo>
                <Tabs defaultActiveKey="1" animated={false} style={{flexGrow: 1}}>
                    <Tabs.TabPane tab="我的仓库" key="1">
                        <UserRepos>
                            {
                                userRepos.map((repo: any) => (
                                    <RepoComp key={repo.id} repo={repo} />
                                ))
                            }
                        </UserRepos>

                    </Tabs.TabPane>
                    <Tabs.TabPane tab="我关注的仓库" key="2">
                        <UserRepos>
                            {
                                userStarred.map((repo: any) => (
                                    <RepoComp key={repo.id} repo={repo} />
                                ))
                            }
                        </UserRepos>

                    </Tabs.TabPane>
                </Tabs>


            </Root>
        )
    }
    return (
        <div>尚未登录</div>
    )
}

IndexPage.getInitialProps = async (ctx: NextContext) => {
    const { userInfo } = ctx.store.getState();
    const result: any = {};
    if (userInfo) {
        const userReposResp = await request({
            method: 'GET',
            data: {},
            url: '/user/repos'
        }, ctx.req);
        result.userRepos = userReposResp.data;

        const userStarredResp = await request({
            method: 'GET',
            data: {},
            url: '/user/starred'
        }, ctx.req);
        result.userStarred = userStarredResp.data;
    }

    return result;
}

const stateToProps = (state: CommonState) => {
    return {
        userInfo: state.userInfo
    };
}

export default connect(stateToProps)(IndexPage);
