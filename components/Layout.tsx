import React, { useState, useCallback } from 'react';
import { Layout, Breadcrumb, Input } from 'antd';
import { Header, HeaderLeft, GitLogo, Footer, Content } from '../styles/Layout.style';
import AvatarComp, { AvatarCompProp } from './Avatar';
import { CommonState } from '../redux/reducer';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../redux/action';

export interface LayoutCompProp extends AvatarCompProp {
  title?: string;
  children: any;
}

const LayoutComp: React.FC<LayoutCompProp> = (props: LayoutCompProp) => {
  const { children, avatar_url, html_url, logout } = props;

  const [search, setSearch] = useState('');
  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);
  const handleOnSearch = useCallback(() => {

  }, []);

  return (
    <Layout className="layout">
      <Header>
        <HeaderLeft>
          <div className="log">
            <GitLogo type="github" />
          </div>
          <div>
            <Input.Search placeholder="搜索仓库" value={search} onChange={handleSearchChange} onSearch={handleOnSearch} />
          </div>
        </HeaderLeft>
        <div className="user">
          <AvatarComp avatar_url={avatar_url} html_url={html_url} logout={logout} />
        </div>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          {children}
        </div>
      </Content>
      <Footer>Develop by hushukang</Footer>
    </Layout>
  )
}

const stateToProps = (state: CommonState) => {
  const { userInfo } = state;
  let avatar_url = '';
  let html_url = '';
  if (userInfo) {
    avatar_url = userInfo.avatar_url;
    html_url = userInfo.html_url;
  }
  return {
    avatar_url,
    html_url
  }
}

const dispatchToProps = (dispatch: Dispatch) => {
  return {
    'logout': () => dispatch(commonActions.logoutAction())
  }
}

export default connect(stateToProps, dispatchToProps)(LayoutComp);
