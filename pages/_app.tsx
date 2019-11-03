import App, { AppInitialProps, AppProps, AppContext } from 'next/app';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import LayoutComp from '../components/Layout';
import withRedux from '../libs/with-redux.lib';
import PageLoading from '../components/PageLoading';
import Router from 'next/router';

class MyApp extends App<AppProps> {

   state = {
       loading: false
   }

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

    startLoading = () => {
        this.setState({
            loading: true
        });
    }

    endLoading = () => {
        this.setState({
            loading: false
        });
    }

    componentDidMount =() => {
        Router.events.on('routeChangeStart', this.startLoading);
        Router.events.on('routeChangeComplete', this.endLoading);
        Router.events.on('routeChangeError', this.endLoading);
    }

    componentWillUnmount = () => {
        Router.events.off('routeChangeStart', this.startLoading);
        Router.events.off('routeChangeComplete', this.endLoading);
        Router.events.off('routeChangeError', this.endLoading);
    }

    render() {
        const { Component, pageProps, store } = this.props;

        return (
            <Provider store={store}>
                {
                    this.state.loading ? <PageLoading /> : null
                }
                <LayoutComp>
                    <Component {...pageProps} />
                </LayoutComp>
            </Provider>
        )
    }
}
export default withRedux(MyApp);