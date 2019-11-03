import Koa from 'koa';
import axios from 'axios';
import oauthConfig from '../config/oauth.config';
import { Server, Context } from '../types/shims-koa';

const { clientId, clientSecret, tokenUrl, apiUrl } = oauthConfig.github;

export default (server: Server) => {
    server.use(async (ctx: Context, next) => {
        if (ctx.path === '/auth') {
            const { code } = ctx.query;
            if (!code) {
                ctx.response.body = 'code not exist';
                return;
            }
            const result = await axios({
                method: 'POST',
                url: tokenUrl,
                data: {
                    'client_id': clientId,
                    'client_secret': clientSecret,
                    'code': code,
                },
                headers: {
                    'Accept': 'application/json'
                }
            })
            if (result.status === 200) {
                ctx.session.githubAuth = result.data;
                const { access_token, token_type } = result.data;
                const userInfoResp = await axios({
                    method: 'GET',
                    url: apiUrl,
                    headers: {
                        'Authorization': `${token_type} ${access_token}`
                    }
                })
                ctx.session.userInfo = userInfoResp.data
                ctx.redirect('/');
            } else {
                ctx.response.body = `request token failed`;
            }
        } else {
            await next();
        }
    })

    server.use(async (ctx: Context, next) => {
        const path = ctx.path;
        if (path === '/logout') {
            ctx.session = null;
            ctx.response.status = 200;
            ctx.set('Content-Type', 'application/json');
        } else {
            await next();
        }
    })
}