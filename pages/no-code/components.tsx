import HeaderNocode from '@/components/Header/Header-nocode';
import { Menu, Drawer, Dropdown, List, Card } from 'antd';
import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { configAdapter, defaultAdapter } from '@/components/Renderer/FormRenderAdapter';
import glob from 'globby';
import Icon from '@/components/Icon/Icon';
import {
  getComponentAST,
  postComponentsCreated,
  postCollectionComponents,
  getCollectionComponents,
} from '@/request/api';
import FormRender from '@/components/Renderer/FormRender';
import { debounce } from '@/utils/tool';

interface docComponentsInterface {
  title?: string;
  name?: string;
  isCollection: number;
  file: string;
}

const navigation: object[] = [
  { title: '模板库', icon: '', handler: 'user' },
  { title: '预览', icon: '', handler: '' },
  { title: '发布', icon: '', handler: 'user' },
  { title: '打开VSCode', icon: '', handler: 'user' },
  { title: '生成组件文档', icon: '', handler: 'user' },
];
const moduleList = [
  { key: '0', title: 'uct组件', icon: 'icon-guanlizujian' },
  { key: '1', title: '我的组件', icon: 'icon-guanlizujian' },
];

export default function noCodeComponents({ docComponents, myCollection }) {
  const [visibleLeft, setVisibleLeft] = useState(true); // 是否显示左抽屉
  const [visibleRight, setVisibleRight] = useState(true); // 是否显示右抽屉
  const [currentLeft, setCurrentLeft] = useState('1'); // 当前左侧栏下标
  const [currentComponent, setCurrentComponent] = useState(0); // 当前组件
  const [currentRight, setCurrentRight] = useState('0'); // 当前右侧栏下标
  const [dataSource, setDataSource] = useState(docComponents); // 当前左侧列表数据
  const ref: RefObject<{ changeVal }> = useRef(null);

  // const [astTemplate, setAstTemplate] = useState(docComponents[]); // 组件ast语法树
  const showDrawerLeft = () => {
    setVisibleLeft(true);
  };

  const onCloseLeft = () => {
    setVisibleLeft(false);
  };

  const onCloseRight = () => {
    setVisibleRight(false);
  };

  const changeModule = item => {
    visibleLeft || showDrawerLeft();
    setCurrentLeft(item.key);
    switch (item.key) {
      case '0':
        setDataSource(docComponents);
        break;
      case '1':
        setDataSource(myCollection);
        break;
      default:
        break;
    }
  };

  const handleClick = e => {
    setCurrentRight(e.key);
  };

  const changeComponent = async index => {
    let json = {};
    await postComponentsCreated({
      name: dataSource[index].name,
      file: `${process.env.dirname}/uni-components/`,
      json: json,
    });
    ref.current &&
      ref.current.changeVal(defaultAdapter(configAdapter(dataSource[index].props ?? [])));
    setCurrentComponent(index);
  };

  const handleFormSave = useMemo(() => {
    const saveData = async (data: any) => {
      await postComponentsCreated({
        title: dataSource[currentComponent].title,
        file: `${process.env.dirname}/uni-components/`,
        json: data,
      });
    };
    return debounce(saveData, 1000, false);
  }, [currentComponent]);
  const handleDel = useMemo(() => {
    return (id: any) => {
      console.log(id);
    };
  }, []);
  const editComponent = ({ key, domEvent }) => {
    domEvent.stopPropagation();
    domEvent.preventDefault();
    switch (key) {
      case '0':
        break;

      default:
        break;
    }
  };

  // const menu = (
  //   <Menu inlineCollapsed={false} onClick={editComponent}>
  //     <Menu.Item key='0'>添加收藏</Menu.Item>
  //     <Menu.Item key='1'>添加封面</Menu.Item>
  //     <Menu.Item key='2'>删除组件</Menu.Item>
  //   </Menu>
  // );
  const collection = async (item, e) => {
    e.stopPropagation();
    const { data } = await postCollectionComponents({ data: item });
    console.log(data);
  };

  return (
    <div className='overflow-hidden'>
      <HeaderNocode navigation={navigation} />
      <div className='flex-auto flex justify-between'>
        <Menu
          style={{ width: '80px' }}
          className='h-full'
          defaultSelectedKeys={[]}
          defaultOpenKeys={[]}
          mode='inline'
          theme='light'
          inlineCollapsed={false}
          onClick={changeModule}
        >
          {moduleList.map(item => (
            <Menu.Item
              key={item.key}
              style={{
                height: '80px',
                padding: 0,
                display: 'flex',
                width: '80px',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                textAlign: 'center',
              }}
              title={item.title}
              icon={<Icon style={{ fontSize: '36px' }} type={item.icon} />}
            >
              <div style={{ marginLeft: '-10px', width: '80px' }}>{item.title}</div>
            </Menu.Item>
          ))}
        </Menu>
        <div style={{ width: '400px' }}>
          <Drawer
            title={moduleList[Number(currentLeft)].title}
            width={400}
            style={{ top: '65px', left: '80px' }}
            placement='left'
            onClose={onCloseLeft}
            maskClosable={false}
            closable={false}
            mask={false}
            visible={visibleLeft}
            key='left'
          >
            <List
              grid={{ gutter: 16, column: 2 }}
              dataSource={dataSource}
              renderItem={(item: docComponentsInterface, index: number) => (
                <List.Item
                  className='shadow-md'
                  onClick={() => {
                    changeComponent(index);
                  }}
                >
                  <Card
                    extra={
                      <>
                        <Icon
                          onClick={e => collection(item, e)}
                          style={{ fontSize: '24px' }}
                          type={item.isCollection === 1 ? 'icon-shoucang1' : 'icon-shoucang'}
                        />
                        {/* <Dropdown overlay={menu} trigger={['click']}>
                            <Icon
                              onClick={e => e.stopPropagation()}
                              style={{ fontSize: '24px' }}
                              type='icon-more'
                            />
                          </Dropdown> */}
                      </>
                    }
                    hoverable
                    type='inner'
                    headStyle={
                      currentComponent === index
                        ? { background: 'linear-gradient(to right, #00F5A0, #00D9F5)' }
                        : {}
                    }
                    bodyStyle={
                      currentComponent === index
                        ? { background: 'linear-gradient(to right, #00F5A0, #00D9F5)' }
                        : {}
                    }
                    title={item.title}
                  >
                    {currentComponent}
                  </Card>
                </List.Item>
              )}
            />
            <div style={{ height: '50px' }} />
          </Drawer>
        </div>
        <div
          style={{
            height: '812px',
            width: '375px', // 375+22+22
            boxShadow: '0 4px 30px 0 rgba(4, 59, 85, 0.2)',
            transformOrigin: 'top',
            transform: 'translate(0, 20px) scale(0.75)',
            borderRadius: '30px',
          }}
        >
          <iframe
            title='uni-app'
            scrolling='auto'
            src='http://localhost:8080/#/'
            style={{ height: '100%', width: '100%', borderRadius: '30px' }}
          />
        </div>
        <div style={{ width: '480px' }}>
          <Drawer
            title={
              <Menu onClick={handleClick} selectedKeys={[currentRight]} mode='horizontal'>
                <Menu.Item key='0'>组件属性</Menu.Item>
              </Menu>
            }
            width={480}
            style={{ top: '65px' }}
            placement='right'
            maskClosable={false}
            closable={false}
            onClose={onCloseRight}
            mask={false}
            visible={visibleRight}
            key='right'
          >
            {currentRight === '0' && (
              <FormRender
                config={configAdapter(dataSource[currentComponent].props ?? [])}
                uid={dataSource[currentComponent].title}
                defaultValue={{}}
                onSave={handleFormSave}
                onDel={handleDel}
                rightPanelRef={ref}
              />
            )}
            {currentRight === '1' && <p>page</p>}
            {currentRight === '2' && <p>application</p>}
            <div style={{ height: '50px' }} />
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // const read = promisify(readFile);

  const cwd = 'uni-components/node_modules/uctui';
  const _docComponents = glob.sync('components/uct-*/*.vue', { cwd }).map(f => {
    const titleReg: RegExpExecArray | null = /\/uct-(.+)\/(.+).vue$/g.exec(f);
    const title = titleReg ? titleReg[1] : null;
    const name = titleReg ? titleReg[2] : null;
    return { name, title, file: cwd + '/' + f };
  });

  const { data: _myCollection } = await getCollectionComponents();
  const docComponents = await Promise.all(
    _docComponents.map(async item => {
      const { data } = await getComponentAST(item);
      return Object.assign(item, data);
    }),
  );

  const myCollection = await Promise.all(
    _myCollection.map(async item => {
      const { data } = await getComponentAST(item);
      return Object.assign(item, data);
    }),
  );
  return { props: { docComponents, myCollection } };
}
