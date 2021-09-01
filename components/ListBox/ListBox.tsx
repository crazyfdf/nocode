import { useEffect, useState } from 'react';
import Icon from '@/components/Icon/Icon';
import ListQueueAnim from '@/components/Animation/ListQueueAnim';
import { Tooltip, Button, List, Select, Input } from 'antd';
import { useStateValue } from '@/utils/tool';

const { Search } = Input;

interface DataInterFace {
  status: number;
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
  changeCurrent: (item: DataInterFace) => void;
  input?: (values: any) => void;
  isTemplate?: boolean;
  remove: (item: any, index: number) => void;
  collection: (item: any, index: number) => void;
  config: ConfigInterFace;
  defaultItem?: DataInterFace;
}

function ListBox(props: PropsInterFace) {
  const {
    dataSource: dataInit = [],
    changeCurrent,
    defaultItem,
    config,
    isTemplate = false,
    input,
    remove,
    collection,
  } = props;
  const [current, setCurrent] = useState(defaultItem);
  const [dataSource, setDataSource] = useStateValue(dataInit);
  const [type, setType] = useState(''); // 筛选类型
  const [value, setValue] = useState(''); // 搜索值
  const [pageSize, setPageSize] = useState(20);
  // 添加
  const onInput = (item, e) => {
    e.stopPropagation();
    input && input(item);
  };

  // 删除
  const onRemove = (item, index, e) => {
    e.stopPropagation();
    remove && remove(item, index);
  };

  // 收藏
  const onCollection = (item, index, e) => {
    e.stopPropagation();
    collection && collection(item, index);
  };

  // 切换类型
  const filterData = type => {
    setType(type);
  };
  // 搜索
  const onSearch = value => {
    setValue(value);
  };
  // 筛选列表
  useEffect(() => {
    const _dataSource = dataInit.filter(item => {
      if (type && value) {
        return item.type === type && item.title.indexOf(value) !== -1;
      }
      if (type) {
        return item.type === type;
      }
      if (value) {
        return item.title.indexOf(value) !== -1;
      }
      return item;
    });
    setDataSource(_dataSource);
  }, [type, value]);

  // 切换当前
  const _changeCurrent = item => {
    setCurrent(item);
    changeCurrent && changeCurrent(item);
  };

  // 给类型添加icon
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

  const onShowSizeChange = (page, pageSize) => {
    setPageSize(pageSize);
  };

  return (
    <List
      grid={{ gutter: 10, column: 1 }}
      dataSource={dataSource}
      pagination={{
        onShowSizeChange: onShowSizeChange,
        pageSize,
        size: 'small',
      }}
      header={
        <div className='flex justify-between'>
          <Select defaultValue='' style={{ width: 100 }} onChange={filterData} bordered={false}>
            <Select.Option value=''>
              <Icon className='mr-2' type='icon-xianxingbiaodan' />
              全部
            </Select.Option>
            {config.type.map(item => (
              <Select.Option key={item.value} value={item.value}>
                <Icon className='mr-2' type={item.icon} />
                {item.title}
              </Select.Option>
            ))}
          </Select>
          <Search className='ml-4' allowClear placeholder='搜索名称' onSearch={onSearch} />
        </div>
      }
      renderItem={(item, index) => (
        <List.Item
          key={item._id}
          onClick={() => _changeCurrent(item)}
          className='rounded'
          style={
            current?._id === item._id
              ? { backgroundImage: 'linear-gradient(to left, #ff6e7f, #bfe9ff)', padding: '12px' }
              : { padding: '12px' }
          }
        >
          <ListQueueAnim>
            <div key={item.name} className='flex items-center'>
              <Icon style={{ fontSize: '24px' }} type={typeIcon(item.type)} />
              <div className='ml-2 flex-1'>
                <div className='flex justify-between mb-2'>
                  <div className='flex-1'>{item.title}</div>
                  <Tooltip
                    placement='rightBottom'
                    title={
                      <div className='flex flex-col'>
                        <Button
                          onClick={e => onCollection(item, index, e)}
                          style={{ color: '#fff', backgroundColor: '#4a4a4a' }}
                        >
                          <Icon
                            style={{ fontSize: '16px' }}
                            type={item.status ? 'icon-shoucang1' : 'icon-shoucang'}
                          />
                          {item.status ? '取消' : '收藏'}
                        </Button>
                        {isTemplate ? (
                          <Button
                            onClick={e => onInput(item, e)}
                            style={{ color: '#fff', backgroundColor: '#4a4a4a' }}
                          >
                            <Icon style={{ fontSize: '16px' }} type='icon-daoru' />
                            导入
                          </Button>
                        ) : (
                          <Button
                            onClick={e => onRemove(item, index, e)}
                            style={{ color: '#fff', backgroundColor: '#4a4a4a' }}
                          >
                            <Icon style={{ fontSize: '16px' }} type='icon-lajitong1' />
                            删除
                          </Button>
                        )}
                      </div>
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
  );
}

export default ListBox;
