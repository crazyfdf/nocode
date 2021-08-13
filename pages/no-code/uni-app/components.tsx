import HeaderNocode from '@/components/Header/Header-nocode';
import { Menu, Drawer, Dropdown, List, Card } from 'antd';
import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { configAdapter, defaultAdapter } from '@/components/Renderer/FormRenderAdapter';
import glob from 'globby';
import Icon from '@/components/Icon/Icon';
import FormRender from '@/components/Renderer/FormRender';
import { debounce } from '@/utils/tool';
import FormItems from '@/components/FormComponents/FormItems';

const {
  getComponentAST,
  postComponentsCreate,
  postCollectionComponents,
  getCollectionComponents,
  postRun,
} = require('@/request/api');

interface docComponentsInterface {
  title?: string;
  name?: string;
  isCollection: number;
  file: string;
}

const moduleList = [
  { key: '0', title: 'uct组件', icon: 'icon-guanlizujian' },
  { key: '1', title: '我的组件', icon: 'icon-guanlizujian' },
];

export default function noCodeComponents({ docComponents, myCollection }) {
  const [currentLeft, setCurrentLeft] = useState('1'); // 当前左侧栏下标
  const [currentComponent, setCurrentComponent] = useState(0); // 当前组件
  const [dataSource, setDataSource] = useState(docComponents); // 当前左侧列表数据
  const [src, setSrc] = useState('http://localhost:3306/#');
  const ref: RefObject<{ changeVal }> = useRef(null);

  const navigation: object[] = [
    { title: '模板库', icon: '', handler: 'user' },
    {
      title: '预览',
      icon: '',
      handler: async () => {
        await postRun({ path: `${process.env.dirname}/uni-components/`, type: 'h5' });
        // FIXME:无法知道项目什么时候在运行，先用setTimeout代替
        setTimeout(() => {
          setSrc('http://localhost:3306/#/');
        }, 5000);
      },
    },
    { title: '发布', icon: '', handler: 'user' },
    { title: '生成组件文档', icon: '', handler: 'user' },
  ];

  const changeModule = item => {
    setCurrentLeft(item.key);
    setCurrentComponent(0);
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

  const changeComponent = async index => {
    let json = {};
    await postComponentsCreate({
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
      await postComponentsCreate({
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
              icon={<Icon style={{ fontSize: '36px' }} type={item.icon} />}
            >
              <div style={{ marginLeft: '-10px', width: '80px' }}>{item.title}</div>
            </Menu.Item>
          ))}
        </Menu>
        <div style={{ width: '400px' }} className='h-screen shadow overflow-auto px-4 py-5'>
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
                    <Icon
                      onClick={e => collection(item, e)}
                      style={{ fontSize: '24px' }}
                      type={item.isCollection === 1 ? 'icon-shoucang1' : 'icon-shoucang'}
                    />
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
            name='iframe'
            title='uni-app'
            scrolling='auto'
            src={src}
            style={{ height: '100%', width: '100%', borderRadius: '30px' }}
          />
        </div>
        <div style={{ width: '480px' }} className='h-screen shadow-xl overflow-auto px-4 py-5'>
          <FormRender
            edit={true}
            config={configAdapter(dataSource[currentComponent].props ?? [])}
            uid={dataSource[currentComponent].title}
            defaultValue={{}}
            onSave={handleFormSave}
            onDel={handleDel}
            rightPanelRef={ref}
          />
          {/* <FormItems
              edit={true}
              formList={configAdapter(dataSource[currentComponent].props)}
              data={dataSource[currentComponent].props}
              rightPanelRef={ref}
              onChange={handleFormSave}
            /> */}
          <div style={{ height: '50px' }} />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const cwd = 'uni-components/node_modules/uctui/components';
  const componentName = 'uct';

  const _docComponents = glob.sync(`${componentName}-*/${componentName}-*.vue`, { cwd }).map(f => {
    const title = f ? f.split('/')[0] : null;
    const name = title ? title.slice(componentName.length + 1) : null;
    return { name, title, file: cwd + '/' + f };
  });

  const { data: _myCollection } = await getCollectionComponents();
  const docComponents = await Promise.all(
    _docComponents.map(async item => {
      const { data } = await getComponentAST(item);
      return Object.assign(item, data);
    }),
  );
  console.log(docComponents[1].props);

  const myCollection = await Promise.all(
    _myCollection.map(async item => {
      const { data } = await getComponentAST(item);
      return Object.assign(item, data);
    }),
  );
  return { props: { docComponents, myCollection } };
}
