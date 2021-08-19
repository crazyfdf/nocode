import { useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import {
  ExpandOutlined,
  LeftOutlined,
  LineOutlined,
  PoweroffOutlined,
  UndoOutlined,
} from '@ant-design/icons';

const profile = ['个人信息', '设置', '登出'];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
interface NavigationInterface {
  title: string;
  href: string;
}
interface PropsInterFace {
  navigation: NavigationInterface[];
}

export default function HeaderNocode(props: PropsInterFace) {
  const { navigation } = props;
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);
  const handleBack = async () => {
    await router.back();
  };
  const handReload = () => {
    router.reload();
  };
  let mainWin;
  useEffect(() => {
    setTabIndex(navigation.findIndex(item => item.href === router.pathname));
  }, [router.pathname]);
  useEffect(() => {
    if (window.require) {
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
      {({ open }) => (
        <>
          <div className='flex items-center'>
            <img
              className='h-8 w-8 flex-shrink-0'
              style={{ marginLeft: '35px', transform: 'translateX(-50%)' }}
              src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
              alt='Workflow'
            />
            <div>
              <LeftOutlined
                className='text-xl ml-6 noDrag'
                onClick={handleBack}
                style={{ color: '#eee' }}
              />
              <UndoOutlined
                className='text-xl ml-6 noDrag'
                onClick={handReload}
                style={{ color: '#eee' }}
              />
            </div>
            <div className='flex flex-1 justify-between h-16 px-4 sm:px-2 lg:px-4'>
              <div className='flex items-center'>
                <div className='hidden md:block'>
                  <div className='mr-10 flex items-baseline space-x-4'>
                    {navigation.map((item, index) => (
                      <Link href={item.href} key={item.title}>
                        <a
                          href={item.href}
                          className={
                            tabIndex === index
                              ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium noDrag'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium noDrag'
                          }
                        >
                          {item.title}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className='flex items-center'>
                <div className='hidden md:block'>
                  <div className='ml-4 flex items-center md:ml-6'>
                    <div className='bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                      <BellIcon className='h-6 w-6' aria-hidden='true' />
                    </div>

                    {/* 个人资料下拉菜单 */}
                    <Menu as='div' className='ml-3 relative '>
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button
                              className='max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none
                            focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white noDrag'
                            >
                              <img
                                className='h-8 w-8 rounded-full '
                                src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                                alt=''
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            enter='transition ease-out duration-100'
                            enterFrom='transform opacity-0 scale-95'
                            enterTo='transform opacity-100 scale-100'
                            leave='transition ease-in duration-75'
                            leaveFrom='transform opacity-100 scale-100'
                            leaveTo='transform opacity-0 scale-95'
                          >
                            <Menu.Items
                              static
                              className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50'
                            >
                              {profile.map(item => (
                                <Menu.Item key={item}>
                                  {({ active }) => (
                                    <button
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700 noDrag w-full',
                                      )}
                                    >
                                      {item}
                                    </button>
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
                  <Disclosure.Button
                    className='bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400
                  hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white noDrag'
                  >
                    {open ? (
                      <XIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </div>
                <div className='windowTool ml-5'>
                  <LineOutlined
                    className='text-xl ml-6 noDrag'
                    style={{ color: '#eee' }}
                    onClick={minimize}
                  />
                  <ExpandOutlined
                    className='text-xl ml-6 noDrag'
                    style={{ color: '#eee' }}
                    onClick={maximize}
                  />
                  <PoweroffOutlined
                    className='text-xl ml-6 noDrag'
                    style={{ color: '#eee' }}
                    onClick={close}
                  />
                </div>
              </div>
            </div>
          </div>
          <Disclosure.Panel className='md:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
              {navigation.map((item, index) => (
                <Link href={item.href} key={item.title}>
                  <a
                    href={item.href}
                    className={
                      tabIndex === index
                        ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium noDrag'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium noDrag'
                    }
                  >
                    {item.title}
                  </a>
                </Link>
              ))}
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
                <div
                  className='ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white noDrag'
                >
                  <BellIcon className='h-6 w-6' aria-hidden='true' />
                </div>
              </div>
              <div className='mt-3 px-2 space-y-1'>
                {profile.map(item => (
                  <button
                    key={item}
                    className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 noDrag'
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
