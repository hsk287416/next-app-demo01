import { Layout, Icon } from 'antd';
import styled from 'styled-components';

const headerHeight = 64;
const footerHeight = 69;

export const Header = styled(Layout.Header)`
    display: flex;
    justify-content: space-between;
    height: ${headerHeight}px;
`;
export const HeaderLeft = styled.div`
    display: flex;
    justify-content: flex-start;
`;

export const GitLogo = styled(Icon)`
    color: #ffffff;
    font-size: 40px;
    display: block;
    padding-top: 10px;
    margin-right: 20px;
`;

export const Content = styled(Layout.Content)`
    min-height: calc(100vh - ${headerHeight}px - ${footerHeight}px);
`;

export const Footer = styled(Layout.Footer)`
    text-align: center;
    height: ${footerHeight}px;
`;