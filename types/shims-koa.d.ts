import Koa from 'koa';
import Router from 'koa-router';

export type Server = Koa<Koa.DefaultState, Koa.DefaultContext>;

export type Context = Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>;

export interface RouterContext extends Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>> {
    session: any
}