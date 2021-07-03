/* This example requires Tailwind CSS v2.0+ */
import React, { useState } from 'react';
import { Modal, Form, Input, Button, Radio, Select } from 'antd';
const { Option } = Select;
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

			subWin.loadURL('http://localhost:3000/no-code');

			subWin.on('close', () => {
				subWin = null;
			});
		} else {
			window.open('http://localhost:3000/no-code');
		}
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	const onFinish = (values: any) => {
		console.log('Received values of form: ', values);
	};

	return (
		<div className='relative bg-white overflow-hidden flex-auto'>
			<div className='max-w-7xl mx-auto h-full'>
				<div className='relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 h-full'>
					<svg
						className='hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2'
						fill='currentColor'
						viewBox='0 0 100 100'
						preserveAspectRatio='none'
						aria-hidden='true'
					>
						<polygon points='50,0 100,0 50,100 0,100' />
					</svg>

					<main className='pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28'>
						<div className='sm:text-center lg:text-left'>
							<h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
								<div className='block text-indigo-600'>开始创作您的应用吧~</div>
								<div className='block mt-4'>no-code && uni-app</div>
							</h1>
							<p className='mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0'>
								开发一次，多段覆盖
							</p>
							<div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
								<div className='rounded-md shadow'>
									<button
										onClick={showModal}
										className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10'
									>
										创建应用
									</button>
								</div>
								<div className='mt-3 sm:mt-0 sm:ml-3'>
									<button
										onClick={handleOk}
										className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10'
									>
										导入应用
									</button>
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>
			<div className='lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2'>
				<img
					className='h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full'
					src='https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80'
					alt=''
				/>
			</div>

			<Modal
				title='创建uni-app应用'
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={null}
			>
				<Form {...formItemLayout} name='register' onFinish={onFinish} scrollToFirstError>
					<Form.Item
						name='name'
						label='项目名称'
						tooltip='您的项目名称'
						rules={[
							{ required: true, message: '请输入项目名称，不能超过20个字符', whitespace: true },
						]}
					>
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
						]}
					>
						<Input placeholder='请输入项目标识，不能超过20个字符，只能包含小写字母、数字、-或_' />
					</Form.Item>
					<Form.Item name='describe' label='项目描述'>
						<Input.TextArea placeholder='请输入应用描述' />
					</Form.Item>

					<Form.Item
						name='gender'
						label='Gender'
						rules={[{ required: true, message: 'Please select gender!' }]}
					>
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
							onClick={handleCancel}
						>
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
