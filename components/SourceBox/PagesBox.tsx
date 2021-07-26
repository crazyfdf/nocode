import Button from 'antd/lib/button';
import List from 'antd/lib/list';
import { useMemo, useRef, useState } from 'react';
import Icon from '@/components/Icon/Icon';
import UniAppCreatedPagesModal from '@/components/Modal/UniAppCreatedPagesModal';
import ListQueueAnim from '@/components/Animation/ListQueueAnim';

interface DataInterFace {
  _id: string;
  name: string;
  title: string;
  path: string;
  description?: string;
  type: string;
}

interface PropsInterFace {
  data: DataInterFace[];
  changePage: (v: number) => void;
}
const typeIcon = {
  list: 'icon-wuxuliebiao',
  form: 'icon-dingdan',
  details: 'icon-xiangqing2',
};

export default function PagesBox(props: PropsInterFace) {
  const { data, changePage } = props;
  const [items, setItems] = useState(data);
  const [current, setCurrent] = useState(0);
  const uniPagesModal = useRef({
    changeVal: v => {},
  });

  const onAdd = () => {
    // items.unshift({ key: Date.now(), page: Date.now(), icon: 'icon--biaodanmoban' });
    // let item = [...items];
    // setItems(item);
    uniPagesModal.current.changeVal(true);
  };
  const onRemove = item => {
    setItems(items.filter(v => v.name !== item.name));
  };

  const changeData = useMemo(
    () => res => {
      items.unshift(res);
      let item = [...items];
      setItems(item);
    },
    [],
  );
  const changeCurrent = index => {
    setCurrent(index);
    changePage(index);
  };

  return (
    <>
      <List
        grid={{ gutter: 10, column: 1 }}
        dataSource={items}
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 5,
        }}
        header={
          <>
            <Button onClick={onAdd} type='primary'>
              添加页面
            </Button>
          </>
        }
        renderItem={(item, index) => (
          <List.Item
            key={item.name}
            onClick={() => changeCurrent(index)}
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
                  <Icon style={{ fontSize: '24px', margin: 0 }} type={typeIcon[item.type]} />
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
      <UniAppCreatedPagesModal ref={uniPagesModal} changeData={changeData} />
    </>
  );
}