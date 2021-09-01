import { Tabs, Spin } from 'antd';
import { useEffect, useReducer, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Icon from '@/components/Icon/Icon';
import ListBox from '@/components/ListBox/ListBox';
import Component from '@/components/ListBox/Component';
import TabsCard from '@/components/TabsCard/TabCard';
import { isNoEmpty, debounce } from '@/utils/tool';
import UniAppModal from '@/components/Modal/UniAppModal';
import HandlerList from '@/components/HandlerList/HandlerList';
import Page from '@/components/AppConfig/Page';
import Default from '@/components/AppConfig/Default';
import Theme from '@/components/AppConfig/Theme';

const moduleList = require('@/public/app/app.json');
const {
  getApp,
  getComponents,
  getTemplate,
  patchComponent,
  patchUniAppsConfig,
  patchPagesConfig,
  postPage,
  postApp,
  deleteApp,
  deletePage,
  deleteComponent,
  postComponents,
  postCollectionComponent,
  deleteCollectionComponent,
  postComponentInput,
  patchPageComponentConfig,
  deletePageComponentConfig,
  deleteCollectionPage,
  postCollectionPage,
  deleteCollectionApp,
  postCollectionApp,
  postRun,
  postCode,
  patchTheme,
} = require('@/request/api');

const { TabPane } = Tabs;
function init(initValue) {
  return initValue;
}
function uniReducer(state, action) {
  switch (action.type) {
    case 'edit':
      return { ...state, [action.payload.key]: action.payload.value };
    case 'remove':
      return { ...state, [action.payload.key]: {} };
    default:
      return init(action.payload);
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
      return init(action.payload);
  }
}

export default function noCodeApp({ uniInit, unisInit }) {
  const [src, setSrc] = useState('');
  const [loading, setLoading] = useState(false);
  // 添加的模态框
  const uniModal = useRef({
    changeVal: v => {},
  });
  const navigation = [
    { title: '添加', icon: 'icon-tianjia1', handler: () => uniModal.current.changeVal(true) },
    { title: '发布', icon: 'icon-fabu-', handler: 'user' },
    {
      title: '查看',
      icon: 'icon-yulan',
      handler: () => {
        postCode({ file: `${uni.app.file}` });
      },
    },
  ];
  const [currentLeft, setCurrentLeft] = useState('component'); // 当前左侧下标
  const [currentRight, setCurrentRight] = useState('page0'); // 当前右侧下标
  const [uni, uniDispatch] = useReducer(uniReducer, uniInit, init); // 当前组件、页面、应用、组件模板、页面模板、应用模板
  const [unis, unisDispatch] = useReducer(unisReducer, unisInit, init); // 当前组件库、页面库、应用库、组件模板库、页面模板库、应用模板库
  const router = useRouter();

  // 切换app，重新刷新并启动app
  useEffect(() => {
    uniDispatch({ payload: uniInit });
    unisDispatch({ payload: unisInit });
    setLoading(false);
  }, [uniInit]);

  // 切换左侧下标
  const changeLeft = key => {
    setCurrentLeft(key);
    changeRight(`${key}0`);
  };

  // 切换右侧下标
  const changeRight = key => {
    setCurrentRight(key);
  };

  // 添加
  const add = async values => {
    let value;
    setLoading(true);
    switch (currentLeft) {
      case 'component':
        const _components = await postComponents({ components: values });
        value = [..._components, ...unis.component];
        break;
      case 'page':
        const { data: page } = await postPage({ page: values, app: uni.app });
        value = [page, ...unis.page];
        break;
      case 'app':
        const app = await postApp(values);
        value = [app, ...unis.app];
        break;
    }
    unisDispatch({ type: 'edit', payload: { key: currentLeft, value } });
    setLoading(false);
  };

  // 切换
  const changeCurrent = item => {
    console.log(item);
    switch (currentLeft) {
      case 'app':
        setLoading(true);
        router.replace(`?id=${item._id}`);
        postRun({ path: `${uni.app.file}`, type: 'h5' });
        setSrc('');
        setTimeout(() => {
          setSrc(`http://localhost:8080/${uni.page.path}`);
        }, 10000);
        break;
      case 'page':
        setSrc(`http://localhost:8080/${item.path}`);
        break;
    }
    uniDispatch({ type: 'edit', payload: { key: currentLeft, value: item } });
  };

  // 删除
  const remove = async (item, index) => {
    setLoading(true);
    switch (currentLeft) {
      case 'component':
        await deleteComponent({ component: item });
        break;
      case 'page':
        await deletePage({ app: uni.app, page: item });
        break;
      case 'app':
        await deleteApp(item);
        break;
    }
    unisDispatch({ type: 'remove', payload: { key: currentLeft, value: index } });
    if (item._id === uni[currentLeft]._id) {
      uniDispatch({ type: 'remove', payload: { key: currentLeft } });
    }
    setLoading(false);
  };

  // 修改配置
  const configSave = async (item: any, key?: string) => {
    const data = ['component', 'components'].includes(currentLeft)
      ? item
      : { [item.id]: item.value };
    console.log(data);
    switch (true) {
      case ['component', 'components'].includes(currentLeft):
        const config = uni[currentLeft].config.map(v => {
          if (v.id === data.id) {
            return data;
          } else {
            return v;
          }
        });
        await patchComponent({ component: uni[currentLeft], config });
        uni[currentLeft].config = config;
        break;
      case ['page', 'pages'].includes(currentLeft):
        if (currentRight === 'page0') {
          const style = { ...uni[currentLeft].pagesConfigId.style, ...data };
          await patchPagesConfig({
            id: uni[currentLeft].pagesConfigId._id,
            file: uni.app.file,
            name: uni[currentLeft].name,
            type: uni[currentLeft].type,
            style,
          });
          uni[currentLeft].pagesConfigId.style = style;
        }
        if (currentRight === 'page1') {
          [uni[currentLeft].pageComponents[key!][Object.keys(data)[0]]] = Object.values(data);
          patchPageComponentConfig({
            file: uni.app.file,
            path: uni[currentLeft].path,
            pageId: uni[currentLeft]._id,
            config: uni[currentLeft].pageComponents,
          });
        }
        break;
      case ['app', 'apps'].includes(currentLeft):
        if (currentRight === 'app0') {
          const uctuiConfig = { ...uni[currentLeft].uctuiConfigId.uctuiConfig, ...data };
          await patchUniAppsConfig({
            id: uni[currentLeft].uctuiConfigId._id,
            file: uni[currentLeft].file,
            uctuiConfig,
          });
          uni[currentLeft].uctuiConfigId.uctuiConfig = uctuiConfig;
        }
        if (currentRight === 'app1') {
          await patchTheme({
            app: uni.app,
            data,
          });
        }
        break;
    }
  };

  // 删除配置
  const configRemove = async (data: any) => {
    console.log(data);
    setLoading(true);
    Reflect.deleteProperty(uni[currentLeft].pageComponents, Object.keys(data)[0]);
    unis.page = unis.page.map(v => (v._id === uni.page._id ? uni.page : v));
    await deletePageComponentConfig({
      file: uni.app.file,
      path: uni[currentLeft].path,
      pageId: uni[currentLeft]._id,
      config: uni[currentLeft].pageComponents,
      key: `${Object.keys(data)[0]}`,
    });

    setLoading(false);
  };

  // (取消)收藏
  const collection = async (item: any, index: number) => {
    setLoading(true);
    switch (true) {
      case ['component', 'components'].includes(currentLeft):
        item.status ? await deleteCollectionComponent(item) : await postCollectionComponent(item);
        break;
      case ['page', 'pages'].includes(currentLeft):
        item.status ? await deleteCollectionPage(item) : await postCollectionPage(item);
        break;
      case ['app', 'apps'].includes(currentLeft):
        item.status ? await deleteCollectionApp(item) : await postCollectionApp(item);
        break;
    }
    item.status = item.status ? 0 : 1;
    let key = currentLeft;
    // 模板的取消收藏操作
    if (['components', 'pages', 'apps'].includes(currentLeft)) {
      unis[currentLeft.substring(0, currentLeft.length - 1)].map(v => {
        if (v._id === item._id) {
          v.status = item.status;
        }
        return v;
      });
    } else {
      unis[currentLeft][index].status = item.status;
      key = currentLeft + 's';
    }
    item.status
      ? unisDispatch({
          type: 'edit',
          payload: { key, value: [item, ...unis[key]] },
        })
      : unisDispatch({
          type: 'remove',
          payload: { key, value: unis[key].findIndex(item1 => item1._id === item._id) },
        });
    setLoading(false);
  };

  // 导入模板
  const input = async (item: any) => {
    setLoading(true);
    switch (currentLeft) {
      case 'components':
        const { data: page1 } = await postComponentInput({
          file: uni.app.file,
          path: uni.page.path,
          pageId: uni.page._id,
          name: item.name,
          title: item.title,
          config: item.config,
        });
        uniDispatch({ type: 'edit', payload: { key: 'page', value: page1 } });
        unisDispatch({
          type: 'edit',
          payload: {
            key: 'page',
            value: unis.page.map(v => (v._id === page1._id ? page1 : v)),
          },
        });
        break;
      case 'pages':
        const _page = {
          title: `${item.title}_copy`,
          name: `${item.name}_copy`,
          description: item.description,
          type: item.type,
          style: item.pagesConfigId.style,
          config: item.pageComponents,
        };
        const { data: page } = await postPage({ page: _page, app: uni.app });
        unisDispatch({ type: 'edit', payload: { key: 'page', value: [page, ...unis.page] } });
        break;
      case 'apps':
        const app = await postApp({
          title: `${item.title}_copy`,
          name: `${item.name}_copy`,
          description: item.description,
          type: item.type,
          file: item.file,
          pageId: item.pageId,
          uctuiConfig: item.uctuiConfigId.uctuiConfig,
        });
        unisDispatch({ type: 'edit', payload: { key: 'app', value: [app, ...unis.app] } });
        break;
    }
    setLoading(false);
  };

  return (
    <Spin spinning={loading}>
      <div className='flex justify-between' style={{ height: 'calc(100vh - 64px)' }}>
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
              {item.id !== 'component' ? (
                <ListBox
                  isTemplate={['components', 'pages', 'apps'].includes(item.id)}
                  dataSource={unis[item.id]}
                  collection={collection}
                  changeCurrent={changeCurrent}
                  defaultItem={uni[item.id]}
                  config={item}
                  remove={remove}
                  input={input}
                />
              ) : (
                <Component
                  uni={uni}
                  unis={unis}
                  remove={remove}
                  configRemove={configRemove}
                  changeCurrent={changeCurrent}
                  config={item}
                  collection={collection}
                />
              )}
            </TabPane>
          ))}
        </TabsCard>
        <div className='flex items-center flex-col'>
          <HandlerList navigation={navigation} />
          <Spin spinning={!src}>
            <div className='iframe'>
              <iframe
                src={src}
                title='uni-app'
                scrolling='auto'
                style={{ height: '100%', width: '100%', borderRadius: '30px' }}
              />
            </div>
          </Spin>
        </div>
        <div style={{ width: '600px' }} className='shadow-xl px-4 py-5 overflow-auto'>
          {moduleList.map(
            tabs =>
              currentLeft === tabs.id &&
              isNoEmpty(uni[currentLeft]) && (
                <Tabs defaultActiveKey='component0' key={tabs.id} onChange={changeRight}>
                  {tabs.children.map(item => (
                    <TabPane key={item.id} tab={item.title}>
                      {currentRight === 'page1' ? (
                        <Page
                          uni={uni}
                          configRemove={configRemove}
                          unis={unis}
                          configSave={configSave}
                        />
                      ) : currentRight === 'app1' ? (
                        <Theme uni={uni} currentLeft={currentLeft} configSave={configSave} />
                      ) : (
                        <Default
                          item={item}
                          uni={uni}
                          currentLeft={currentLeft}
                          configSave={configSave}
                        />
                      )}
                    </TabPane>
                  ))}
                </Tabs>
              ),
          )}
        </div>
      </div>
      <UniAppModal
        ref={uniModal}
        add={add}
        config={moduleList.find(item => item.id === currentLeft)}
      />
    </Spin>
  );
}

export async function getServerSideProps(context) {
  const { data: components } = await getComponents();
  const { data: apps } = await getApp({});
  const { data: templates } = await getTemplate({});
  const app = context.query.id
    ? (await getApp({ id: context.query.id })).data ?? {}
    : apps[0] ?? {};
  const uniInit = {
    component: {},
    page: {},
    app: app,
    components: {},
    pages: {},
    apps: {},
  };
  const unisInit = {
    component: components,
    page: isNoEmpty(app && app.pageId) ? app.pageId : [],
    app: apps,
    components: templates[0],
    pages: templates[1],
    apps: templates[2],
  };

  return { props: { uniInit, unisInit } };
}
