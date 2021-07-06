import { Fragment, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { ExpandOutlined, LineOutlined, PoweroffOutlined } from '@ant-design/icons';

export default function HeaderNocode({ navigation }) {
	let mainWin;
	useEffect(() => {
		if (typeof window.require === 'function') {
			const { remote } = window.require('electron');
			mainWin = remote.getCurrentWindow();
		}
	}, []);
	const close = () => {
		mainWin && mainWin.close();
	};
	const maximize = () => {
		if (mainWin) {
			if (!mainWin.isMaximized()) {
				mainWin.maximize();
			} else {
				mainWin.restore();
			}
		}
	};
	const minimize = () => {
		mainWin && mainWin.minimize();
	};
	return (
		<Disclosure as='nav' className='bg-gray-800 w-auto top-0 left-0 right-0 ele_drag'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					<div className='flex items-center'>
						<div className='flex-shrink-0'>
							<img
								className='h-8 w-8'
								src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
								alt='Workflow'
							/>
						</div>

						<div className='hidden md:block'>
							<div className='ml-10 flex items-baseline space-x-4'>
								{navigation.map(item => (
									<Fragment key={item.title}>
										<div className='bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium no_drag'>
											{item.title}
										</div>
									</Fragment>
								))}
							</div>
						</div>
					</div>
					<div className='flex items-center'>
						<div className='windowTool ml-5'>
							<LineOutlined
								className='text-xl ml-6 no_drag'
								style={{ color: '#eee' }}
								onClick={minimize}
							/>
							<ExpandOutlined
								className='text-xl ml-6 no_drag'
								style={{ color: '#eee' }}
								onClick={maximize}
							/>
							<PoweroffOutlined
								className='text-xl ml-6 no_drag'
								style={{ color: '#eee' }}
								onClick={close}
							/>
						</div>
					</div>
				</div>
			</div>
		</Disclosure>
	);
}
