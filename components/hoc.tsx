import { Component } from 'react';
import createMyStore from '@/store/store';

const isServer = typeof window === 'undefined';
const _REDUX_STORE_ = '_REDUX_STORE_';

/**
 * @description: 获取或创建一个store。每次进行后端渲染，都创建一个新的store，
 * 请求返回后的首次前端渲染，也会创建一个新的store，与流程示意图一致。
 * @param {*} initialState 初始状态
 * @return {*} window
 */
function getOrCreateStore(initialState) {
	if (isServer) {
		return createMyStore(initialState);
	}
	if (!window[_REDUX_STORE_]) {
		window[_REDUX_STORE_] = createMyStore(initialState);
	}
	return window[_REDUX_STORE_];
}

function WithRedux(Comp) {
	return class HOCComp extends Component {
		store: any;

		constructor(props) {
			super(props);
			// 利用初始化后的state创建store
			this.store = getOrCreateStore(props.initialState);
		}

		static async getInitialProps(ctx) {
			const MyStore = getOrCreateStore({ counter: 0 });
			// 利用ctx把store传入App，在App中进行store的初始化
			ctx.ReduxStore = MyStore;
			let appProps = {};
			if (typeof Comp.getInitialProps === 'function') {
				appProps = await Comp.getInitialProps(ctx);
			}

			/**
			 * store初始化后，使用store的getState()方法获取初始化后的state，放入到return的对象中，
			 * return的对象会被序列化，存放在id为"__NEXT_DATA__"的script标签中，随服务端渲染出的HTML返回，
			 * 前端渲染时从props中取出此state，生成与后端一致的store。
			 */
			return {
				...appProps,
				initialState: MyStore.getState(),
			};
		}

		render() {
			// 把constructor中生成的store通过props传到App中
			return <Comp {...this.props} ReduxStore={this.store} />;
		}
	};
}

export default WithRedux;
