import QueueAnim from 'rc-queue-anim';
import { useEffect, useState } from 'react';

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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  });
  // FIXME: -- 渲染待优化
  return (
    <>
      {loading ? null : (
        <QueueAnim type={['left', 'right']} animConfig={enterAnim}>
          {children}
        </QueueAnim>
      )}
    </>
  );
}

export default ListQueueAnim;
