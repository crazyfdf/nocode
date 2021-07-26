import Table from 'antd/lib/table';
import Button from 'antd/lib/button';

import { TweenOneGroup } from 'rc-tween-one';
import React, { useState } from 'react';

const TableContext = React.createContext(false);
const newData = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No.1 Lake Park',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No.1 Lake Park',
  },
  {
    key: 3,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No.1 Lake Park',
  },
  {
    key: 4,
    name: 'Jim Red',
    age: 18,
    address: 'London No.1 Lake Park',
  },
];
export default function TableEnterLeave() {
  const [isPageTween, setIsPageTween] = useState(false);
  const [data, setData] = useState(newData);

  const onEnd = e => {
    const dom = e.target;
    dom.style.height = 'auto';
  };

  const onAdd = () => {
    const i = Math.round(Math.random() * (data.length - 1));
    data.unshift({
      key: Date.now(),
      name: data[i].name,
      age: data[i].age,
      address: data[i].address,
    });
    let item = [...data];
    setData(item);
  };

  const onDelete = (key, e) => {
    e.preventDefault();
    setData(data.filter(item => item.key !== key));
  };

  const pageChange = () => {
    setIsPageTween(true);
  };
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text, record) => (
        <span
          onClick={e => {
            onDelete(record.key, e);
          }}
        >
          Delete
        </span>
      ),
    },
  ];
  const enterAnim = [
    {
      opacity: 0,
      x: 30,
      backgroundColor: '#fffeee',
      duration: 0,
    },
    {
      height: 0,
      duration: 200,
      type: 'from',
      delay: 250,
      ease: 'easeOutQuad',
      onComplete: onEnd,
    },
    {
      opacity: 1,
      x: 0,
      duration: 250,
      ease: 'easeOutQuad',
    },
    { delay: 1000, backgroundColor: '#fff' },
  ];
  const pageEnterAnim = [
    {
      opacity: 0,
      duration: 0,
    },
    {
      height: 0,
      duration: 150,
      type: 'from',
      delay: 150,
      ease: 'easeOutQuad',
      onComplete: onEnd,
    },
    {
      opacity: 1,
      duration: 150,
      ease: 'easeOutQuad',
    },
  ];
  const leaveAnim = [
    { duration: 250, opacity: 0 },
    { height: 0, duration: 200, ease: 'easeOutQuad' },
  ];
  const pageLeaveAnim = [
    { duration: 150, opacity: 0 },
    { height: 0, duration: 150, ease: 'easeOutQuad' },
  ];

  // 动画标签，页面切换时改用 context 传递参数；
  const animTag = $props => {
    return (
      <TableContext.Consumer>
        {isPageTween => {
          return (
            <TweenOneGroup
              component='tbody'
              enter={!isPageTween ? enterAnim : pageEnterAnim}
              leave={!isPageTween ? leaveAnim : pageLeaveAnim}
              appear={false}
              exclusive
              {...$props}
            />
          );
        }}
      </TableContext.Consumer>
    );
  };

  return (
    <div>
      <Button type='primary' onClick={onAdd}>
        Add
      </Button>
      <TableContext.Provider value={isPageTween}>
        <Table
          columns={columns}
          pagination={{ pageSize: 4 }}
          dataSource={data}
          components={{ body: { wrapper: animTag } }}
          onChange={pageChange}
        />
      </TableContext.Provider>
    </div>
  );
}
