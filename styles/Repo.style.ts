import styled from 'styled-components';

export const Root = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const BasicInfo = styled.div`

`;

export const RepoTitle = styled.h3`
    font-size: 20px;
`;

export const RepoDesc = styled.p`
    width: 400px;
`;;

export const OtherInfo = styled.p`
    &>span {
        margin-right: 10px;
    }
`;

export const License = styled.span`

`;

export const LastUpdated = styled.span`

`;

export const OpenIssues = styled.span`

`;

export const LangStar = styled.div`
    display: flex;
    &>span {
        width: 120px;
        text-align: right;
    }
`;

export const Lang = styled.span`

`;

export const Stars = styled.span`

`;
