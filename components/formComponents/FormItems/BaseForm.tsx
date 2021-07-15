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
// 维护表单控件， 提高form渲染性能

type TBaseForm = {
  [key in baseFormUnionType]: any;
};

const BaseForm: TBaseForm = {
  Text: (props: baseFormTextTpl & { onChange }) => {
    const { id, placeholder, onChange } = props;
    return (
      <Form.Item
        className='flex-1'
        style={{ margin: 0 }}
        tooltip={id}
        label={placeholder}
        name={id}
      >
        <Input />
      </Form.Item>
    );
  },
  Textarea: (props: baseFormTextAreaTpl & { onChange }) => {
    const { id, placeholder, onChange } = props;
    return (
      <Form.Item
        className='flex-1'
        style={{ margin: 0 }}
        tooltip={id}
        label={placeholder}
        name={id}
      >
        <Input.TextArea />
      </Form.Item>
    );
  },
  Number: (props: baseFormNumberTpl & { onChange }) => {
    const { id, placeholder, onChange } = props;
    return (
      <Form.Item
        className='flex-1'
        style={{ margin: 0 }}
        tooltip={id}
        label={placeholder}
        name={id}
      >
        <Input type='number' />
      </Form.Item>
    );
  },
  Switch: (props: baseFormSwitchTpl & { onChange }) => {
    const { id, placeholder, onChange } = props;
    return (
      <Form.Item
        className='flex-1'
        style={{ margin: 0 }}
        tooltip={id}
        label={placeholder}
        name={id}
      >
        <Switch />
      </Form.Item>
    );
  },
  Radio: (props: baseFormRadioTpl & { onChange }) => {
    const { id, options, onChange } = props;
    return (
      <Form.Item className='flex-1' style={{ margin: 0 }} tooltip={id} label={id} name={id}>
        <Radio.Group>
          {options.map((v: any) => (
            <Radio value={v.value} key={uuid(6, 10)}>
              {v.label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    );
  },
  Checkbox: (props: baseFormCheckboxTpl & { onChange }) => {
    const { label, options, id, onChange } = props;
    return (
      <Form.Item className='flex-1' style={{ margin: 0 }} tooltip={id} label={label} name={id}>
        <Checkbox.Group options={options} />
      </Form.Item>
    );
  },
  Date: (props: baseFormDateTpl & { onChange }) => {
    const { label, id, onChange } = props;
    return (
      <Form.Item className='flex-1' style={{ margin: 0 }} tooltip={id} label={label} name={id}>
        <DatePicker />
      </Form.Item>
    );
  },
  Select: (props: baseFormSelectTpl & { onChange }) => {
    const { label, id, options, onChange } = props;
    return (
      <Form.Item className='flex-1' style={{ margin: 0 }} tooltip={id} label={label} name={id}>
        <Select placeholder='请选择'>
          {options.map((v: any) => {
            return (
              <Select.Option value={v.key} key={uuid(6, 10)}>
                {v.text}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
    );
  },
};

export default BaseForm;
