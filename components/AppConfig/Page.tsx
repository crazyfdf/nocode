import FormItems from '@/components/FormComponents/FormItems/FormItems';
import { Collapse } from 'antd';
import Icon from '@/components/Icon/Icon';

const { Panel } = Collapse;

export default function Page(props) {
  const { uni, configRemove, unis, configSave } = props;
  let components: any[] = [];
  unis.component?.forEach(item => {
    components = components.concat(item.componentId);
  });

  return (
    <Collapse accordion>
      {Object.entries(uni.page.pageComponents).map(([key, value]) => (
        <Panel
          header={key}
          key={key}
          extra={
            <Icon
              type='icon-guanbi'
              onClick={e => {
                e.stopPropagation();
                configRemove({ [key]: value });
              }}
            />
          }
        >
          <FormItems
            formList={components.find(v => v.name === key.replace(/\d+/gi, ''))?.config}
            defaultData={value}
            onChange={data => configSave(data, key)}
          />
        </Panel>
      ))}
    </Collapse>
  );
}
