import React, {
  useMemo,
  memo,
  ReactNode,
  useContext,
  CSSProperties,
  useState,
  useImperativeHandle,
} from 'react';
import { List, Card, Tooltip } from 'antd';

interface docComponentsInterface {
  title: string;
  name: string;
  file: string;
  description?: string;
}

interface SourceBoxProps {
  dataSource: any;
  header: ReactNode;
}
const SourceBox = (props: SourceBoxProps) => {
  const { dataSource, header } = props;
  const [current, setCurrent] = useState(0); // 当前位置
  // const [dataSource, setDataSource] = useState([]); // 当前列表数据
  // useImperativeHandle(ref, () => ({
  //   changeVal: newVal => {
  //     setDataSource(newVal);
  //   },
  // }));
  const changeComponent = async index => {
    let json = {};
    setCurrent(index);
  };
  return (
    <List
      grid={{ gutter: 10, column: 2 }}
      dataSource={dataSource}
      renderItem={(item: docComponentsInterface, index: number) => (
        <List.Item
          className='shadow-md'
          onClick={() => {
            changeComponent(index);
          }}
        >
          <Tooltip title={item.description}>
            <Card
              extra={header}
              hoverable
              type='inner'
              headStyle={
                current === index
                  ? { background: 'linear-gradient(to right, #ECE9E6, #FFFFFF' }
                  : {}
              }
              bodyStyle={
                current === index
                  ? { background: 'linear-gradient(to right, #ECE9E6, #FFFFFF' }
                  : {}
              }
              title={item.title}
            >
              <div className='truncate h-10'>{item.description || ''}</div>
            </Card>
          </Tooltip>
        </List.Item>
      )}
    />
  );
};

export default memo(SourceBox);
