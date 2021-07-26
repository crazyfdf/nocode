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
} from '@/types/types';
import { uuid } from '@/utils/tool';
import { Checkbox, DatePicker, Form, Input, Radio, Select, Switch } from 'antd';
import { memo } from 'react';
// 维护表单控件， 提高form渲染性能

type TBaseForm = {
  [key in baseFormUnionType]: any;
};
const compare = (preProps, nextProps) => {
  return true;
};

const BaseForm: TBaseForm = {
  Text: memo((props: baseFormTextTpl & { onChange }) => {
    const { id, placeholder, onChange } = props;
    return <Input placeholder={placeholder} onChange={() => onChange(id, event)} />;
  }, compare),
  Textarea: (props: baseFormTextAreaTpl & { onChange }) => {
    const { id, placeholder, onChange } = props;
    return <Input.TextArea placeholder={placeholder} onChange={() => onChange(id, event)} />;
  },
  Number: (props: baseFormNumberTpl & { onChange }) => {
    const { id, placeholder, onChange } = props;
    return <Input type='number' placeholder={placeholder} onChange={() => onChange(id, event)} />;
  },
  Switch: (props: baseFormSwitchTpl & { onChange }) => {
    const { id, onChange } = props;
    return <Switch onChange={() => onChange(id, event)} />;
  },
  Radio: (props: baseFormRadioTpl & { onChange }) => {
    const { id, options, onChange } = props;
    return (
      <Radio.Group onChange={() => onChange(id, event)}>
        {options.map((v: any) => (
          <Radio value={v.value} key={uuid(6, 10)}>
            {v.label}
          </Radio>
        ))}
      </Radio.Group>
    );
  },
  Checkbox: (props: baseFormCheckboxTpl & { onChange }) => {
    const { label, options, id, onChange } = props;
    return <Checkbox.Group options={options} onChange={() => onChange(id, event)} />;
  },
  Date: (props: baseFormDateTpl & { onChange }) => {
    const { label, id, placeholder, onChange } = props;
    return <DatePicker placeholder={placeholder} onChange={() => onChange(id, event)} />;
  },
  Select: (props: baseFormSelectTpl & { onChange }) => {
    const { label, id, options, onChange } = props;
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
};

export default BaseForm;
