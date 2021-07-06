import HeaderNocode from '@/components/Header-nocode';
import { Menu, Drawer } from 'antd';

import { useState } from 'react';

import { createFromIconfontCN } from '@ant-design/icons';
// import { readFile } from 'fs';
// import { promisify } from 'util';
import glob from 'globby';
// import { join } from 'path';

const IconFont = createFromIconfontCN({
  scriptUrl: [
    process.env.iconPath as string, // icon-javascript, icon-java, icon-shoppingcart (overrided)
  ],
});

const navigation: Object = [
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
  const [visibleRight, setVisibleRight] = useState(true);
  const [currentLeft, setCurrentLeft] = useState('0');
  const [title, setTitle] = useState('');
  const [currentRight, setCurrentRight] = useState('0');
  const showDrawerLeft = () => {
    setVisibleLeft(true);
  };

  const onCloseLeft = () => {
    setVisibleLeft(false);
  };

  // const showDrawerRight = () => {
  //   setVisibleRight(true);
  // };

  const onCloseRight = () => {
    setVisibleRight(false);
  };

  const changeModule = item => {
    visibleLeft || showDrawerLeft();
    setCurrentLeft(item.key);
    setTitle(moduleList[parseInt(item.key, 10)].title);
  };

  const handleClick = e => {
    setCurrentRight(e.key);
  };

  return (
    <div className='overflow-hidden'>
      <HeaderNocode navigation={navigation} />
      <div className='flex-auto flex justify-between'>
        <Menu
          style={{ width: '80px' }}
          className='h-full'
          defaultSelectedKeys={[]}
          defaultOpenKeys={[]}
          mode='inline'
          theme='light'
          inlineCollapsed={false}
          onClick={changeModule}
        >
          {moduleList.map(item => (
            <Menu.Item
              key={item.key}
              style={{
                height: '80px',
                padding: 0,
                display: 'flex',
                width: '80px',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                textAlign: 'center',
              }}
              title={item.title}
              icon={<IconFont style={{ fontSize: '36px' }} type={item.icon} />}
            >
              <div style={{ marginLeft: '-10px', width: '80px' }}>{item.title}</div>
            </Menu.Item>
          ))}
        </Menu>
        <div style={{ width: '260px' }}>
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
            {currentLeft === '0' && <p>0</p>}
            {currentLeft === '1' && <p>1</p>}
            {currentLeft === '2' && <p>2</p>}
            {currentLeft === '3' && <p>3</p>}
          </Drawer>
        </div>
        <div className='flex flex-1 justify-around'>
          <div
            style={{
              backgroundImage: '/images/iphone.png',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              height: '812px',
              width: '375px', // 375+22+22
              boxShadow: '0 4px 30px 0 rgba(4, 59, 85, 0.2)',
              transformOrigin: 'top',
              transform: 'translate(0, 20px) scale(0.75)',
              borderRadius: '30px',
            }}
          >
            1111111
          </div>
          <div
            style={{
              height: '812px',
              width: '375px', // 375+22+22
              boxShadow: '0 4px 30px 0 rgba(4, 59, 85, 0.2)',
              transformOrigin: 'top',
              transform: 'translate(0, 20px) scale(0.75)',
              borderRadius: '30px',
            }}
          >
            <iframe
              title='uni-app'
              scrolling='auto'
              src='https://uct-h5-1257264070.cos-website.ap-guangzhou.myqcloud.com?current=0'
              style={{ height: '100%', width: '100%', borderRadius: '30px' }}
            />
          </div>
        </div>
        <div style={{ width: '340px' }}>
          <Drawer
            title={
              <Menu onClick={handleClick} selectedKeys={[currentRight]} mode='horizontal'>
                <Menu.Item key='component'>组件编辑</Menu.Item>
                <Menu.Item key='page'>页面编辑</Menu.Item>
                <Menu.Item key='application'>应用编辑</Menu.Item>
              </Menu>
            }
            width={340}
            style={{ top: '65px' }}
            placement='right'
            maskClosable={false}
            closable={false}
            onClose={onCloseRight}
            mask={false}
            visible={visibleRight}
            key='right'
          >
            {currentRight === 'component' && <p>component</p>}
            {currentRight === 'page' && <p>page</p>}
            {currentRight === 'application' && <p>application</p>}
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // const read = promisify(readFile);

  const cwd = 'D:/my-project/node_modules/uctui';
  const docComponents = glob.sync('components/uct-*/*.vue', { cwd }).map(f => cwd + '/' + f); // .substr(10)

  console.log(docComponents);
  return { props: { docComponents } };
}
