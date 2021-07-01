import '../styles/globals.css';
import 'antd/dist/antd.min.css';
import Header from '../components/Header';

function MyApp({ Component, pageProps }) {
	return (
		<div className='flex flex-col h-screen'>
			<Header />
			<Component {...pageProps} />
		</div>
	);
}

export default MyApp;
