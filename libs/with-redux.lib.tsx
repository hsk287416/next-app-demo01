import { CommonState, initialState } from "../redux/reducer";
import { initializeStore } from "../redux/store";
import { NextPage, NextContext } from "next";
import { Store } from "redux";

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(state: CommonState): Store<CommonState> {
    if (isServer) {
        return initializeStore(state);
    }
    if (!(window as any)[__NEXT_REDUX_STORE__]) {
        (window as any)[__NEXT_REDUX_STORE__] = initializeStore(state);
    }
    return (window as any)[__NEXT_REDUX_STORE__];
}

const withRedux = (Comp: any) => {
    const WithReduxComp = ({ state, ...props }: any) => {
        const store = getOrCreateStore(state);
        return (
            <Comp {...props} store={store} />
        )
    }
    if (Comp.getInitialProps) {
        WithReduxComp.getInitialProps = async (context: any) => {
            let state = initialState;
            if (isServer) {
                const { req } = context.ctx;
                const session = req.session;
                if (session && session.userInfo) {
                    state.userInfo = session.userInfo;
                }
            }
            const reduxStore = getOrCreateStore(state);
            context.ctx.store = reduxStore;
            let appProps = typeof Comp.getInitialProps === 'function'
                ? await Comp.getInitialProps(context)
                : {}
            return {
                ...appProps,
                state: reduxStore.getState()
            }
        }
    }
    return WithReduxComp;
}

export default withRedux;