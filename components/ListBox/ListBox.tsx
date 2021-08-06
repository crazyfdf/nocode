import Button from 'antd/lib/button';
import List from 'antd/lib/list';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import Icon from '@/components/Icon/Icon';
import UniAppCreatePageModal from '@/components/Modal/UniAppCreatePageModal';
import ListQueueAnim from '@/components/Animation/ListQueueAnim';

interface DataInterFace {
  _id: string;
  name: string;
  title: string;
  path: string;
  description?: string;
  type: string;
}

interface ConfigInterFace {
  key: number;
  title: string;
  icon: string;
  typeIcon: object;
  children: any[];
}

interface PropsInterFace {
  dataSource: DataInterFace[];
  changeCurrent: (index: number) => void;
  changeData: (values: any) => void;
  remove: (values: any) => void;
  config: ConfigInterFace;
}

function ListBox(props: PropsInterFace) {
  const { dataSource = [], changeCurrent, changeData, config, remove } = props;
  // const [items, setItems] = useState(data);
  const [current, setCurrent] = useState(0);
  const uniModal = useRef({
    changeVal: v => {},
  });

  const onAdd = () => {
    uniModal.current.changeVal(true);
  };
  const onRemove = item => {
    remove && remove(item);
  };

  const _changeData = useMemo(
    () => values => {
      changeData && changeData(values);
    },
    [],
  );
  const _changeCurrent = index => {
    setCurrent(index);
    changeCurrent && changeCurrent(index);
  };
  return (
    <>
      <List
        grid={{ gutter: 10, column: 1 }}
        dataSource={dataSource}
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 5,
        }}
        header={
          <>
            <Button onClick={onAdd} type='primary'>
              {`添加${config.title}`}
            </Button>
          </>
        }
        renderItem={(item, index) => (
          <List.Item
            key={item.name}
            onClick={() => _changeCurrent(index)}
            className='rounded'
            style={
              current === index
                ? { backgroundImage: 'linear-gradient(to left, #ff6e7f, #bfe9ff)', padding: '12px' }
                : { padding: '12px' }
            }
          >
            <ListQueueAnim>
              <div key={item.name} className='flex justify-between items-center'>
                <div className='flex items-center'>
                  <Icon style={{ fontSize: '24px', margin: 0 }} type={config.typeIcon[item.type]} />
                  <div className='ml-2'>
                    <div>{item.title}</div>
                    <div className='text-gray-500 text-sm'>{item.description}</div>
                  </div>
                </div>
                <Icon
                  style={{ fontSize: '30px', margin: 0 }}
                  onClick={() => onRemove(item)}
                  type='icon-lajitong1'
                />
              </div>
            </ListQueueAnim>
          </List.Item>
        )}
      />
      <UniAppCreatePageModal ref={uniModal} changeData={_changeData} />
    </>
  );
}

export default ListBox;
