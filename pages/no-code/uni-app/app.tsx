import { Tabs, Collapse, Spin } from 'antd';
import { useEffect, useReducer, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Icon from '@/components/Icon/Icon';
import ListBox from '@/components/ListBox/ListBox';
import TabsCard from '@/components/TabsCard/TabCard';
import { isNoEmpty, debounce } from '@/utils/tool';
import FormItems from '@/components/FormComponents/FormItems/FormItems';
import UniAppModal from '@/components/Modal/UniAppModal';
import HandlerList from '@/components/HandlerList/HandlerList';

const uniAppApp = require('@/public/app/uniAppApp.json');
const uniAppPage = require('@/public/app/uniAppPage.json');
const theme = require('@/public/app/theme.json');
const moduleList = require('@/public/app/app.json');
const {
  getApp,
  getComponent,
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
  deleteCollectionPage,
  postCollectionPage,
  deleteCollectionApp,
  postCollectionApp,
  postRun,
  postCode,
} = require('@/request/api');

const { TabPane } = Tabs;
const { Panel } = Collapse;
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
  const [src, setSrc] = useState('http://localhost:8080/');
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
    // postRun({ path: `${uni.app.file}`, type: 'h5' });
    // setSrc(`http://localhost:8080/${uni.page.path}`);
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

  // 右侧数据源
  const dataSource = (key): { list: any; data: any } => {
    switch (key) {
      case 'component0':
        return { list: uni.component.config, data: null };
      case 'page0':
        return { list: uniAppPage, data: uni.page.pagesConfigId.style };
      case 'page1':
        return { list: uniAppPage, data: null };
      case 'app0':
        return { list: uniAppApp, data: uni.app?.uctuiConfigId?.uctuiConfig };
      case 'app1':
        return { list: theme, data: null };
      case 'components0':
        return { list: uni.components.config, data: null };
      case 'pages0':
        return { list: uniAppPage, data: uni.pages.pagesConfigId.style };
      case 'pages1':
        return { list: uniAppPage, data: null };
      case 'apps0':
        return { list: uniAppApp, data: uni.apps.uctuiConfigId.uctuiConfig };
      default:
        return { list: null, data: null };
    }
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
        console.log(page);

        uni.app.pageId.unshift(page);
        value = uni.app.pageId;
        break;
      case 'app':
        const app = await postApp(values);
        value = [app, ...unis.app];
        break;
      default:
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
        break;
      case 'page':
        setSrc(`http://localhost:8080/${item.path}`);
        break;
      default:
        uniDispatch({ type: 'edit', payload: { key: currentLeft, value: item } });
        break;
    }
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
    setLoading(false);
  };

  // 修改配置
  const configSave = async (item: any, key?: string) => {
    setLoading(true);
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
          uni[currentLeft].pageComponentsId.config[key!][Object.keys(data)[0]] =
            data[Object.keys(data)[0]];
          patchPageComponentConfig({
            file: uni.app.file,
            path: uni[currentLeft].path,
            pageId: uni[currentLeft].pageComponentsId._id,
            config: uni[currentLeft].pageComponentsId.config,
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
          console.log(data);
        }
        break;
    }
    setLoading(false);
  };
  // 删除配置
  const configRemove = async (item: any) => {
    console.log(item);
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
    unis[currentLeft][index].status = item.status;
    unisDispatch({
      type: 'edit',
      payload: { key: currentLeft, value: [...unis[currentLeft]] },
    });
    // 模板的取消收藏操作
    if (currentLeft.endsWith('s')) {
      unisDispatch({
        type: 'remove',
        payload: {
          key: currentLeft,
          value: unis[currentLeft].findIndex(item1 => item1._id === item._id),
        },
      });
    } else {
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
    }
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
          pageComponentsId: uni.page.pageComponentsId._id,
          name: item.name,
          title: item.title,
          config: item.config,
        });
        uniDispatch({ type: 'edit', payload: { key: 'page', value: page1 } });
        unisDispatch({
          type: 'edit',
          payload: {
            key: 'page',
            value: [...unis.page.map(v => (v._id === page1._id ? page1 : v))],
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
          config: item.pageComponentsId.config,
        };
        const { data: page } = await postPage({ page: _page, app: uni.app });
        unisDispatch({ type: 'edit', payload: { key: 'page', value: [page, ...uni.app.pageId] } });
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
              <ListBox
                isTemplate={item.id.endsWith('s')}
                dataSource={unis[item.id]}
                collection={collection}
                changeCurrent={changeCurrent}
                defaultItem={currentLeft === 'app' ? uni.app : unis[item.id][0]}
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
              src={src}
              title='uni-app'
              scrolling='auto'
              style={{ height: '100%', width: '100%', borderRadius: '30px' }}
            />
          </div>
        </div>
        <div style={{ width: '600px' }} className='shadow-xl px-4 py-5 overflow-auto'>
          {moduleList.map(
            tabs =>
              currentLeft === tabs.id &&
              isNoEmpty(uni[currentLeft]) && (
                <Tabs defaultActiveKey='component0' key={tabs.id} onChange={changeRight}>
                  {tabs.children.map(item => (
                    <TabPane key={item.id} tab={item.title}>
                      {currentRight !== 'page1' && (
                        <FormItems
                          defaultData={dataSource(item.id).data}
                          edit={currentLeft === 'component'}
                          formList={dataSource(item.id).list}
                          onChange={configSave}
                        />
                      )}
                      {currentRight === 'page1' && (
                        <Collapse accordion>
                          {Object.entries(uni.page.pageComponentsId.config).map(([key, value]) => (
                            <Panel
                              header={key}
                              key={key}
                              extra={
                                <Icon
                                  type='icon-guanbi'
                                  onClick={e => {
                                    e.stopPropagation();
                                    configRemove({ [key]: value });
                                  }}
                                />
                              }
                            >
                              <FormItems
                                formList={
                                  unis.component.find(
                                    item => item.name === key.replace(/\d+/gi, ''),
                                  )?.config
                                }
                                defaultData={value}
                                onChange={data => configSave(data, key)}
                              />
                            </Panel>
                          ))}
                        </Collapse>
                      )}
                    </TabPane>
                  ))}
                </Tabs>
              ),
          )}
        </div>
        <UniAppModal
          ref={uniModal}
          add={add}
          config={moduleList.find(item => item.id === currentLeft)}
        />
      </div>
    </Spin>
  );
}

export async function getServerSideProps(context) {
  const { data: components } = await getComponent();
  const { data: apps } = await getApp({});
  const { data: templates } = await getTemplate({});
  const app = context.query.id ? (await getApp({ id: context.query.id })).data : apps[0];
  const uniInit = {
    component: isNoEmpty(components) ? components[0] : {},
    page: isNoEmpty(app && app.pageId) ? app.pageId[0] : {},
    app: app,
    components: isNoEmpty(templates[0]) ? templates[0][0] : {},
    pages: isNoEmpty(templates[1]) ? templates[1][0] : {},
    apps: isNoEmpty(templates[2]) ? templates[2][0] : {},
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
