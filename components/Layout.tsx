import React, { useState, useCallback } from 'react';
import { Layout, Input } from 'antd';
import { Header, HeaderLeft, GitLogo, Footer, Content } from '../styles/Layout.style';
import AvatarComp, { AvatarCompProp } from './Avatar';
import { CommonState } from '../redux/reducer';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../redux/action';
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface LayoutCompProp extends AvatarCompProp {
  title?: string;
  children: any;
}

const LayoutComp: React.FC<LayoutCompProp> = (props: LayoutCompProp) => {
  const { children, avatar_url, html_url, logout } = props;

  const router = useRouter();
  const key = router.query.key || '';
  const [search, setSearch] = useState(key);
  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);
  const handleOnSearch = useCallback(() => {
    router.push(`/search?key=${search}`);
  }, [search]);

  return (
    <Layout className="layout">
      <Header>
        <HeaderLeft>
          <Link href="/">
            <div className="log">
              <GitLogo type="github" />
            </div>
          </Link>
          <div>
            <Input.Search placeholder="搜索仓库" value={search} onChange={handleSearchChange} onSearch={handleOnSearch} />
          </div>
        </HeaderLeft>
        <div className="user">
          <AvatarComp avatar_url={avatar_url} html_url={html_url} logout={logout} />
        </div>
      </Header>
      <Content style={{ padding: '20px 50px' }}>
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
