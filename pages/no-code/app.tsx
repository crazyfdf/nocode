import HeaderNocode from '@/components/Header/Header-nocode';
import { Menu, Drawer, Tabs } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Icon from '@/components/Icon/Icon';
import SourceBox from '@/components/SourceBox/SourceBox';
import { getApp, getCollectionComponents, getComponentAST } from '@/request/api';
import PagesBox from '@/components/SourceBox/PagesBox';
import FormRender from '@/components/Renderer/FormRender';
import { debounce } from '@/utils/tool';
import { patchUniPagesConfig, patchUniAppsConfig } from '@/CMSRequest/api';
import uniAppPage from '@/public/json/uniAppPage';
import uniAppApp from '@/public/json/uniAppApp';
import { configAdapter } from '@/components/Renderer/FormRenderAdapter';

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
  { key: 0, title: '组件', icon: 'icon-guanlizujian' },
  { key: 1, title: '页面', icon: 'icon-shouye' },
  { key: 2, title: '应用', icon: 'icon-yingyong' },
  { key: 3, title: '模板', icon: 'icon-APPmoban' },
];

export default function noCodeApp({ myCollection, appInit, apps }) {
  const { pageId: pages = [] } = appInit;
  const [currentRight, setCurrentRight] = useState('0'); // 当前右侧下标
  const [app, setApp] = useState(appInit); // 当前app
  const [page, setPage] = useState(pages && pages[0]); // 当前页面
  const [component, setComponent] = useState(myCollection && myCollection[0]); // 当前组件
  const ref = useRef(null);
  const changeRight = e => {
    setCurrentRight(e.key);
  };
  const changeLeft = key => {
    changeRight({ key: `${key}` });
  };

  const changePage = useMemo(
    () => index => {
      app.pageId && setPage(app.pageId[index]);
    },
    [app],
  );
  const changeApp = useMemo(
    () => index => {
      setApp(apps[index]);
    },
    [],
  );
  const changeComponent = useMemo(
    () => index => {
      setComponent(myCollection[index]);
    },
    [],
  );

  const componentConfigSave = useMemo(() => {
    const saveData = async (data: any) => {
      //   const style = JSON.stringify({ ...JSON.parse(page.uniPagesConfigId.style), ...data });
      //   await patchUniPagesConfig(page.uniPagesConfigId._id, {
      //     style,
      //   });
      //   page.uniPagesConfigId.style = style;
      //   setPage(page);
      console.log(data);
    };
    // return debounce(saveData, 1000, false);
    return saveData;
  }, [page]);

  const componentConfigDel = useMemo(() => {
    return (id: any) => {
      console.log(id);
    };
  }, []);

  const pageConfigSave = useMemo(() => {
    const saveData = async (data: any) => {
      const style = JSON.stringify({ ...JSON.parse(page.uniPagesConfigId.style), ...data });
      await patchUniPagesConfig(page.uniPagesConfigId._id, {
        style,
      });
      page.uniPagesConfigId.style = style;
      setPage(page);
    };
    return debounce(saveData, 1000, false);
  }, [page]);

  const pageConfigDel = useMemo(() => {
    return (id: any) => {
      console.log(id);
    };
  }, []);

  const appConfigSave = useMemo(() => {
    const saveData = async (data: any) => {
      await patchUniAppsConfig(app.uctuiConfigId._id, {
        style: JSON.stringify({ ...JSON.parse(app.uctuiConfigId.uctuiConfig), ...data }),
      });
    };
    return debounce(saveData, 1000, false);
  }, [app]);

  const appConfigDel = useMemo(() => {
    return (id: any) => {
      console.log(id);
    };
  }, []);

  return (
    <div className='overflow-hidden'>
      <HeaderNocode navigation={navigation} />
      <div className='flex-auto flex justify-between'>
        <div style={{ width: '400px' }}>
          <Tabs
            type='line'
            tabBarStyle={{ backgroundColor: '#fafafa' }}
            className='h-full shadow-xl'
            onChange={changeLeft}
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
              <SourceBox dataSource={myCollection} change={changeComponent} />
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
              <PagesBox data={app.pageId} changePage={changePage} app={app} />
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
              <SourceBox dataSource={apps} change={changeApp} />
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
              <p>3</p>
            </TabPane>
          </Tabs>
          <div style={{ height: '50px' }} />
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
              <Menu onClick={changeRight} selectedKeys={[currentRight]} mode='horizontal'>
                <Menu.Item key='0'>组件编辑</Menu.Item>
                <Menu.Item key='1'>页面编辑</Menu.Item>
                <Menu.Item key='2'>应用编辑</Menu.Item>
              </Menu>
            }
            width={340}
            style={{ top: '65px' }}
            placement='right'
            maskClosable={false}
            closable={false}
            mask={false}
            visible={true}
            key='right'
          >
            {currentRight === '0' && (
              <FormRender
                config={configAdapter(component.props ?? [])}
                uid={component.title}
                onSave={componentConfigSave}
                onDel={componentConfigDel}
                rightPanelRef={ref}
              />
            )}
            {currentRight === '1' && page && (
              <FormRender
                config={uniAppPage}
                defaultValue={JSON.parse(page.uniPagesConfigId.style)}
                onSave={pageConfigSave}
                onDel={pageConfigDel}
                uid={page._id}
                rightPanelRef={ref}
              />
            )}
            {currentRight === '2' && (
              <FormRender
                config={uniAppApp}
                onSave={appConfigSave}
                onDel={appConfigDel}
                uid={app._id}
                rightPanelRef={ref}
              />
            )}
            <div style={{ height: '50px' }} />
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

  const { data: apps } = await getApp({});
  console.log('====================================');
  console.log(apps);
  console.log('====================================');
  let appInit;
  if (Object.entries(context.query).length) {
    const { data } = await getApp(context.query);
    appInit = data;
  } else {
    appInit = apps[0] || [];
  }

  return { props: { myCollection, appInit, apps } };
}
