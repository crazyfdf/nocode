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
      <div className='flex items-center'>
        <img
          className='h-8 w-8 flex-shrink-0'
          style={{ marginLeft: '35px', transform: 'translateX(-50%)' }}
          src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
          alt='Workflow'
        />
        <div className='flex flex-1 justify-between h-16 px-4 sm:px-2 lg:px-4'>
          <div className='flex items-center'>
            <div className='hidden md:block'>
              <div className='mr-10 flex items-baseline space-x-4'>
                {navigation.map(item => (
                  <Fragment key={item.title}>
                    <button
                      type='button'
                      onClick={typeof item.handler === 'function' ? item.handler : () => {}}
                      className='bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium noDrag'
                    >
                      {item.title}
                    </button>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
          <div className='flex items-center'>
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
    </Disclosure>
  );
}
