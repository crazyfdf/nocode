import HeaderNocode from '../components/Header-nocode';
import { Menu, Drawer } from 'antd';

import { createFromIconfontCN } from '@ant-design/icons';
import { useState } from 'react';

const IconFont = createFromIconfontCN({
	scriptUrl: [
		'//at.alicdn.com/t/font_2649131_kxguo6p1m1.js', // icon-javascript, icon-java, icon-shoppingcart (overrided)
	],
});

const navigation = [
	{ title: '模板库', icon: '', handler: 'user' },
	{ title: '撤销', icon: '', handler: '' },
	{ title: '重做', icon: '', handler: 'created' },
	{ title: '阅览', icon: '', handler: '' },
	{ title: '发布', icon: '', handler: 'user' },
	{ title: '保存', icon: '', handler: 'user' },
	{ title: '打开VSCode', icon: '', handler: 'user' },
];
const moduleList = [
	{ key: 0, title: '页面', icon: 'icon-shouye' },
	{ key: 1, title: '组件', icon: 'icon-guanlizujian' },
	{ key: 2, title: '模板', icon: 'icon-APPmoban' },
	{ key: 3, title: '应用', icon: 'icon-yingyong' },
];

export default function noCode() {
	const [visibleLeft, setVisibleLeft] = useState(false);
	const [visibleRight, setVisibleRight] = useState(false);
	const [currentLeft, setCurrentLeft] = useState(0);
	const [title, setTitle] = useState('');
	const [currentRight, setCurrentRight] = useState('0');
	const showDrawerLeft = () => {
		setVisibleLeft(true);
	};

	const onCloseLeft = () => {
		setVisibleLeft(false);
	};

	const showDrawerRight = () => {
		setVisibleRight(true);
	};

	const onCloseRight = () => {
		setVisibleRight(false);
	};

	const changeModule = item => {
		visibleLeft || showDrawerLeft();
		const index = parseInt(item.key);
		setCurrentLeft(index);
		setTitle(moduleList[index].title);
	};

	const handleClick = e => {
		setCurrentRight(e.key);
	};

	return (
		<>
			<HeaderNocode navigation={navigation} />
			<div style={{ width: 256 }} className='flex-auto'>
				<Menu
					className='h-full'
					defaultSelectedKeys={[]}
					defaultOpenKeys={[]}
					mode='inline'
					theme='light'
					inlineCollapsed={true}
					onClick={changeModule}
				>
					{moduleList.map(item => (
						<Menu.Item
							key={item.key}
							style={{ height: '80px', display: 'flex', padding: 0 }}
							className='flex justify-center items-center'
							title={item.title}
							icon={<IconFont style={{ fontSize: '36px' }} type={item.icon} />}
						></Menu.Item>
					))}
				</Menu>
				<Drawer
					title={title}
					style={{ top: '65px', left: '80px' }}
					placement='left'
					onClose={onCloseLeft}
					maskClosable={false}
					mask={false}
					visible={visibleLeft}
					key='left'
				>
					{currentLeft === 0 && <p>0</p>}
					{currentLeft === 1 && <p>1</p>}
					{currentLeft === 2 && <p>2</p>}
					{currentLeft === 3 && <p>3</p>}
				</Drawer>
				{/* <iframe src=""></iframe> */}
				<Drawer
					title={
						<Menu onClick={handleClick} selectedKeys={[currentRight]} mode='horizontal'>
							<Menu.Item key='component'>组件编辑</Menu.Item>
							<Menu.Item key='page'>页面编辑</Menu.Item>
							<Menu.Item key='application'>应用编辑</Menu.Item>
						</Menu>
					}
					width={520}
					style={{ top: '65px' }}
					placement='right'
					onClose={onCloseRight}
					maskClosable={false}
					mask={false}
					visible={visibleRight}
					key='right'
				>
					{currentRight === 'component' && <p>'component'</p>}
					{currentRight === 'page' && <p>'page'</p>}
					{currentRight === 'application' && <p>'application'</p>}
				</Drawer>
			</div>
		</>
	);
}
