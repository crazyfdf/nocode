import QueueAnim from 'rc-queue-anim';
import { memo } from 'react';

const enterAnim = [
  {
    opacity: [1, 0],
    x: [0, 30],
    height: ['100%', 0],
    ease: ['easeOutQuad', 'easeOutQuad'],
    duration: 1000,
  },
  {
    opacity: [0, 1],
    x: [30, 0],
    backgroundColor: ['#fffeee', '#fff'],
    ease: ['easeOutQuad', 'easeOutQuad'],
    duration: 500,
  },
];

function ListQueueAnim(props) {
  const { children } = props;
  // FIXME: -- 渲染待优化
  return (
    <QueueAnim type={['left', 'right']} animConfig={enterAnim}>
      {children}
    </QueueAnim>
  );
}

const compare = (preProps, nextProps) => {
  return true;
};

export default memo(ListQueueAnim, compare);
