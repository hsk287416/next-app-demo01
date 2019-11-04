import { Server, Context } from '../types/shims-koa';
import oAuthConfig from '../config/oauth.config';
import axios, { AxiosResponse } from 'axios';
import { requestGithub, IRequestConfig } from '../libs/github-api.lib';

export default (server: Server) => {
    server.use(async (ctx: Context, next) => {
        const { path, session } = ctx;
        if (path.startsWith('/github/')) {
            const headers: any = {};
            const githubAuth = session && session.githubAuth || {};
            if (githubAuth.access_token) {
                headers['Authorization'] = `${githubAuth.token_type} ${githubAuth.access_token}`;
            }
            const config: IRequestConfig = {
                method: 'GET',
                url: `${ctx.url.replace('/github/', '/')}`,
                headers: headers,
                data: ctx.request.body || {}
            };
            const result: AxiosResponse<any> = await requestGithub(config);
            if (result.status === 200) {
                ctx.response.body = result.data;
            } else {
                ctx.status = result.status;
                ctx.response.body = {
                    success: false
                };
            }
            ctx.set('Content-Type', 'application/json');
        } else {
            await next();
        }
    })
}
