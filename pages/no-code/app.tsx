import HeaderNocode from '@/components/Header/Header-nocode';
import { Menu, Drawer, Tabs } from 'antd';
import React, { useState } from 'react';
import Icon from '@/components/Icon/Icon';
import SourceBox from '@/components/SourceBox/SourceBox';
import {
  getApp,
  getCollectionComponents,
  getComponentAST,
  getPage,
  getUniPagesConfig,
} from '@/request/api';
import PagesBox from '@/components/SourceBox/PagesBox';

const { TabPane } = Tabs;

const navigation: object[] = [
  { title: '模板库', icon: '', handler: 'user' },
  { title: '撤销', icon: '', handler: '' },
  { title: '重做', icon: '', handler: 'created' },
  { title: '预览', icon: '', handler: '' },
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

export default function noCodeApp({ myCollection, app, page }) {
  const [visibleRight, setVisibleRight] = useState(true);
  const [currentRight, setCurrentRight] = useState('0');

  const showDrawerRight = () => {
    setVisibleRight(true);
  };

  const onCloseRight = () => {
    setVisibleRight(false);
  };

  const handleClick = e => {
    setCurrentRight(e.key);
  };

  const changePage = async (index: number) => {
    console.log(page[index]);
    const res = await getUniPagesConfig({ id: page[index].name });
    console.log(res);
  };

  return (
    <div className='overflow-hidden'>
      <HeaderNocode navigation={navigation} />
      <div className='flex-auto flex justify-between'>
        <div style={{ width: '400px' }}>
          <Tabs
            type='line'
            tabBarStyle={{ backgroundColor: '#fafafa' }}
            className='h-full shadow-xl'
            key='left'
            tabPosition='left'
          >
            <TabPane
              className='p-4'
              tab={
                <div className='flex flex-col justify-center'>
                  <Icon style={{ fontSize: '36px', margin: 0 }} type={moduleList[0].icon} />
                  <div>{moduleList[0].title}</div>
                </div>
              }
              key={moduleList[0].key}
            >
              <PagesBox data={page} changePage={changePage} />
            </TabPane>
            <TabPane
              className='p-4'
              tab={
                <div className='flex flex-col justify-center'>
                  <Icon style={{ fontSize: '36px', margin: 0 }} type={moduleList[1].icon} />
                  <div>{moduleList[1].title}</div>
                </div>
              }
              key={moduleList[1].key}
            >
              <SourceBox header={{}} dataSource={myCollection} />
            </TabPane>
            <TabPane
              className='p-4'
              tab={
                <div className='flex flex-col justify-center'>
                  <Icon style={{ fontSize: '36px', margin: 0 }} type={moduleList[2].icon} />
                  <div>{moduleList[2].title}</div>
                </div>
              }
              key={moduleList[2].key}
            >
              <p>2</p>
            </TabPane>
            <TabPane
              className='p-4'
              tab={
                <div className='flex flex-col justify-center'>
                  <Icon style={{ fontSize: '36px', margin: 0 }} type={moduleList[3].icon} />
                  <div>{moduleList[3].title}</div>
                </div>
              }
              key={moduleList[3].key}
            >
              <SourceBox header={{}} dataSource={app} />
            </TabPane>
          </Tabs>
        </div>
        <div className='iframe'>
          <iframe
            title='uni-app'
            scrolling='auto'
            src='localhost:8080'
            style={{ height: '100%', width: '100%', borderRadius: '30px' }}
          />
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

export async function getServerSideProps(context) {
  // const read = promisify(readFile);
  const { data: _myCollection } = await getCollectionComponents();

  const myCollection = await Promise.all(
    _myCollection.map(async item => {
      const { data } = await getComponentAST(item);
      return Object.assign(item, data);
    }),
  );

  const { data: app } = await getApp(context.query);
  const { data: page } = await getPage(context.query || {});

  return { props: { myCollection, app, page } };
}
