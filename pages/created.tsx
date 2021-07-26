// This example requires Tailwind CSS v2.0+
import { useEffect, useRef, useState } from 'react';
import { Card, Image } from 'antd';
import Icon from '@/components/Icon/Icon';
import { uuid } from '@/utils/tool';
// Modal组件
import UniAppComponentsModal from '@/components/Modal/UniAppComponentsModal';
import UniAppApplicationModal from '@/components/Modal/UniAppApplicationModal';

// 背景效果
import BgImage from '@/components/Animation/BgImage';
// 组件动画效果
import QueueAnim from 'rc-queue-anim';

// 文字动画
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import { getEnter, animation } from '@/public/animation/textty';

const { Meta } = Card;

export default function created() {
  const uniAppModal = useRef({
    changeAppVal: v => {},
  });
  const uniComponentsModal = useRef({
    changeComponentsVal: v => {},
  });
  const cardModule = [
    {
      id: 0,
      title: 'uni-app应用',
      description: '添加新项目',
      avatar: 'icon-yingyong1',
      img: 'https://zos.alipayobjects.com/rmsportal/pTfNdthdsUpLPLJ.png',
      showModal: () => {
        uniAppModal.current.changeAppVal(true);
      },
    },
    {
      id: 1,
      title: 'uni-app组件',
      description: '制作组件库',
      avatar: 'icon-yingyong2',
      img: 'https://zos.alipayobjects.com/rmsportal/TDIbcrKdLWVeWJM.png',
      showModal: () => {
        uniComponentsModal.current.changeComponentsVal(true);
      },
    },
    {
      id: 2,
      title: 'uni-app工具',
      description: '创造js工具库',
      avatar: 'icon-gongjuqu',
      img: 'https://zos.alipayobjects.com/rmsportal/dvQuFtUoRmvWLsZ.png',
    },
  ];

  return (
    <div className='flex items-center justify-around bg-white overflow-hidden flex-auto relative'>
      <BgImage />
      {cardModule.map(item => (
        <QueueAnim delay={300} className='queue-simple' key={uuid(6, 10)}>
          <Card
            hoverable
            style={{ width: 300 }}
            cover={
              <Image
                src={item.img}
                preview={false}
                placeholder={<Image preview={false} src={item.img} width={300} />}
              />
            }
            actions={[
              <Icon
                style={{ fontSize: '32px' }}
                type='icon-jurassic_add-gongcheng'
                onClick={item.showModal}
              />,
              <Icon
                style={{ fontSize: '32px' }}
                type='icon-jurassic_import-gongcheng'
                onClick={item.showModal}
              />,
            ]}
          >
            <Meta
              avatar={<Icon type={item.avatar} style={{ fontSize: '32px' }} />}
              title={
                <Texty enter={getEnter} leave={getEnter}>
                  {item.title}
                </Texty>
              }
              description={
                <Texty enter={getEnter} leave={getEnter}>
                  {item.description}
                </Texty>
              }
            />
          </Card>
        </QueueAnim>
      ))}
      <UniAppApplicationModal ref={uniAppModal} />
      <UniAppComponentsModal ref={uniComponentsModal} />
    </div>
  );
}
