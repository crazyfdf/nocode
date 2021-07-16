import '../styles/globals.css';
import 'antd/dist/antd.min.css';
import Header from '@/components/Header/Header';
import { Provider } from 'react-redux';
import WithRedux from '@/components/hoc';
import App from 'next/app';
import { useRouter } from 'next/dist/client/router';

const navigation = [
  { title: '插件市场', href: '/' },
  { title: '创作中心', href: '/created' },
  { title: '论坛', href: '#' },
  { title: '我的', href: '/user' },
];
function MyApp({ Component, pageProps, ReduxStore }) {
  const router = useRouter();
  // useEffect(() => {
  //   const { registerMicroApps, start } = require('qiankun');
  //   registerMicroApps([
  //     {
  //       name: 'my-project',
  //       entry: '//localhost:8080',
  //       container: '#uni-app',
  //       activeRule: '/no-code/components',
  //     },
  //   ]);
  //   // 启动 qiankun
  //   console.log(11);
  //   start({ prefetch: 'all' });
  // }, []);
  return (
    <div className='flex flex-col h-screen'>
      <Provider store={ReduxStore}>
        {navigation.findIndex(item => item.href === router.pathname) !== -1 && (
          <Header navigation={navigation} />
        )}
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}
MyApp.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext);

  /* 获取store并初始化 */
  const store = appContext.ReduxStore;
  store.subscribe(() => {
    console.log('store change');
  });
  store.dispatch({ type: 'add' });

  return { ...appProps };
};
// 使用WithRedux
export default WithRedux(MyApp);
