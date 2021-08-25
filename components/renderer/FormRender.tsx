import React, { memo, RefObject, useEffect } from 'react';
import { Form, Select, InputNumber, Input, Switch, Radio } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { formListAdapter } from '@/components/Renderer/FormRenderAdapter';
import FormItems from '@/components/FormComponents/FormItems';
import { uuid } from '@/utils/tool';
import Color from '@/components/FormComponents/Color';
// TODO:丰富组件类型
// import Upload from '../../components/FormComponents/Upload';
// import DataList from '../../components/FormComponents/DataList';
// import MutiText from '../../components/FormComponents/MutiText';
// import CardPicker from '../../components/FormComponents/CardPicker';
// import Table from '../../components/FormComponents/Table';
// import Pos from '../../components/FormComponents/Pos';
// import RichText from '../../components/FormComponents/XEditor';

const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

interface FormEditorProps {
  uid: string;
  onSave: Function;
  defaultValue?: { [id: string]: any };
  config: Array<any>;
  edit?: boolean;
  rightPanelRef: RefObject<{ changeVal }>;
}
function Adapter(config) {
  const data = {};
  config.forEach(item => {
    data[item.id] = item.value;
  });
  return data;
}

const FormEditor = (props: FormEditorProps) => {
  const {
    config = [],
    defaultValue = Adapter(config),
    onSave,
    uid,
    rightPanelRef,
    edit = false,
  } = props;
  const onFinish = (values: Store) => {
    onSave && onSave(values);
  };
  const [form] = Form.useForm();

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, [uid, form]);
  const handleChange = changedValues => {
    console.log('====================================');
    console.log(changedValues);
    console.log('====================================');
    onFinish(Object.assign(form.getFieldsValue(), changedValues));
  };

  return (
    <Form
      form={form}
      name='form_editor'
      layout='horizontal'
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={defaultValue}
      onValuesChange={handleChange}
    >
      {config.map(item => {
        return (
          <React.Fragment key={uuid(6, 10)}>
            {item.type === 'Number' && (
              <Form.Item tooltip={item.id} label={item.label} name={item.id}>
                <InputNumber max={item.range && item.range[1]} />
              </Form.Item>
            )}
            {item.type === 'Text' && (
              <Form.Item tooltip={item.id} label={item.label} name={item.id}>
                <Input />
              </Form.Item>
            )}
            {item.type === 'TextArea' && (
              <Form.Item tooltip={item.id} label={item.label} name={item.id}>
                <TextArea rows={4} />
              </Form.Item>
            )}

            {item.type === 'Select' && (
              <Form.Item tooltip={item.id} label={item.label} name={item.id}>
                <Select placeholder='请选择'>
                  {item.range.map((v: any) => {
                    return (
                      <Option value={v.key} key={uuid(6, 10)}>
                        {v.text}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            )}
            {item.type === 'Radio' && (
              <Form.Item tooltip={item.id} label={item.label} name={item.id}>
                <Radio.Group>
                  {item.range.map((v: any) => {
                    return (
                      <Radio value={v.key} key={uuid(6, 10)}>
                        {v.text}
                      </Radio>
                    );
                  })}
                </Radio.Group>
              </Form.Item>
            )}
            {item.type === 'Switch' && (
              <Form.Item
                tooltip={item.id}
                label={item.label}
                name={item.id}
                valuePropName='checked'
              >
                <Switch />
              </Form.Item>
            )}
            {item.type === 'FormItems' && (
              <div className='my-2'>
                <div className='text-base text-black font-bold my-2'>{item.label}</div>
                <FormItems edit={edit} formList={formListAdapter(item)} onChange={handleChange} />
              </div>
            )}
            {item.type === 'Color' && (
              <Form.Item tooltip={item.id} label={item.label} name={item.id}>
                <Color />
              </Form.Item>
            )}
            {item.type === 'Object' && item.children && (
              <div className='mt-2'>
                <div className='text-base text-black font-bold'>{item.label}</div>
                <FormItems edit={edit} formList={item.children} onChange={handleChange} />
              </div>
            )}
            {/* {item.type === 'MutiText' && (
              <Form.Item tooltip={item.id} label={item.label} name={item.id}>
                <MutiText />
              </Form.Item>
            )}
            {item.type === 'DataList' && (
              <Form.Item tooltip={item.id} label={item.label} name={item.id}>
                <DataList cropRate={item.cropRate} />
              </Form.Item>
            )}
            {item.type === 'Upload' && (
              <Form.Item tooltip={item.id}
                label={item.label}
                name={item.id}
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload cropRate={item.cropRate} isCrop={item.isCrop} />
              </Form.Item>
            )}
            {item.type === 'CardPicker' && (
              <Form.Item tooltip={item.id} label={item.label} name={item.id} valuePropName="type">
                <CardPicker icons={item.icons} type={defaultValue['type']} />
              </Form.Item>
            )}
            {item.type === 'Table' && (
              <Form.Item tooltip={item.id} label={item.label} name={item.id} valuePropName="data">
                <Table data={item.data} />
              </Form.Item>
            )}
            {item.type === 'Pos' && (
              <Form.Item tooltip={item.id} label={item.label} name={item.id}>
                <Pos />
              </Form.Item>
            )}
            {item.type === 'FormItems' && (
              <Form.Item tooltip={item.id} name={item.id} valuePropName="formList">
                <FormItems data={item.data} rightPanelRef={rightPanelRef} />
              </Form.Item>
            )}
            {item.type === 'RichText' && (
              <Form.Item tooltip={item.id} label={item.label} name={item.id} noStyle={true}>
                <RichText />
              </Form.Item>
            )}*/}
          </React.Fragment>
        );
      })}
    </Form>
  );
};
const compare = (preProps, nextProps) => {
  return preProps.uid === nextProps.uid;
};

export default memo(FormEditor, compare);
