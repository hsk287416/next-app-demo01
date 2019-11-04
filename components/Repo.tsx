import React, { memo, useMemo, useCallback } from 'react';
import { NextPage } from 'next';
import { Root, BasicInfo, RepoTitle, RepoDesc, OtherInfo, License, LastUpdated, OpenIssues, LangStar, Lang, Stars } from '../styles/Repo.style';
import Link from 'next/link';
import { Icon } from 'antd';
import dayjs from 'dayjs';

const RepoComp: NextPage<any> = (props: any) => {
    const { repo } = props;
    const { license } = repo;

    const licenseStr = useMemo(() => {
        return license ? `${license.spdx_id} license` : '';
    }, [license]);
    const formatTime = useCallback((date: string) => {
        return dayjs(date).format('YYYY-MM-DD');
    }, []);

    return (
        <Root>
            <BasicInfo>
                <RepoTitle>
                    <Link href={`/detail?owner=${repo.owner.login}&name=${repo.name}`} >
                        <a>{repo.full_name}</a>
                    </Link>
                </RepoTitle>
                <RepoDesc>{repo.description}</RepoDesc>
                <OtherInfo>
                    {
                        licenseStr ? (
                            <License>{licenseStr}</License>
                        ) : null
                    }
                    <LastUpdated>{formatTime(repo.updated_at)}</LastUpdated>
                    <OpenIssues>{repo.open_issues_count} open issues</OpenIssues>
                </OtherInfo>
            </BasicInfo>
            <LangStar>
                <Lang>{repo.languate}</Lang>
                <Stars>
                    {repo.stargazers_count}
                    <Icon type="star" theme="filled" style={{paddingLeft: 6}}/>
                </Stars>
            </LangStar>
        </Root>
    )
}

export default memo(RepoComp);
