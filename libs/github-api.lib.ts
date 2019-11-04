import axios, { Method } from 'axios';
import oAuthConfig from '../config/oauth.config';

export interface IRequestConfig {
    method: Method;
    url: string;
    data?: any;
    headers?: any;
}

export async function request(config: IRequestConfig, req: any) {
    let isServer = typeof window === 'undefined';
    if (isServer) {
        const headers: any = {};
        const session = req.session;
        if (session) {
            const githubAuth = session.githubAuth || {};
            if (githubAuth.access_token) {
                headers['Authorization'] = `${githubAuth.token_type} ${githubAuth.access_token}`;
            }
        }
        config.headers = headers;
        return await requestGithub(config);
    } else {
        return await axios({
            method: config.method,
            url: `/github${config.url}`,
            data: config.data
        })
    }
}

export async function requestGithub(config: IRequestConfig) {
    const url = `${oAuthConfig.github.commonApiUrl}${config.url}`;
    return await axios({
        method: config.method,
        url: url,
        headers: config.headers,
        data: config.data
    })
}