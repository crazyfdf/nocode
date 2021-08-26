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
import Switch from '@/components/FormComponents/Switch/Switch';
import Color from '@/components/FormComponents/Color/Color';
import Checkbox from '@/components/FormComponents/Checkbox/Checkbox';
import Radio from '@/components/FormComponents/Radio/Radio';
import Ide from '@/components/Ide/Ide';
// 维护表单控件， 提高form渲染性能

type TBaseForm = {
  [key in baseFormUnionType]: any;
};

const BaseForm: TBaseForm = {
  Text: (props: baseFormTextTpl & { onChange }) => {
    const { placeholder = '', value, onChange } = props;
    return (
      <Input
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        defaultValue={value}
      />
    );
  },
  Color: (props: baseFormColorTpl & { onChange }) => {
    const { placeholder = '', value, onChange } = props;
    return <Color onChange={value => onChange(value)} value={value} />;
  },
  Textarea: (props: baseFormTextAreaTpl & { onChange }) => {
    const { placeholder = '', value, onChange } = props;
    return (
      <Input.TextArea
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        defaultValue={value}
      />
    );
  },
  Number: (props: baseFormNumberTpl & { onChange }) => {
    const { placeholder = '', value, onChange } = props;
    return (
      <Input
        type='number'
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        defaultValue={value}
      />
    );
  },
  Switch: (props: baseFormSwitchTpl & { onChange }) => {
    const { onChange, value } = props;
    return <Switch value={value} onChange={value => onChange(value)} />;
  },
  Radio: (props: baseFormRadioTpl & { onChange }) => {
    const { options, value, onChange } = props;
    return <Radio options={options} value={value} onChange={value => onChange(value)} />;
  },
  Checkbox: (props: baseFormCheckboxTpl & { onChange }) => {
    const { options, value, onChange } = props;
    return <Checkbox options={options} value={value} onChange={value => onChange(value)} />;
  },
  Date: (props: baseFormDateTpl & { onChange }) => {
    const { value, placeholder = '', onChange } = props;
    return (
      <DatePicker
        placeholder={placeholder}
        onChange={(data, string) => onChange(string)}
        value={value}
      />
    );
  },
  Select: (props: baseFormSelectTpl & { onChange }) => {
    const { options, onChange } = props;
    return (
      <Select placeholder='请选择' onChange={value => onChange(value)}>
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
    let { value, onChange } = props;
    return <Ide defaultValue={value} onChange={value => onChange(value)} />;
  },
};

export default BaseForm;
