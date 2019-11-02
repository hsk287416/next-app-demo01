import App, { AppInitialProps, AppProps, AppContext } from 'next/app';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import LayoutComp from '../components/Layout';
import withRedux from '../libs/with-redux.lib';


class MyApp extends App<AppProps> {

    static async getInitialProps(appContext: AppContext): Promise<AppInitialProps> {
        const { Component, ctx } = appContext;
        let pageProps = {}
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        return {
            pageProps
        }
    }

    render() {
        const { Component, pageProps, store } = this.props;
        const { userInfo } = store.getState();
        let avatar_url = '';
        let html_url = '';
        if (userInfo) {
            avatar_url = userInfo.avatar_url;
            html_url = userInfo.html_url;
        }
        return (
            <Provider store={store}>
                <LayoutComp avatar_url={avatar_url} html_url={html_url}>
                    <Component {...pageProps} />
                </LayoutComp>
            </Provider>
        )
    }
}
export default withRedux(MyApp);