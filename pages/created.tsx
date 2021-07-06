// This example requires Tailwind CSS v2.0+
import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select, Card } from 'antd';

import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
	scriptUrl: [
		process.env.iconPath as string, // icon-javascript, icon-java, icon-shoppingcart (overrided)
	],
});
const { Option } = Select;
const { Meta } = Card;

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 6 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 24 },
	},
};

const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 2,
		},
		sm: {
			span: 16,
			offset: 8,
		},
	},
};

const cardModule = [
	{
		id: 0,
		title: 'uni-app应用',
		description: '添加新项目',
		avatar: 'icon-yingyong1',
	},
	{
		id: 1,
		title: 'uni-app组件',
		description: '制作组件库',
		avatar: 'icon-yingyong2',
	},
	{
		id: 2,
		title: 'uni-app工具',
		description: '创造js工具库',
		avatar: 'icon-gongjuqu',
	},
];

export default function created() {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isModalLoading, setIsModalLoading] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
		if (window.require) {
			const { remote } = window.require('electron');

			let subWin = new remote.BrowserWindow({
				width: 1024,
				height: 768,
				minWidth: 1024,
				minHeight: 500,
				frame: false,
				webPreferences: {
					nodeIntegration: true,
					contextIsolation: false,
					enableRemoteModule: true,
				},
			});

			subWin.loadURL(`${process.env.baseURL}/no-code`);

			subWin.on('close', () => {
				subWin = null;
			});
		} else {
			window.open(`${process.env.baseURL}/no-code`);
		}
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	const onFinish = (values: any) => {
		setIsModalLoading(true);
		console.log('Received values of form: ', values);
		handleOk();
		setIsModalLoading(false);
	};

	return (
		<div className='flex items-center justify-around bg-white overflow-hidden flex-auto'>
			{cardModule.map(item => (
				<Card
					key={item.id}
					style={{ width: 300 }}
					cover={<></>}
					actions={[
						<IconFont
							style={{ fontSize: '32px' }}
							type='icon-jurassic_add-gongcheng'
							onClick={showModal}
						/>,
						<IconFont
							style={{ fontSize: '32px' }}
							type='icon-jurassic_import-gongcheng'
							onClick={showModal}
						/>,
					]}>
					<Meta
						avatar={<IconFont type={item.avatar} style={{ fontSize: '32px' }} />}
						title={item.title}
						description={item.description}
					/>
				</Card>
			))}

			<Modal
				title='创建uni-app应用'
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={null}>
				<Form {...formItemLayout} name='register' onFinish={onFinish} scrollToFirstError>
					<Form.Item
						name='name'
						label='项目名称'
						tooltip='您的项目名称'
						rules={[
							{ required: true, message: '请输入项目名称，不能超过20个字符', whitespace: true },
						]}>
						<Input placeholder='请输入项目名称，不能超过20个字符' />
					</Form.Item>

					<Form.Item
						name='id'
						label='项目标识'
						tooltip='您的项目标识'
						rules={[
							{
								required: true,
								message: '请输入项目标识，不能超过20个字符，只能包含小写字母、数字、-或_',
							},
						]}>
						<Input placeholder='请输入项目标识，不能超过20个字符，只能包含小写字母、数字、-或_' />
					</Form.Item>
					<Form.Item name='describe' label='项目描述'>
						<Input.TextArea placeholder='请输入应用描述' />
					</Form.Item>

					<Form.Item
						name='gender'
						label='Gender'
						rules={[{ required: true, message: 'Please select gender!' }]}>
						<Select placeholder='select your gender'>
							<Option value='male'>Male</Option>
							<Option value='female'>Female</Option>
							<Option value='other'>Other</Option>
						</Select>
					</Form.Item>

					<Form.Item {...tailFormItemLayout}>
						<Button
							className='mr-4'
							htmlType='reset'
							loading={isModalLoading}
							onClick={handleCancel}>
							取消
						</Button>
						<Button type='primary' htmlType='submit' loading={isModalLoading}>
							创建
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}
