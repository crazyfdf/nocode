import HeaderNocode from '@/components/Header/Header-nocode';
import { Tabs, Collapse } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Icon from '@/components/Icon/Icon';
import ListBox from '@/components/ListBox/ListBox';
import FormRender from '@/components/Renderer/FormRender';
import uniAppPage from '@/public/app/uniAppPage';
import { uniAppAppConfig } from '@/public/app/uniAppApp';
import { configAdapter } from '@/components/Renderer/FormRenderAdapter';
import TabsCard from '@/components/TabsCard/TabCard';
import { isNoEmpty, debounce } from '@/utils/tool';
import FormItems from '@/components/FormComponents/FormItems';
import TemplateListBox from '@/components/ListBox/TemplateListBox';
import UniAppModal from '@/components/Modal/UniAppModal';

const { TabPane } = Tabs;
const { Panel } = Collapse;
const {
  getApp,
  getComponent,
  getTemplate,
  patchComponent,
  patchUniAppsConfig,
  patchUniPagesConfig,
  postPage,
  postApp,
  deleteApp,
  deletePage,
  deleteComponent,
  postComponents,
  postCollectionComponent,
  deleteCollectionComponent,
  postComponentInput,
} = require('@/request/api');

const moduleList = require('./app.json');

export default function noCodeApp({ components, appInit, apps, templates }) {
  // 添加的模态框
  const uniModal = useRef({
    changeVal: v => {},
  });
  const navigation: object[] = [
    { title: '添加', icon: '', handler: () => uniModal.current.changeVal(true) },
    { title: '发布', icon: '', handler: 'user' },
    { title: '预览', icon: '', handler: '' },
    { title: '保存', icon: '', handler: 'user' },
    { title: '打开VSCode', icon: '', handler: 'user' },
  ];
  const [currentLeft, setCurrentLeft] = useState('组件库'); // 当前左侧下标
  const [app, setApp] = useState(appInit); // 当前app
  // 初始化app配置
  if (isNoEmpty(app)) {
    app.pageId = app.pageId ?? [];
    const appConfig = app.uctuiConfigId.uctuiConfig;
    uniAppAppConfig.forEach((item, index) => {
      uniAppAppConfig[index].value = appConfig[item.id];
    });
  }
  const [component, setComponent] = useState(isNoEmpty(components) ? components[0] : {}); // 当前组件
  const [page, setPage] = useState(isNoEmpty(appInit.pageId) ? appInit.pageId[0] : {}); // 当前页面
  const [componentTemplate, setComponentTemplate] = useState(
    isNoEmpty(templates[0]) ? templates[0][0] : {},
  ); // 当前组件模板
  const [pageTemplate, setPageTemplate] = useState(isNoEmpty(templates[1]) ? templates[1][0] : {}); // 当前页面模板
  const [appTemplate, setAppTemplate] = useState(isNoEmpty(templates[2]) ? templates[2][0] : {}); // 当前应用模板
  const ref = useRef(null);
  // 左侧列表数据源
  const dataSource = title => {
    switch (title) {
      case '组件库':
        return components;
      case '页面':
        return app.pageId;
      case '应用':
        return apps;
      case '组件模板':
        return templates[0];
      case '页面模板':
        return templates[1];
      case '应用模板':
        return templates[2];
    }
  };

  const changeLeft = key => {
    setCurrentLeft(key);
  };
  console.log(app);

  // 添加
  const add = async values => {
    switch (currentLeft) {
      case '组件库':
        components = await postComponents({ components: values });
        changeCurrent(0);
        break;
      case '页面':
        const page = await postPage({ page: values, app });
        app.pageId = app.pageId ? [page, ...app.pageId] : [page];
        setApp({ ...app });
        setPage(page);
        break;
      case '应用':
        const _app = await postApp(values);
        apps.unshift(_app);
        setApp(_app);
        changeCurrent(0);
        break;
      case '组件模板':
        break;
      case '页面模板':
        break;
      case '应用模板':
        break;
    }
  };

  // 切换
  const changeCurrent = item => {
    switch (currentLeft) {
      case '组件库':
        setComponent(item);
        break;
      case '页面':
        app.pageId && setPage(item);
        break;
      case '应用':
        setApp(item);
        setPage(item.pageId && item.pageId[0]);
        break;
      case '组件模板':
        setComponentTemplate(item);
        break;
      case '页面模板':
        setPageTemplate(item);
        break;
      case '应用模板':
        setAppTemplate(item);
        break;
    }
  };

  // 删除
  const remove = async (item, index) => {
    switch (currentLeft) {
      case '组件库':
        await deleteComponent({ component: item });
        components.splice(index, 1);
        setComponent(components[0]);
        changeCurrent(0);
        break;
      case '页面':
        await deletePage({ app, page: item });
        app.pageId.splice(index, 1);
        setApp({ ...app });
        changeCurrent(0);
        break;
      case '应用':
        await deleteApp(item);
        apps.splice(index, 1);
        setApp(apps[0]);
        changeCurrent(0);
        break;
      case '组件模板':
        break;
    }
  };

  // 修改配置
  const configSave = async (data: any) => {
    switch (currentLeft) {
      case '组件库':
        await patchComponent({ component, config: data });
        component.config = data;
        setComponent(component);
        break;
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
      case '应用':
        await patchUniAppsConfig({
          id: app.uctuiConfigId._id,
          file: app.file,
          uctuiConfig: { ...app.uctuiConfigId.uctuiConfig, ...data },
        });
        break;
      case '组件模板':
        break;
    }
  };

  // (取消)收藏
  const collection = async (item: any, index: number) => {
    switch (currentLeft) {
      case '组件库':
        console.log(item);
        item.status ? await deleteCollectionComponent(item) : await postCollectionComponent(item);
        item.status = item.status ? 0 : 1;
        components.splice(index, 1, item);
        break;
      case '页面':
        break;
      case '应用':
        break;
      case '组件模板':
        break;
    }
  };

  // 导入模板
  const input = async (item: any) => {
    switch (currentLeft) {
      case '组件模板':
        await postComponentInput({
          file: app.file,
          path: page.path,
          name: item.name,
          config: item.config,
        });
        break;
      case '页面模板':
        break;
      case '应用模板':
        break;
    }
  };

  return (
    <>
      <HeaderNocode navigation={navigation} />
      <div className='flex-auto flex justify-between overflow-hidden'>
        <TabsCard changeLeft={changeLeft}>
          {moduleList.map(item => (
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
              {['组件库', '页面', '应用'].includes(item.title) ? (
                <ListBox
                  dataSource={dataSource(item.title)}
                  collection={collection}
                  changeCurrent={changeCurrent}
                  config={item}
                  remove={remove}
                />
              ) : (
                <TemplateListBox
                  dataSource={dataSource(item.title)}
                  collection={collection}
                  changeCurrent={changeCurrent}
                  config={item}
                  input={input}
                  remove={remove}
                />
              )}
            </TabPane>
          ))}
        </TabsCard>
        <div className='iframe'>
          <iframe
            title='uni-app'
            scrolling='auto'
            style={{ height: '100%', width: '100%', borderRadius: '30px' }}
          />
        </div>
        <div style={{ width: '600px' }} className='shadow-xl px-4 py-5 overflow-auto'>
          {currentLeft === '组件库' && isNoEmpty(component) && (
            <FormItems edit={true} formList={component.config} onChange={configSave} />
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
                    uid={app._id}
                    rightPanelRef={ref}
                  />
                </TabPane>
              ))}
            </Tabs>
          )}
        </div>
      </div>
      <UniAppModal
        ref={uniModal}
        add={add}
        type={moduleList[moduleList.findIndex(item => item.title === currentLeft)].type}
        title={moduleList[moduleList.findIndex(item => item.title === currentLeft)].title}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const { data: components } = await getComponent();
  const { data: apps } = await getApp({});
  const { data: templates } = await getTemplate({});
  const appInit = apps[0] || [];
  return { props: { components, appInit, apps, templates } };
}
