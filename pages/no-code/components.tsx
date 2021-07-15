import HeaderNocode from '@/components/Header-nocode';
import { Menu, Drawer, Dropdown, List, Card } from 'antd';
import { useMemo, useRef, useState } from 'react';

import { createFromIconfontCN } from '@ant-design/icons';
import glob from 'globby';
import { getComponentASTApi, postComponentsCreatedApi } from '@/request/api';
import { ComponentDoc } from '@/types/component';
import FormRender from '@/components/renderer/FormRender';
import { debounce } from '@/utils/tool';

interface docComponentsInterface {
  title?: string;
  file: string;
}

const IconFont = createFromIconfontCN({
  scriptUrl: [
    process.env.iconPath as string, // icon-javascript, icon-java, icon-shoppingcart (overrided)
  ],
});

const navigation: object[] = [
  { title: '模板库', icon: '', handler: 'user' },
  { title: '预览', icon: '', handler: '' },
  { title: '发布', icon: '', handler: 'user' },
  { title: '打开VSCode', icon: '', handler: 'user' },
  { title: '生成组件文档', icon: '', handler: 'user' },
];
const moduleList = [{ key: '0', title: '我的组件', icon: 'icon-guanlizujian' }];

export default function noCodeComponents({ docComponents }) {
  const [visibleLeft, setVisibleLeft] = useState(true);
  const [visibleRight, setVisibleRight] = useState(true);
  const [currentLeft, setCurrentLeft] = useState('0');
  const [currentComponent, setCurrentComponent] = useState(0);
  const [title, setTitle] = useState('我的组件');
  const [currentRight, setCurrentRight] = useState('0');
  const astTemplateInit: ComponentDoc = {
    displayName: '',
    props: [],
    exportName: '',
  };
  const [astTemplate, setAstTemplate] = useState(astTemplateInit);
  const showDrawerLeft = () => {
    setVisibleLeft(true);
  };

  const onCloseLeft = () => {
    setVisibleLeft(false);
  };

  // const showDrawerRight = () => {
  //   setVisibleRight(true);
  // };

  const onCloseRight = () => {
    setVisibleRight(false);
  };

  const changeModule = item => {
    visibleLeft || showDrawerLeft();
    setCurrentLeft(item.key);
    setTitle(moduleList[parseInt(item.key, 10)].title);
  };

  const handleClick = e => {
    setCurrentRight(e.key);
  };

  const changeComponent = async index => {
    const { data } = await getComponentASTApi(docComponents[index]);
    let json = {};
    await postComponentsCreatedApi({
      title: docComponents[index].title,
      file: `${process.env.dirname}/uni-components/`,
      json: json,
    });
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    setAstTemplate(data);
    setCurrentComponent(index);
  };
  const editComponent = ({ key }) => {};

  const handleFormSave = useMemo(() => {
    const saveData = async (data: any) => {
      await postComponentsCreatedApi({
        title: docComponents[currentComponent].title,
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
  const ref = useRef<HTMLDivElement>(null);

  const menu = (
    <Menu onClick={editComponent}>
      <Menu.Item key='0'>修改名称</Menu.Item>
      <Menu.Item key='1'>添加封面</Menu.Item>
      <Menu.Item key='2'>删除组件</Menu.Item>
    </Menu>
  );

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
              icon={<IconFont style={{ fontSize: '36px' }} type={item.icon} />}
            >
              <div style={{ marginLeft: '-10px', width: '80px' }}>{item.title}</div>
            </Menu.Item>
          ))}
        </Menu>
        <div style={{ width: '400px' }}>
          <Drawer
            title={title}
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
            {currentLeft === '0' && (
              <List
                grid={{ gutter: 16, column: 2 }}
                dataSource={docComponents}
                renderItem={(item: docComponentsInterface, index: number) => (
                  <List.Item
                    className='shadow-md'
                    onClick={() => {
                      changeComponent(index);
                    }}
                  >
                    <Card
                      extra={
                        <Dropdown overlay={menu}>
                          <IconFont
                            onClick={e => e.stopPropagation()}
                            style={{ fontSize: '24px' }}
                            type='icon-more'
                          />
                        </Dropdown>
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
            )}
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
                config={astTemplate.props ?? []}
                uid={astTemplate.exportName}
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
  const docComponents = glob.sync('components/uct-*/*.vue', { cwd }).map(f => {
    const titleReg: RegExpExecArray | null = /\/uct-(.+)\/(.+).vue$/g.exec(f);
    const title = titleReg ? titleReg[2] : null;
    return { title, file: cwd + '/' + f };
  });

  return { props: { docComponents } };
}
