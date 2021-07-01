import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import {
	ExpandOutlined,
	LeftOutlined,
	LineOutlined,
	PoweroffOutlined,
	UndoOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/dist/client/router';
const navigation = [
	{ title: '插件市场', href: '/' },
	{ title: '创作中心', href: '/created' },
	{ title: '论坛', href: '#' },
	{ title: '我的', href: '/user' },
];
const profile = ['Your Profile', 'Settings', 'Sign out'];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Header() {
	const router = useRouter();
	const [tabIndex, setTabIndex] = useState(0);
	const changeTab = i => {
		setTabIndex(i);
	};
	const handleBack = async () => {
		await router.back();
		console.log(router);
	};
	const handReload = () => {
		router.reload();
	};
	useEffect(() => {
		if (window.require) {
			const { remote } = window.require('electron');
			let mainWin = remote.getCurrentWindow();
			let aBtn = document.getElementsByClassName('windowTool')[0].getElementsByTagName('span');
			const close = () => {
				mainWin.close();
			};
			const maximize = () => {
				if (!mainWin.isMaximized()) {
					mainWin.maximize();
				} else {
					mainWin.restore();
				}
			};
			const minimize = () => {
				mainWin.minimize();
			};
			aBtn[0].addEventListener('click', minimize);
			aBtn[1].addEventListener('click', maximize);
			aBtn[2].addEventListener('click', close);
			return () => {
				aBtn[0].removeEventListener('click', minimize);
				aBtn[1].removeEventListener('click', maximize);
				aBtn[2].removeEventListener('click', close);
			};
		}
	}, []);
	return (
		<Disclosure as='nav' className='bg-gray-800 w-auto top-0 left-0 right-0 ele_drag'>
			{({ open }) => (
				<>
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
								<div>
									<LeftOutlined
										className='text-xl ml-6 no_drag'
										onClick={handleBack}
										style={{ color: '#eee' }}
									/>
									<UndoOutlined
										className='text-xl ml-6 no_drag'
										onClick={handReload}
										style={{ color: '#eee' }}
									/>
								</div>
								<div className='hidden md:block'>
									<div className='ml-10 flex items-baseline space-x-4'>
										{navigation.map((item, itemIdx) =>
											itemIdx === tabIndex ? (
												<Fragment key={item.title}>
													{/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
													<Link href={item.href}>
														<a
															className='bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium no_drag'
															onClick={() => {
																changeTab(itemIdx);
															}}
														>
															{item.title}
														</a>
													</Link>
												</Fragment>
											) : (
												<Link href={item.href} key={item.title}>
													<a
														onClick={() => {
															changeTab(itemIdx);
														}}
														href='#'
														className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium no_drag'
													>
														{item.title}
													</a>
												</Link>
											)
										)}
									</div>
								</div>
							</div>
							<div className='flex items-center'>
								<div className='hidden md:block'>
									<div className='ml-4 flex items-center md:ml-6'>
										<button className='bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
											<span className='sr-only'>View notifications</span>
											<BellIcon className='h-6 w-6' aria-hidden='true' />
										</button>

										{/* Profile dropdown */}
										<Menu as='div' className='ml-3 relative '>
											{({ open }) => (
												<>
													<div>
														<Menu.Button className='max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white no_drag'>
															<span className='sr-only'>Open user menu</span>
															<img
																className='h-8 w-8 rounded-full '
																src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
																alt=''
															/>
														</Menu.Button>
													</div>
													<Transition
														show={open}
														as={Fragment}
														enter='transition ease-out duration-100'
														enterFrom='transform opacity-0 scale-95'
														enterTo='transform opacity-100 scale-100'
														leave='transition ease-in duration-75'
														leaveFrom='transform opacity-100 scale-100'
														leaveTo='transform opacity-0 scale-95'
													>
														<Menu.Items
															static
															className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
														>
															{profile.map(item => (
																<Menu.Item key={item}>
																	{({ active }) => (
																		<a
																			href='#'
																			className={classNames(
																				active ? 'bg-gray-100' : '',
																				'block px-4 py-2 text-sm text-gray-700 no_drag'
																			)}
																		>
																			{item}
																		</a>
																	)}
																</Menu.Item>
															))}
														</Menu.Items>
													</Transition>
												</>
											)}
										</Menu>
									</div>
								</div>

								<div className='-mr-2 flex md:hidden'>
									{/* Mobile menu button */}
									<Disclosure.Button className='bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white no_drag'>
										<span className='sr-only'>Open main menu</span>
										{open ? (
											<XIcon className='block h-6 w-6' aria-hidden='true' />
										) : (
											<MenuIcon className='block h-6 w-6' aria-hidden='true' />
										)}
									</Disclosure.Button>
								</div>
								<div className='windowTool ml-5'>
									<LineOutlined className='text-xl ml-6 no_drag' style={{ color: '#eee' }} />
									<ExpandOutlined className='text-xl ml-6 no_drag' style={{ color: '#eee' }} />
									<PoweroffOutlined className='text-xl ml-6 no_drag' style={{ color: '#eee' }} />
								</div>
							</div>
						</div>
					</div>

					<Disclosure.Panel className='md:hidden'>
						<div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
							{navigation.map((item, itemIdx) =>
								itemIdx === tabIndex ? (
									<Fragment key={item.title}>
										{/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
										<Link href={item.href}>
											<a
												className='bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium no_drag'
												onClick={() => {
													changeTab(itemIdx);
												}}
											>
												{item.title}
											</a>
										</Link>
									</Fragment>
								) : (
									<Link href={item.href} key={item.title}>
										<a
											onClick={() => {
												changeTab(itemIdx);
											}}
											className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium no_drag'
										>
											{item.title}
										</a>
									</Link>
								)
							)}
						</div>
						<div className='pt-4 pb-3 border-t border-gray-700'>
							<div className='flex items-center px-5'>
								<div className='flex-shrink-0'>
									<img
										className='h-10 w-10 rounded-full'
										src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
										alt=''
									/>
								</div>
								<div className='ml-3'>
									<div className='text-base font-medium leading-none text-white'>Tom Cook</div>
									<div className='text-sm font-medium leading-none text-gray-400'>
										tom@example.com
									</div>
								</div>
								<button className='ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white no_drag'>
									<span className='sr-only'>View notifications</span>
									<BellIcon className='h-6 w-6' aria-hidden='true' />
								</button>
							</div>
							<div className='mt-3 px-2 space-y-1'>
								{profile.map(item => (
									<a
										key={item}
										href='#'
										className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 no_drag'
									>
										{item}
									</a>
								))}
							</div>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
