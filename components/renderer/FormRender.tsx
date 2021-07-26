import React, { memo, RefObject, useEffect, useImperativeHandle, useState } from 'react';
import { Form, Select, InputNumber, Input, Switch, Radio } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { formListAdapter } from '@/components/Renderer/FormRenderAdapter';
import FormItems from '@/components/FormComponents/FormItems';
import { uuid } from '@/utils/tool';
// TODO:丰富组件类型
// import Upload from '../../components/FormComponents/Upload';
// import DataList from '../../components/FormComponents/DataList';
// import MutiText from '../../components/FormComponents/MutiText';
// import Color from '../../components/FormComponents/Color';
// import CardPicker from '../../components/FormComponents/CardPicker';
// import Table from '../../components/FormComponents/Table';
// import Pos from '../../components/FormComponents/Pos';
// import RichText from '../../components/FormComponents/XEditor';
const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    // 待修改
    return e;
  }
  return e && e.fileList;
};

const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

interface FormEditorProps {
  uid: string;
  onSave: Function;
  onDel: Function;
  defaultValue: { [id: string]: any };
  config: Array<any>;
  rightPanelRef: RefObject<{ changeVal }>;
}

const FormEditor = (props: FormEditorProps) => {
  const { config, defaultValue, onSave, uid, rightPanelRef } = props;
  const [fromDefaultValue, setFromDefaultValue] = useState(defaultValue);
  const onFinish = (values: Store) => {
    onSave && onSave(values);
  };
  useImperativeHandle(rightPanelRef, () => ({
    changeVal: newVal => {
      setFromDefaultValue(newVal);
    },
  }));
  const [form] = Form.useForm();

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, [uid, form]);

  const handlechange = changedValues => {
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
      initialValues={fromDefaultValue}
      onValuesChange={handlechange}
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
              <>
                <div>
                  {item.id}：{item.label}
                </div>
                <FormItems
                  formList={formListAdapter(item)}
                  data={item}
                  rightPanelRef={rightPanelRef}
                  onChange={handlechange}
                />
              </>
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
            {item.type === 'Color' && (
              <Form.Item tooltip={item.id} label={item.label} name={item.id}>
                <Color />
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
