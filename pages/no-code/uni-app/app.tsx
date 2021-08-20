import { Tabs, Collapse } from 'antd';
import { useReducer, useRef, useState } from 'react';
import Icon from '@/components/Icon/Icon';
import ListBox from '@/components/ListBox/ListBox';
import TabsCard from '@/components/TabsCard/TabCard';
import { isNoEmpty, debounce } from '@/utils/tool';
import FormItems from '@/components/FormComponents/FormItems';
import UniAppModal from '@/components/Modal/UniAppModal';
import HandlerList from '@/components/HandlerList/HandlerList';

const uniAppApp = require('@/public/app/uniAppApp.json');
const uniAppPage = require('@/public/app/uniAppPage.json');
const moduleList = require('@/public/app/app.json');
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
  postRun,
  deleteCollectionPage,
  postCollectionPage,
  deleteCollectionApp,
  postCollectionApp,
} = require('@/request/api');

const { TabPane } = Tabs;
const { Panel } = Collapse;

function uniReducer(state, action) {
  switch (action.type) {
    case 'edit':
      return { ...state, [action.payload.key]: action.payload.value };
    case 'remove':
      return { ...state, [action.payload.key]: {} };
    default:
      throw new Error('uni出错');
  }
}

function unisReducer(state, action) {
  switch (action.type) {
    case 'edit':
      return { ...state, [action.payload.key]: action.payload.value };
    case 'remove':
      state[action.payload.key].splice(action.payload.value, 1);
      return { ...state };
    default:
      throw new Error('unis出错');
  }
}

export default function noCodeApp({ uniInit, unisInit }) {
  // 添加的模态框
  const uniModal = useRef({
    changeVal: v => {},
  });
  const [src, setSrc] = useState('http://localhost:3306/#');
  const navigation = [
    { title: '添加', icon: 'icon-tianjia1', handler: () => uniModal.current.changeVal(true) },
    { title: '发布', icon: 'icon-fabu-', handler: 'user' },
    {
      title: '预览',
      icon: 'icon-yulan',
      handler: async () => {
        await postRun({ path: `${process.env.dirname}/uni-components/`, type: 'h5' });
        // FIXME:无法知道项目什么时候在运行，先用setTimeout代替
        setTimeout(() => {
          setSrc('http://localhost:3306/#/');
        }, 5000);
      },
    },
  ];
  const [currentLeft, setCurrentLeft] = useState('component'); // 当前左侧下标
  const [uni, uniDispatch] = useReducer(uniReducer, uniInit); // 当前组件、页面、应用、组件模板、页面模板、应用模板
  const [unis, unisDispatch] = useReducer(unisReducer, unisInit); // 当前组件库、页面库、应用库、组件模板库、页面模板库、应用模板库
  const ref = useRef(null);

  // 切换左侧下标
  const changeLeft = key => {
    setCurrentLeft(key);
  };

  // 添加
  const add = async values => {
    let value;
    switch (currentLeft) {
      case 'component':
        const _components = await postComponents({ components: values });
        value = [..._components, ...unis.app];
        break;
      case 'page':
        const page = await postPage({ page: values, app: uni.app });
        value = uni.app.pageId ? [page, ...uni.app.pageId] : [page];
        break;
      case 'app':
        const app = await postApp(values);
        value = [app, ...unis.app];
        break;
      default:
        break;
    }
    unisDispatch({ type: 'edit', payload: { key: currentLeft, value } });
  };

  // 切换
  const changeCurrent = item => {
    uniDispatch({ type: 'edit', payload: { key: currentLeft, value: item } });
  };

  // 删除
  const remove = async (item, index) => {
    switch (currentLeft) {
      case 'component':
        await deleteComponent({ component: item });
        break;
      case 'page':
        await deletePage({ app: uni.app, page: item });
        uni.app.pageId.splice(index, 1);
        break;
      case 'app':
        await deleteApp(item);
        break;
    }
    unisDispatch({ type: 'remove', payload: { key: currentLeft, value: index } });
    if (item._id === uni[currentLeft]._id) {
      uniDispatch({ type: 'remove', payload: { key: currentLeft } });
    }
  };

  // 修改配置
  const configSave = async (data: any) => {
    console.log(data);
    switch (currentLeft) {
      case 'component':
        await patchComponent({ component: uni.component, config: data });
        uni.component.config = data;
        break;
      case 'page':
        const style = { ...uni.page.uniPagesConfigId.style, ...data };
        await patchUniPagesConfig({
          id: uni.page.uniPagesConfigId._id,
          file: uni.app.file,
          name: uni.page.name,
          type: uni.page.type,
          style,
        });
        uni.page.uniPagesConfigId.style = style;
        break;
      case 'app':
        await patchUniAppsConfig({
          id: uni.app.uctuiConfigId._id,
          file: uni.app.file,
          uctuiConfig: { ...uni.app.uctuiConfigId.uctuiConfig, ...data },
        });
        break;
    }
  };

  // (取消)收藏
  const collection = async (item: any, index: number) => {
    switch (currentLeft) {
      case 'component':
        item.status ? await deleteCollectionComponent(item) : await postCollectionComponent(item);
        break;
      case 'page':
        item.status ? await deleteCollectionPage(item) : await postCollectionPage(item);
        break;
      case 'app':
        item.status ? await deleteCollectionApp(item) : await postCollectionApp(item);
        break;
    }
    item.status = item.status ? 0 : 1;
    unis[currentLeft][index].status = item.status;
    unisDispatch({
      type: 'edit',
      payload: { key: currentLeft, value: [...unis[currentLeft]] },
    });

    item.status
      ? unisDispatch({
          type: 'edit',
          payload: { key: `${currentLeft}s`, value: [item, ...unis[`${currentLeft}s`]] },
        })
      : unisDispatch({
          type: 'remove',
          payload: {
            key: `${currentLeft}s`,
            value: unis[`${currentLeft}s`].findIndex(item1 => item1._id === item._id),
          },
        });
  };

  // 导入模板
  const input = async (item: any) => {
    switch (currentLeft) {
      case '组件模板':
        await postComponentInput({
          file: uni.app.file,
          path: uni.page.path,
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
      <div className='flex-auto flex justify-between overflow-hidden'>
        <TabsCard changeLeft={changeLeft}>
          {moduleList.map(item => (
            <TabPane
              className='p-4'
              key={item.id}
              tab={
                <div className='flex flex-col justify-center'>
                  <Icon style={{ fontSize: '36px', margin: 0 }} type={item.icon} />
                  <div>{item.title}</div>
                </div>
              }
            >
              <ListBox
                dataSource={unis[item.id]}
                collection={collection}
                changeCurrent={changeCurrent}
                config={item}
                remove={remove}
                input={input}
              />
            </TabPane>
          ))}
        </TabsCard>
        <div className='flex items-center flex-col'>
          <HandlerList navigation={navigation} />
          <div className='iframe'>
            <iframe
              title='uni-app'
              scrolling='auto'
              style={{ height: '100%', width: '100%', borderRadius: '30px' }}
            />
          </div>
        </div>
        <div style={{ width: '600px' }} className='shadow-xl px-4 py-5 overflow-auto'>
          {currentLeft === 'component' && isNoEmpty(uni.component) && (
            <FormItems edit={true} formList={uni.component.config} onChange={configSave} />
          )}
          {currentLeft === 'page' && isNoEmpty(uni.page) && (
            <Tabs defaultActiveKey='页面配置'>
              {moduleList[1].children!.map((item, index) => (
                <TabPane key={item.title} tab={item.title}>
                  {index === 0 && <FormItems formList={uniAppPage} onChange={configSave} />}
                  {index === 1 && (
                    <Collapse accordion>
                      <Panel header='This is panel header 1' key='1' />
                    </Collapse>
                  )}
                </TabPane>
              ))}
            </Tabs>
          )}
          {currentLeft === 'app' && (
            <Tabs defaultActiveKey='config配置'>
              {moduleList[2].children!.map((item, index) => (
                <TabPane key={item.title} tab={item.title}>
                  <FormItems formList={uniAppApp} onChange={configSave} />
                </TabPane>
              ))}
            </Tabs>
          )}
        </div>
      </div>
      <UniAppModal
        ref={uniModal}
        add={add}
        type={moduleList[moduleList.findIndex(item => item.id === currentLeft)].type}
        title={moduleList[moduleList.findIndex(item => item.id === currentLeft)].title}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const { data: components } = await getComponent();
  const { data: apps } = await getApp({});
  const { data: templates } = await getTemplate({});
  const app = apps[0] || [];
  const uniInit = {
    component: isNoEmpty(components) ? components[0] : {},
    page: isNoEmpty(app.pageId) ? app.pageId[0] : {},
    app: app,
    components: isNoEmpty(templates[0]) ? templates[0][0] : {},
    pages: isNoEmpty(templates[1]) ? templates[1][0] : {},
    apps: isNoEmpty(templates[2]) ? templates[2][0] : {},
  };
  const unisInit = {
    component: components,
    page: app.pageId ?? [],
    app: apps,
    components: templates[0],
    pages: templates[1],
    apps: templates[2],
  };
  return { props: { uniInit, unisInit } };
}
