// This example requires Tailwind CSS v2.0+
import { useEffect, useRef, useState } from 'react';
import { Card } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { uuid } from '@/utils/tool';
// Modal组件
import UniappComponentsModal from '@/components/CreatedModal/UniappComponentsModal';

// 背景效果
import BgImage from '@/components/Animation/BgImage';
// 组件动画效果
import QueueAnim from 'rc-queue-anim';

// 文字动画
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import { getEnter, animation } from '@/public/animation/textty';

const IconFont = createFromIconfontCN({
  scriptUrl: [
    process.env.iconPath as string,

    //  icon-javascript, icon-java, icon-shoppingcart (overrided)
  ],
});
const { Meta } = Card;

const cardModule = [
  {
    id: 0,
    title: 'uni-app应用',
    description: '添加新项目',
    avatar: 'icon-yingyong1',
    img: 'https://zos.alipayobjects.com/rmsportal/pTfNdthdsUpLPLJ.png',
  },
  {
    id: 1,
    title: 'uni-app组件',
    description: '制作组件库',
    avatar: 'icon-yingyong2',
    img: 'https://zos.alipayobjects.com/rmsportal/TDIbcrKdLWVeWJM.png',
  },
  {
    id: 2,
    title: 'uni-app工具',
    description: '创造js工具库',
    avatar: 'icon-gongjuqu',
    img: 'https://zos.alipayobjects.com/rmsportal/dvQuFtUoRmvWLsZ.png',
  },
];

export default function created() {
  const uniAppModal = useRef({
    changeVal: v => {},
  });
  const showModal = () => {
    uniAppModal.current.changeVal(true);
  };

  return (
    <div className='flex items-center justify-around bg-white overflow-hidden flex-auto relative'>
      <BgImage />
      {cardModule.map(item => (
        <QueueAnim delay={300} className='queue-simple' key={uuid(6, 10)}>
          <Card
            hoverable
            style={{ width: 300 }}
            cover={<img src={item.img} alt='' />}
            actions={[
              <IconFont
                style={{ fontSize: '32px' }}
                type='icon-jurassic_add-gongcheng'
                onClick={showModal}
              />,
              <IconFont
                style={{ fontSize: '32px' }}
                type='icon-jurassic_import-gongcheng'
                onClick={showModal}
              />,
            ]}
          >
            <Meta
              avatar={<IconFont type={item.avatar} style={{ fontSize: '32px' }} />}
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
      <UniappComponentsModal ref={uniAppModal} />
    </div>
  );
}
