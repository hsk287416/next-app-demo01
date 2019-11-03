import React, { memo, useMemo } from 'react';
import { Avatar, Tooltip, Dropdown, Menu } from 'antd';
import oauthConfig from '../config/oauth.config';

export interface AvatarCompProp {
    avatar_url: string;
    html_url: string;
    logout: () => void;
}

const AvatarComp: React.FC<AvatarCompProp> = (props: AvatarCompProp) => {
    const { avatar_url, html_url, logout } = props;

    const loginUrl = `${oauthConfig.github.oAuthUrl}`;

    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" href={html_url}>Github主页</a>
            </Menu.Item>
            <Menu.Item>
                <a onClick={logout}>注销</a>
            </Menu.Item>
        </Menu>
    );

    if (avatar_url && html_url) {
        return (
            <Dropdown overlay={menu}>
                <Avatar size={40} src={avatar_url} />
            </Dropdown>
        )
    }

    return (
        <Tooltip placement="bottomRight" title="点击登录">
            <a href={loginUrl}>
                <Avatar size={40} icon="user" />
            </a>
        </Tooltip>
    )
}

export default memo(AvatarComp);