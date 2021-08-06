import HeaderNocode from '@/components/Header/Header-nocode';
import { Tabs } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Icon from '@/components/Icon/Icon';
import {
  getApp,
  getCollectionComponents,
  getComponentAST,
  patchUniAppsConfig,
  patchUniPagesConfig,
  postPage,
} from '@/request/api';
import ListBox from '@/components/ListBox/ListBox';
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
const moduleList = require('./app.json');

export default function noCodeApp({ myCollection, appInit, apps }) {
  const [currentLeft, setCurrentLeft] = useState('0'); // 当前右侧下标
  const [app, setApp] = useState(appInit); // 当前app
  // 初始化app配置
  const appConfig = app.uctuiConfigId.uctuiConfig;
  uniAppAppConfig.forEach((item, index) => {
    uniAppAppConfig[index].value = appConfig[item.id];
  });
  console.log(app);

  const [page, setPage] = useState(appInit.pageId && appInit.pageId[0]); // 当前页面
  const [component, setComponent] = useState(myCollection && myCollection[0]); // 当前组件
  const ref = useRef(null);

  const changeLeft = key => {
    setCurrentLeft(`${key}`);
  };

  const changeData = async values => {
    switch (currentLeft) {
      // 添加组件
      case '0':
        break;
      // 添加页面
      case '1':
        const page = await postPage({ page: values, app });
        app.pageId ? app.pageId.unshift(page) : [page];
        setApp({ ...app });
        setPage(page);
        break;
      // 添加项目
      case '2':
        break;
      // 添加模板
      case '3':
        break;
    }
  };

  const changeCurrent = index => {
    switch (currentLeft) {
      // 切换组件
      case '0':
        setComponent(myCollection[index]);
        break;
      // 切换页面
      case '1':
        app.pageId && setPage(app.pageId[index]);
        break;
      // 切换项目
      case '2':
        setApp(apps[index]);
        break;
      // 切换模板
      case '3':
        break;
    }
  };

  const remove = item => {
    switch (currentLeft) {
      // 删除组件
      case '0':
        break;
      // 删除页面
      case '1':
        break;
      // 删除项目
      case '2':
        break;
      // 删除模板
      case '3':
        break;
    }
  };
  const configSave = async (data: any) => {
    const saveData = async () => {
      switch (currentLeft) {
        // 修改组件配置
        case '0':
          break;
        // 修改页面配置
        case '1':
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
          break;
        // 修改项目配置
        case '2':
          await patchUniAppsConfig({
            id: app.uctuiConfigId._id,
            file: app.file,
            uctuiConfig: { ...app.uctuiConfigId.uctuiConfig, ...data },
          });
          break;
        // 修改模板配置
        case '3':
          break;
      }
    };
    debounce(saveData, 1000, false);
  };

  const configDel = (id: any) => {
    switch (currentLeft) {
      // 删除项目配置
      case '0':
        break;
      // 删除页面配置
      case '1':
        break;
      // 删除组件配置
      case '2':
        break;
      // 删除模板配置
      case '3':
        break;
    }
  };

  return (
    <div className='overflow-hidden'>
      <HeaderNocode navigation={navigation} />
      <div className='flex-auto flex justify-between'>
        <div style={{ width: '400px', paddingBottom: '50px' }}>
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
                <ListBox
                  dataSource={
                    index === 0 ? myCollection : index === 1 ? app.pageId : index === 2 ? apps : []
                  }
                  changeCurrent={changeCurrent}
                  config={item}
                  changeData={changeData}
                  remove={remove}
                />
              </TabPane>
            ))}
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
        <div style={{ width: '400px' }} className='h-screen shadow-xl overflow-auto px-4 py-5'>
          {currentLeft === '0' && (
            <FormRender
              config={configAdapter(component.props ?? [])}
              uid={component.title}
              onSave={configSave}
              onDel={configDel}
              rightPanelRef={ref}
            />
          )}
          {currentLeft === '1' && page && (
            <Tabs defaultActiveKey='0'>
              {moduleList[1].children!.map((item, index) => (
                <TabPane key={item.key} tab={item.title}>
                  {index === 0 && (
                    <FormRender
                      config={uniAppPage}
                      defaultValue={page.uniPagesConfigId.style}
                      onSave={configSave}
                      onDel={configDel}
                      uid={page._id}
                      rightPanelRef={ref}
                    />
                  )}
                  {index === 1 && (
                    <FormRender
                      config={configAdapter(component.props ?? [])}
                      uid={component.title}
                      onSave={configSave}
                      onDel={configDel}
                      rightPanelRef={ref}
                    />
                  )}
                </TabPane>
              ))}
            </Tabs>
          )}
          {currentLeft === '2' && (
            <Tabs defaultActiveKey='0'>
              {moduleList[2].children!.map((item, index) => (
                <TabPane key={item.key} tab={item.title}>
                  <FormRender
                    config={uniAppAppConfig}
                    onSave={configSave}
                    onDel={configDel}
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
