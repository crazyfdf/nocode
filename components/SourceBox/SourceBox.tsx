import { memo, ReactNode, useState } from 'react';
import { List, Card, Tooltip } from 'antd';

interface docComponentsInterface {
  title: string;
  name: string;
  file: string;
  description?: string;
}

interface SourceBoxProps {
  dataSource: any;
  header?: ReactNode;
  change?: (index: number) => void;
}
const SourceBox = (props: SourceBoxProps) => {
  const { dataSource, header, change } = props;
  const [current, setCurrent] = useState(0); // 当前位置
  const changeComponent = async index => {
    setCurrent(index);
    change && change(index);
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
              className={
                current === index ? 'border-solid border-4 border-light-blue-500 box-border' : ''
              }
              title={item.title}
              bordered={false}
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
