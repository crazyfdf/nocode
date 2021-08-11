import HeaderNocode from '@/components/Header/Header-nocode';
import { Tabs, Collapse } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Icon from '@/components/Icon/Icon';
import ListBox from '@/components/ListBox/ListBox';
import FormRender from '@/components/Renderer/FormRender';
import uniAppPage from '@/public/app/uniAppPage';
import { uniAppAppConfig } from '@/public/app/uniAppApp';
import { configAdapter } from '@/components/Renderer/FormRenderAdapter';
import TabsCard from '@/components/TabsCard';
import { isNoEmpty, debounce } from '@/utils/tool';
import FormItems from '@/components/FormComponents/FormItems';

const { TabPane } = Tabs;
const { Panel } = Collapse;
const {
  getApp,
  getComponent,
  patchComponent,
  getComponentAST,
  patchUniAppsConfig,
  patchUniPagesConfig,
  postPage,
  postApp,
  deleteApp,
  deletePage,
  deleteComponent,
  postComponent,
} = require('@/request/api');

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

export default function noCodeApp({ components, appInit, apps }) {
  const [currentLeft, setCurrentLeft] = useState('组件'); // 当前左侧下标
  const [app, setApp] = useState(appInit); // 当前app
  // 初始化app配置
  if (isNoEmpty(app)) {
    app.pageId = app.pageId ?? [];
    const appConfig = app.uctuiConfigId.uctuiConfig;
    uniAppAppConfig.forEach((item, index) => {
      uniAppAppConfig[index].value = appConfig[item.id];
    });
  }
  const [page, setPage] = useState(isNoEmpty(appInit.pageId) ? appInit.pageId[0] : {}); // 当前页面
  const [component, setComponent] = useState(isNoEmpty(components) ? components[0] : {}); // 当前组件
  const ref = useRef(null);

  const changeLeft = key => {
    setCurrentLeft(key);
  };

  const changeData = async values => {
    switch (currentLeft) {
      // 添加组件
      case '组件':
        const _component = await postComponent({ component: values });
        components.unshift(_component);
        setComponent(_component);
        changeCurrent(0);
        break;
      // 添加页面
      case '页面':
        const page = await postPage({ page: values, app });
        app.pageId = app.pageId ? [page, ...app.pageId] : [page];
        setApp({ ...app });
        setPage(page);
        break;
      // 添加项目
      case '应用':
        const _app = await postApp(values);
        console.log(_app);
        apps.unshift(_app);
        setApp(_app);
        changeCurrent(0);
        break;
      // 添加模板
      case '模板':
        break;
    }
  };

  const changeCurrent = index => {
    switch (currentLeft) {
      // 切换组件
      case '组件':
        console.log(component);
        setComponent(components[index]);
        break;
      // 切换页面
      case '页面':
        app.pageId && setPage(app.pageId[index]);
        break;
      // 切换项目
      case '应用':
        setApp(apps[index]);
        setPage(apps[index].pageId && apps[index].pageId[0]);
        break;
      // 切换模板
      case '模板':
        break;
    }
  };

  const remove = async item => {
    switch (currentLeft) {
      // 删除组件
      case '组件':
        await deleteComponent({ component: item });
        components.splice(
          components.findIndex(item1 => item1._id === item._id),
          1,
        );
        setComponent(components[0]);
        changeCurrent(0);
        break;
      // 删除页面
      case '页面':
        await deletePage({ app, page: item });
        app.pageId.splice(
          app.pageId.findIndex(item1 => item1._id === item._id),
          1,
        );
        setApp({ ...app });
        changeCurrent(0);
        break;
      // 删除项目
      case '应用':
        await deleteApp(item);
        apps.splice(
          apps.findIndex(item1 => item1._id === item._id),
          1,
        );
        setApp(apps[0]);
        changeCurrent(0);
        break;
      // 删除模板
      case '模板':
        break;
    }
  };
  const configSave = async (data: any) => {
    switch (currentLeft) {
      // 修改组件配置
      case '组件':
        console.log(data);
        patchComponent({ component, config: data });
        break;
      // 修改页面配置
      case '页面':
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
      case '应用':
        await patchUniAppsConfig({
          id: app.uctuiConfigId._id,
          file: app.file,
          uctuiConfig: { ...app.uctuiConfigId.uctuiConfig, ...data },
        });
        break;
      // 修改模板配置
      case '模板':
        break;
    }
  };

  const configDel = (id: any) => {
    // switch (currentLeft) {
    //   // 删除项目配置
    //   case '组件':
    //     break;
    //   // 删除页面配置
    //   case '页面':
    //     break;
    //   // 删除组件配置
    //   case '应用':
    //     break;
    //   // 删除模板配置
    //   case '模板':
    //     break;
    // }
  };

  return (
    <>
      <HeaderNocode navigation={navigation} />
      <div className='flex-auto flex justify-between overflow-hidden'>
        <TabsCard changeLeft={changeLeft}>
          {moduleList.map((item, index) => (
            <TabPane
              className='p-4'
              key={item.title}
              tab={
                <div className='flex flex-col justify-center'>
                  <Icon style={{ fontSize: '36px', margin: 0 }} type={item.icon} />
                  <div>{item.title}</div>
                </div>
              }
            >
              <ListBox
                dataSource={
                  index === 0 ? components : index === 1 ? app.pageId : index === 2 ? apps : []
                }
                changeCurrent={changeCurrent}
                config={item}
                changeData={changeData}
                remove={remove}
              />
            </TabPane>
          ))}
        </TabsCard>
        <div className='iframe'>
          <iframe
            title='uni-app'
            scrolling='auto'
            src='localhost:8080'
            style={{ height: '100%', width: '100%', borderRadius: '30px' }}
          />
        </div>
        <div style={{ width: '400px' }} className='shadow-xl px-4 py-5 overflow-auto'>
          {currentLeft === '组件' && isNoEmpty(component) && (
            <FormItems
              edit={true}
              formList={component.config}
              data={component.config}
              onChange={configSave}
            />
          )}
          {currentLeft === '页面' && isNoEmpty(page) && (
            <Tabs defaultActiveKey='页面配置'>
              {moduleList[1].children!.map((item, index) => (
                <TabPane key={item.title} tab={item.title}>
                  {index === 0 && (
                    <FormRender
                      config={uniAppPage}
                      defaultValue={
                        isNoEmpty(page.uniPagesConfigId) ? page.uniPagesConfigId.style : {}
                      }
                      onSave={configSave}
                      onDel={configDel}
                      uid={page._id}
                      rightPanelRef={ref}
                    />
                  )}
                  {index === 1 && (
                    <Collapse accordion>
                      <Panel header='This is panel header 1' key='1'>
                        <FormRender
                          config={configAdapter(component.props ?? [])}
                          uid={component.title}
                          onSave={configSave}
                          onDel={configDel}
                          rightPanelRef={ref}
                        />
                      </Panel>
                    </Collapse>
                  )}
                </TabPane>
              ))}
            </Tabs>
          )}
          {currentLeft === '应用' && (
            <Tabs defaultActiveKey='config配置'>
              {moduleList[2].children!.map((item, index) => (
                <TabPane key={item.title} tab={item.title}>
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
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { data: components } = await getComponent();

  // const components = await Promise.all(
  //   _components.map(async item => {
  //     const { data } = await getComponentAST(item);
  //     return Object.assign(item, data);
  //   }),
  // );
  const { data: apps } = await getApp({});
  const appInit = apps[0] || [];
  return { props: { components, appInit, apps } };
}
