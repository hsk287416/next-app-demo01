import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const SearchPage: NextPage = (props: any) => {
    const router = useRouter();
    const { key } = router.query;

    return (
        <div>{key}</div>
    )
}

export default SearchPage;
