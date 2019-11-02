import App, { AppInitialProps, AppProps, AppContext } from 'next/app';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { initializeStore } from '../redux/store';

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
        return (
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        )
    }
}

export default withRedux(initializeStore)(MyApp);