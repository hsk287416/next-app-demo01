import styled from "styled-components";

export const Root = styled.div`
    display: flex;
    align-items: flex-start;
`;

export const UserInfo = styled.div`
    width: 200px;
    margin-right: 40px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
`;

export const Avatar = styled.img`
    width: 100%;
    border-radius: 5px;
`;

export const Login = styled.span`
    font-weight: 800;
    font-size: 20px;
    margin-top: 20px;
`;

export const Name = styled.span`
    font-size: 16px;
    color: #777;
`;

export const Bio = styled.span`
    margin-top: 20px;
    color: #333;
`;

export const Email = styled.p`
    
`;

export const UserRepos = styled.div`
    flex-grow: 1;
    &>div:not(:nth-child(1)) {
        border-top: 1px solid #eee;
        padding-top: 20px;
    }
`;