import Koa from 'koa';
import Router from 'koa-router';
import next from 'next';
import session from 'koa-session';
import auth from './auth';
import RedisSessionStore from './session-store';
import IORedis from 'ioredis';
import githubApi from './api';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const router = new Router();
const server = new Koa();
const handle = app.getRequestHandler();
const redis = new IORedis(6379, '192.168.33.10');

app.prepare().then(() => {
    server.keys = ['hushukang develop github app'];
    const SESSION_CONFIG = {
        key: 'hsession',
        store: new RedisSessionStore(redis),
        maxAge: 60 * 1000 * 30
    }
    server.use(session(SESSION_CONFIG, server));
    auth(server);
    githubApi(server);
    
    server.use(router.routes());

    server.use(async (ctx: any, next) => {
        ctx.req.session = ctx.session;
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
    })

    server.listen(3000, () => {
        console.log('koa server listening on 3000');
    });
});
