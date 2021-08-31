import FormItems from '@/components/FormComponents/FormItems/FormItems';
import { Collapse } from 'antd';
import Icon from '@/components/Icon/Icon';

const { Panel } = Collapse;

export default function Page(props) {
  const { uni, configRemove, unis, configSave } = props;
  return (
    <Collapse accordion>
      {Object.entries(uni.page.pageComponentsId.config).map(([key, value]) => (
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
            formList={unis.component.find(item => item.name === key.replace(/\d+/gi, ''))?.config}
            defaultData={value}
            onChange={data => configSave(data, key)}
          />
        </Panel>
      ))}
    </Collapse>
  );
}
