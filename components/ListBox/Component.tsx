import ListBox from '@/components/ListBox/ListBox';
import { Collapse } from 'antd';
import Icon from '@/components/Icon/Icon';

const { Panel } = Collapse;

export default function Page(props) {
  const { unis, uni, configRemove, remove, config, changeCurrent, collection } = props;
  return (
    <Collapse accordion>
      {unis.component?.map(item => (
        <Panel
          header={item.title}
          key={item._id}
          extra={
            <Icon
              type='icon-guanbi'
              onClick={e => {
                e.stopPropagation();
                configRemove(item);
              }}
            />
          }
        >
          <ListBox
            dataSource={item.componentId}
            collection={collection}
            changeCurrent={changeCurrent}
            defaultItem={uni[config.id]}
            config={config}
            remove={remove}
          />
        </Panel>
      ))}
    </Collapse>
  );
}
