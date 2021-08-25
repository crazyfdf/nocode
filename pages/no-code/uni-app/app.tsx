import { Tabs, Collapse } from 'antd';
import { useEffect, useReducer, useRef, useState } from 'react';
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
  patchPagesConfig,
  postPage,
  postApp,
  deleteApp,
  deletePage,
  deleteComponent,
  postComponents,
  postCollectionComponent,
  deleteCollectionComponent,
  patchUniPageComponentsConfig,
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
  const [src, setSrc] = useState('http://localhost:3306/#');
  // 添加的模态框
  const uniModal = useRef({
    changeVal: v => {},
  });
  const navigation = [
    { title: '添加', icon: 'icon-tianjia1', handler: () => uniModal.current.changeVal(true) },
    { title: '发布', icon: 'icon-fabu-', handler: 'user' },
    {
      title: '保存',
      icon: 'icon-yulan',
      handler: async () => {},
    },
  ];
  // useEffect(() => {
  //   postRun({ path: `${process.env.dirname}/uni-components/`, type: 'h5' });
  //   setSrc('http://localhost:3306/#/');
  // }, []);

  const [currentLeft, setCurrentLeft] = useState('component'); // 当前左侧下标
  const [currentRight, setCurrentRight] = useState('page0'); // 当前右侧下标
  const [uni, uniDispatch] = useReducer(uniReducer, uniInit); // 当前组件、页面、应用、组件模板、页面模板、应用模板
  const [unis, unisDispatch] = useReducer(unisReducer, unisInit); // 当前组件库、页面库、应用库、组件模板库、页面模板库、应用模板库

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
    switch (currentLeft) {
      case 'component':
        const _components = await postComponents({ components: values });
        value = [..._components, ...unis.component];
        break;
      case 'page':
        const page = await postPage({ page: values, app: uni.app });
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
  };

  // 切换
  const changeCurrent = item => {
    if (currentLeft === 'app') {
      unisDispatch({
        type: 'edit',
        payload: { key: 'page', value: item.pageId },
      });
      uniDispatch({
        type: 'edit',
        payload: { key: 'page', value: item.pageId ? item.pageId[0] : {} },
      });
    }
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
        const config = { ...uni.component.config, ...data };
        await patchComponent({ component: uni.component, config });
        uni.component.config = config;
        break;
      case 'page':
        const style = { ...uni.page.pagesConfigId.style, ...data };
        await patchPagesConfig({
          id: uni.page.pagesConfigId._id,
          file: uni.app.file,
          name: uni.page.name,
          type: uni.page.type,
          style,
        });
        uni.page.pagesConfigId.style = style;
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
      case 'components':
        await patchUniPageComponentsConfig({
          file: uni.app.file,
          path: uni.page.path,
          pageId: uni.page.pageComponentsId._id,
          name: item.name,
          title: item.title,
          config: item.config,
        });
        break;
      case 'pages':
        const _page = {
          title: `${item.title}_copy`,
          name: `${item.name}_copy`,
          description: item.description,
          type: item.type,
          style: item.pagesConfigId.style,
        };
        const page = await postPage({ page: _page, app: uni.app });
        uni.app.pageId.unshift(page);
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
            {/* <iframe
              src={src}
              title='uni-app'
              scrolling='auto'
              style={{ height: '100%', width: '100%', borderRadius: '30px' }}
            /> */}
          </div>
        </div>
        <div style={{ width: '600px' }} className='shadow-xl px-4 py-5 overflow-auto'>
          {moduleList.map(
            tabs =>
              isNoEmpty(uni[currentLeft]) &&
              currentLeft === tabs.id && (
                <Tabs defaultActiveKey='component0' key={tabs.id} onChange={changeRight}>
                  {tabs.children.map(item => (
                    <TabPane key={item.id} tab={item.title}>
                      {['component0', 'page0', 'app0', 'app1'].includes(currentRight) && (
                        <FormItems
                          edit={currentRight === 'component0'}
                          formList={uniAppPage}
                          onChange={configSave}
                        />
                      )}
                      {currentRight === 'page1' && (
                        <Collapse accordion>
                          {Object.entries(uni.page.pageComponentsId.config).map(([key, value]) => (
                            <Panel header={key} key={key}>
                              <FormItems
                                formList={
                                  unis.component.find(
                                    item => item.name === key.replace(/\d+/gi, ''),
                                  )?.config
                                }
                                defaultData={value}
                                onChange={configSave}
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
      </div>
      <UniAppModal
        ref={uniModal}
        add={add}
        config={moduleList.find(item => item.id === currentLeft)}
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
