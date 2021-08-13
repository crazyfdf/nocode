import { memo, useEffect, useMemo, useRef, useState } from 'react';
import Icon from '@/components/Icon/Icon';
import UniAppModal from '@/components/Modal/UniAppModal';
import ListQueueAnim from '@/components/Animation/ListQueueAnim';
import { Tooltip, Button, List } from 'antd';

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
  type: any[];
  children: any[];
}

interface PropsInterFace {
  dataSource: DataInterFace[];
  changeCurrent: (index: number) => void;
  add: (values: any) => void;
  remove: (values: any) => void;
  collection: (values: any) => void;
  config: ConfigInterFace;
}

function ListBox(props: PropsInterFace) {
  const { dataSource = [], changeCurrent, add, config, remove, collection } = props;
  const [current, setCurrent] = useState(0);
  console.log(dataSource);

  const [page, setPage] = useState(1);
  const uniModal = useRef({
    changeVal: v => {},
  });

  // 添加
  const _add = values => {
    add && add(values);
  };
  // 删除
  const onRemove = (item, e) => {
    e.stopPropagation();
    collection && collection(item);
  };
  // 收藏
  const onCollection = (item, e) => {
    e.stopPropagation();
    collection && collection(item);
  };

  const _changeCurrent = index => {
    setCurrent((page - 1) * 5 + index);
    changeCurrent && changeCurrent((page - 1) * 5 + index);
  };
  const typeIcon = type => {
    let res = 'icon-biaoqiankuozhan_shoucang-203';
    for (let i = 0; i < config.type.length; i++) {
      if (config.type[i].value === type) {
        res = config.type[i].icon;
        break;
      }
    }
    return res;
  };
  return (
    <>
      <List
        grid={{ gutter: 10, column: 1 }}
        dataSource={dataSource}
        pagination={{
          onChange: page => {
            console.log(page);
            setPage(page);
          },
          pageSize: 5,
        }}
        header={
          <>
            <Button onClick={() => uniModal.current.changeVal(true)} type='primary'>
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
              current === (page - 1) * 5 + index
                ? { backgroundImage: 'linear-gradient(to left, #ff6e7f, #bfe9ff)', padding: '12px' }
                : { padding: '12px' }
            }
          >
            <ListQueueAnim>
              {/* key={item.name} */}
              <div className='flex items-center'>
                <Icon style={{ fontSize: '24px' }} type={typeIcon(item.type)} />
                <div className='ml-2 flex-1'>
                  <div className='flex justify-between mb-2'>
                    <div className='flex-1'>{item.title}</div>
                    <Tooltip
                      placement='rightBottom'
                      title={
                        <>
                          <Button
                            style={{ display: 'flex', alignItems: 'center' }}
                            onClick={e => onCollection(item, e)}
                          >
                            <Icon style={{ fontSize: '16px' }} type='icon-shoucang' />
                            收藏
                          </Button>

                          <Button
                            style={{ display: 'flex', alignItems: 'center' }}
                            onClick={e => onRemove(item, e)}
                          >
                            <Icon style={{ fontSize: '16px' }} type='icon-lajitong1' />
                            删除
                          </Button>
                        </>
                      }
                    >
                      <Icon type='icon-more' style={{ fontSize: '22px' }} />
                    </Tooltip>
                  </div>
                  <div className='text-gray-500 text-sm'>{item.description}</div>
                </div>
              </div>
            </ListQueueAnim>
          </List.Item>
        )}
      />
      <UniAppModal ref={uniModal} add={_add} type={config.type} title={config.title} />
    </>
  );
}

export default ListBox;
