import { memo } from "react";
import { NextPage } from "next";
import styled from "styled-components";
import { Spin } from "antd";

const Root = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(255, 255, 255, 0.3);
    z-index: 10001;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PageLoading: NextPage = () => {
    return (
        <Root>
            <Spin />
        </Root>
    )
}

export default memo(PageLoading);
