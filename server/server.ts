import Koa from 'koa';
import Router from 'koa-router';
import next from 'next';
import session from 'koa-session';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const router = new Router();
const server = new Koa();
const handle = app.getRequestHandler();

app.prepare().then(() => {
    server.keys = ['hushukang develop github app'];
    const SESSION_CONFIG = {
        key: 'hsession',
        maxAge: 60 * 1000 * 30
    }
    server.use(session(SESSION_CONFIG, server));

    // router.get ...

    server.use(router.routes());

    server.use(async (ctx, next) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
    })

    server.listen(3000, () => {
        console.log('koa server listening on 3000');
    });
});
