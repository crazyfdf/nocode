import HeaderNocode from '@/components/Header/Header-nocode';
import { Tabs } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Icon from '@/components/Icon/Icon';
import SourceBox from '@/components/SourceBox/SourceBox';
import {
  getApp,
  getCollectionComponents,
  getComponentAST,
  patchUniAppsConfig,
  patchUniPagesConfig,
} from '@/request/api';
import PagesBox from '@/components/SourceBox/PagesBox';
import FormRender from '@/components/Renderer/FormRender';
import { debounce } from '@/utils/tool';
import uniAppPage from '@/public/app/uniAppPage';
import { uniAppAppConfig } from '@/public/app/uniAppApp';
import { configAdapter } from '@/components/Renderer/FormRenderAdapter';

const { TabPane } = Tabs;

const navigation: object[] = [
  { title: '模板库', icon: '', handler: 'user' },
  { title: '撤销', icon: '', handler: '' },
  { title: '重做', icon: '', handler: 'create' },
  { title: '预览', icon: '', handler: '' },
  { title: '发布', icon: '', handler: 'user' },
  { title: '保存', icon: '', handler: 'user' },
  { title: '打开VSCode', icon: '', handler: 'user' },
];
const moduleList = [
  { key: 0, title: '组件', icon: 'icon-guanlizujian' },
  {
    key: 1,
    title: '页面',
    icon: 'icon-shouye',
    children: [
      { key: 0, title: '页面配置' },
      { key: 1, title: '组件配置' },
    ],
  },
  {
    key: 2,
    title: '应用',
    icon: 'icon-yingyong',
    children: [
      { key: 0, title: 'config配置' },
      { key: 1, title: 'theme配置' },
    ],
  },
  { key: 3, title: '模板', icon: 'icon-APPmoban' },
];

export default function noCodeApp({ myCollection, appInit, apps }) {
  const { pageId: pages = [] } = appInit;
  const [currentRight, setCurrentRight] = useState('0'); // 当前右侧下标
  const [app, setApp] = useState(appInit); // 当前app
  const appConfig = app.uctuiConfigId.uctuiConfig;
  uniAppAppConfig.forEach((item, index) => {
    uniAppAppConfig[index].value = appConfig[item.id];
  });

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
      console.log(page);
      app.pageId && setPage(app.pageId[index]);
    },
    [app],
  );
  const changeApp = useMemo(
    () => index => {
      console.log(app);
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
      const style = { ...page.uniPagesConfigId.style, ...data };
      await patchUniPagesConfig({
        id: page.uniPagesConfigId._id,
        file: app.file,
        name: page.name,
        type: page.type,
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
      await patchUniAppsConfig({
        id: app.uctuiConfigId._id,
        file: app.file,
        uctuiConfig: { ...app.uctuiConfigId.uctuiConfig, ...data },
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
            {moduleList.map((item, index) => (
              <TabPane
                className='p-4'
                tab={
                  <div className='flex flex-col justify-center'>
                    <Icon style={{ fontSize: '36px', margin: 0 }} type={item.icon} />
                    <div>{item.title}</div>
                  </div>
                }
                key={item.key}
              >
                {index === 0 && <SourceBox dataSource={myCollection} change={changeComponent} />}
                {index === 1 && <PagesBox data={app.pageId} changePage={changePage} app={app} />}
                {index === 2 && <SourceBox dataSource={apps} change={changeApp} />}
                {index === 3 && <p>3</p>}
              </TabPane>
            ))}
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
        <div style={{ width: '400px' }} className='h-screen shadow-xl overflow-auto px-4 py-5'>
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
            <Tabs defaultActiveKey='0'>
              {moduleList[1].children!.map((item, index) => (
                <TabPane key={item.key} tab={item.title}>
                  {index === 0 && (
                    <FormRender
                      config={uniAppPage}
                      defaultValue={page.uniPagesConfigId.style}
                      onSave={pageConfigSave}
                      onDel={pageConfigDel}
                      uid={page._id}
                      rightPanelRef={ref}
                    />
                  )}
                  {index === 1 && (
                    <FormRender
                      config={configAdapter(component.props ?? [])}
                      uid={component.title}
                      onSave={componentConfigSave}
                      onDel={componentConfigDel}
                      rightPanelRef={ref}
                    />
                  )}
                </TabPane>
              ))}
            </Tabs>
          )}
          {currentRight === '2' && (
            <Tabs defaultActiveKey='0'>
              {moduleList[2].children!.map((item, index) => (
                <TabPane key={item.key} tab={item.title}>
                  <FormRender
                    config={uniAppAppConfig}
                    onSave={appConfigSave}
                    onDel={appConfigDel}
                    uid={app._id}
                    rightPanelRef={ref}
                  />
                </TabPane>
              ))}
            </Tabs>
          )}
          <div style={{ height: '50px' }} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { data: _myCollection } = await getCollectionComponents();

  const myCollection = await Promise.all(
    _myCollection.map(async item => {
      const { data } = await getComponentAST(item);
      return Object.assign(item, data);
    }),
  );

  const { data: apps } = await getApp({});

  let appInit;
  if (Object.entries(context.query).length) {
    const { data } = await getApp(context.query);
    appInit = data;
  } else {
    appInit = apps[0] || [];
  }

  return { props: { myCollection, appInit, apps } };
}
