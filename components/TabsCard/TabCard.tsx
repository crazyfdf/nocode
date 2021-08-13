import { Tabs } from 'antd';
import { injectGlobal } from '@emotion/css';

injectGlobal`
  .card-container > .ant-tabs-card .ant-tabs-content {
    height: 120px;
    margin-top: -16px;
  }

  .card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
    background: #fff;
    color: white;
    padding: 16px 12px;
  }

  .card-container > .ant-tabs-card > .ant-tabs-nav::before {
    display: none;
  }
  .ant-tabs-content-holder{
    overflow: auto;
  }

  .card-container > .ant-tabs-card .ant-tabs-tab,
  [data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-tab {
    display: flex;
    justify-content: center;
    padding:8px;
    background: transparent;
    border-color: transparent;
  }

  .card-container > .ant-tabs-card .ant-tabs-tab-active,
  [data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-tab-active {
    background: #fff;
    border-color: #fff;
  }

  .card-container > .ant-tabs-card .ant-tabs-tab-btn {
    color: #fff;
  }

  .card-container > .ant-tabs-card .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #000;
  }

  #components-tabs-demo-card-top .code-box-demo {
    background: #f5f5f5;
    overflow: hidden;
    padding: 24px;
  }

  [data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-content {
    height: 120px;
    margin-top: -8px;
  }

  [data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-tab {
    background: transparent;
    border-color: transparent;
  }

  [data-theme='dark'] #components-tabs-demo-card-top .code-box-demo {
    background: #000;
  }

  [data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
    background: #141414;
  }

  [data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-tab-active {
    background: #141414;
    border-color: #141414;
  }
`;
export default function TabsCard(props) {
  const { children, changeLeft } = props;
  return (
    <>
      <div className='card-container'>
        <Tabs
          style={{ width: '400px' }}
          type='card'
          onChange={changeLeft}
          tabBarStyle={{ backgroundColor: 'rgb(31, 41, 55)' }}
          className='shadow-xl h-full'
          key='left'
          tabPosition='left'
        >
          {children}
        </Tabs>
      </div>
    </>
  );
}
