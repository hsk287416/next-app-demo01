import React, { useState, useCallback, memo } from 'react';
import { Layout, Breadcrumb, Input, Avatar } from 'antd';
import { Header, HeaderLeft, GitLogo, Footer, Content } from '../styles/Layout.style';
import AvatarComp, { AvatarCompProp } from './Avatar';

export interface LayoutCompProp extends AvatarCompProp {
  title?: string;
  children: any;
}

const LayoutComp: React.FC<LayoutCompProp> = (props: LayoutCompProp) => {
  const { children, avatar_url, html_url } = props;

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
          <AvatarComp avatar_url={avatar_url} html_url={html_url}/>
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

export default memo(LayoutComp);
