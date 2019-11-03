import { Server, Context } from '../types/shims-koa';
import oAuthConfig from '../config/oauth.config';
import axios, { AxiosResponse } from 'axios';

export default (server: Server) => {
    server.use(async (ctx: Context, next) => {
        const { path, session } = ctx;
        if (path.startsWith('/github/')) {
            const githubAuth = session.githubAuth;
            const githubApiUrl = `${oAuthConfig.github.apiUrl}${ctx.url.replace('/github/', '/')}`;
            const token = githubAuth && githubAuth.access_token;
            const headers = {
                Authorization: ''
            };
            if (token) {
                headers.Authorization = `${githubAuth.token_type} ${token}`;
            }
            try {
                const result: AxiosResponse<any> = await axios.get(githubApiUrl, {
                    'headers': headers
                });
                if (result.status === 200) {
                    ctx.response.body = result.data;
                } else {
                    ctx.status = result.status;
                    ctx.response.body = {
                        success: false
                    };
                }
            } catch (err) {
                console.error(err);
                ctx.status = 500;
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