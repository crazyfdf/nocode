import '../styles/globals.css';
import 'antd/dist/antd.min.css';
import Header from '@/components/Header/Header';
import { Provider } from 'react-redux';
import { useStore } from '@/store/store';
import { useRouter } from 'next/dist/client/router';

const navigation = [
  { title: '插件市场', href: '/' },
  { title: '创作中心', href: '/create' },
  { title: '论坛', href: '#' },
  { title: '我的', href: '/user' },
];
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const store = useStore(pageProps.initialReduxState);
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
      <Provider store={store}>
        {navigation.findIndex(item => item.href === router.pathname) !== -1 && (
          <Header navigation={navigation} />
        )}
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}
