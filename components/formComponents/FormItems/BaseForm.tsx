import {
  baseFormDateTpl,
  baseFormRadioTpl,
  baseFormCheckboxTpl,
  baseFormSelectTpl,
  baseFormNumberTpl,
  baseFormTextAreaTpl,
  baseFormTextTpl,
  baseFormSwitchTpl,
  baseFormUnionType,
  baseFormColorTpl,
  baseFormCodeDataTpl,
} from '@/types/types';
import { uuid } from '@/utils/tool';
import { DatePicker, Input, Select } from 'antd';
import Switch from '@/components/FormComponents/Switch';
import Color from '@/components/FormComponents/Color';
import Checkbox from '@/components/FormComponents/Checkbox/Checkbox';
import Radio from '@/components/FormComponents/Radio/Radio';
import Ide from '@/components/Ide/Ide';
// 维护表单控件， 提高form渲染性能

type TBaseForm = {
  [key in baseFormUnionType]: any;
};

const BaseForm: TBaseForm = {
  Text: (props: baseFormTextTpl & { onChange }) => {
    const { id, placeholder = '', value, onChange } = props;
    return (
      <Input placeholder={placeholder} onChange={() => onChange(id, event)} defaultValue={value} />
    );
  },
  Color: (props: baseFormColorTpl & { onChange }) => {
    const { id, placeholder = '', value, onChange } = props;
    return <Color onChange={value => onChange(id, { target: { value } })} value={value} />;
  },
  Textarea: (props: baseFormTextAreaTpl & { onChange }) => {
    const { id, placeholder = '', value, onChange } = props;
    return (
      <Input.TextArea
        placeholder={placeholder}
        onChange={() => onChange(id, event)}
        defaultValue={value}
      />
    );
  },
  Number: (props: baseFormNumberTpl & { onChange }) => {
    const { id, placeholder = '', value, onChange } = props;
    return (
      <Input
        type='number'
        placeholder={placeholder}
        onChange={() => onChange(id, event)}
        defaultValue={value}
      />
    );
  },
  Switch: (props: baseFormSwitchTpl & { onChange }) => {
    const { id, onChange, value } = props;
    return <Switch id={id} value={value} onChange={value => onChange(id, { target: { value } })} />;
  },
  Radio: (props: baseFormRadioTpl & { onChange }) => {
    const { id, options, value, onChange } = props;
    return (
      <Radio
        options={options}
        value={value}
        onChange={value => onChange(id, { target: { value } })}
      />
    );
  },
  Checkbox: (props: baseFormCheckboxTpl & { onChange }) => {
    const { id, options, value, onChange } = props;
    return (
      <Checkbox
        options={options}
        value={value}
        onChange={value => onChange(id, { target: { value } })}
      />
    );
  },
  Date: (props: baseFormDateTpl & { onChange }) => {
    const { value, id, placeholder = '', onChange } = props;
    return (
      <DatePicker placeholder={placeholder} onChange={() => onChange(id, event)} value={value} />
    );
  },
  Select: (props: baseFormSelectTpl & { onChange }) => {
    const { id, options, onChange } = props;
    return (
      <Select placeholder='请选择' onChange={() => onChange(id, event)}>
        {options.map((v: any) => {
          return (
            <Select.Option value={v.key} key={uuid(6, 10)}>
              {v.text}
            </Select.Option>
          );
        })}
      </Select>
    );
  },
  CodeData: (props: baseFormCodeDataTpl & { onChange }) => {
    let { id, placeholder = '', value, onChange } = props;
    return <Ide defaultValue={value} onChange={value => onChange(id, { target: { value } })} />;
  },
};

export default BaseForm;
