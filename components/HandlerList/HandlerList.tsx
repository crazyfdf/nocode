import { Button } from 'antd';
import Icon from '@/components/Icon/Icon';

interface NavigationInterface {
  title: string;
  icon: string;
  handler: any;
}
interface PropsInterFace {
  navigation: NavigationInterface[];
}
export default function HandlerList(props: PropsInterFace) {
  const { navigation } = props;
  return (
    <div className='flex items-center my-4'>
      {navigation.map(item => (
        <Button
          shape='round'
          icon={<Icon style={{ fontSize: '16px' }} type={item.icon} />}
          key={item.title}
          className='mx-2'
          onClick={typeof item.handler === 'function' ? item.handler : () => {}}
        >
          {item.title}
        </Button>
      ))}
    </div>
  );
}
