import React, { memo, RefObject, useEffect } from 'react';
import { Form, Select, InputNumber, Input, Switch, Radio } from 'antd';
import { Store } from 'antd/lib/form/interface';
import Adapter from '@/components/renderer/FormRenderAdapter';
import FormItems from '@/components/formComponents/FormItems';
// import Upload from '../../components/FormComponents/Upload';
// import DataList from '../../components/FormComponents/DataList';
// import MutiText from '../../components/FormComponents/MutiText';
// import Color from '../../components/FormComponents/Color';
// import CardPicker from '../../components/FormComponents/CardPicker';
// import Table from '../../components/FormComponents/Table';
// import Pos from '../../components/FormComponents/Pos';
// import RichText from '../../components/FormComponents/XEditor';
// import FormItems from '../../components/FormComponents/FormItems';
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
  defaultValue: { [key: string]: any };
  config: Array<any>;
  rightPannelRef: RefObject<HTMLDivElement>;
}

const FormEditor = (props: FormEditorProps) => {
  let { config, defaultValue, onSave, uid, rightPannelRef } = props;
  config = Adapter(config);
  const onFinish = (values: Store) => {
    onSave && onSave(values);
  };

  const [form] = Form.useForm();

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, [uid, form]);

  const handlechange = () => {
    onFinish(form.getFieldsValue());
  };

  return (
    <Form
      form={form}
      name='form_editor'
      layout='vertical'
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={defaultValue}
      onValuesChange={handlechange}
    >
      {config.map(item => {
        return (
          <React.Fragment key={item.name}>
            {item.type === 'Number' && (
              <Form.Item tooltip={item.key} label={item.name} name={item.key}>
                <InputNumber max={item.range && item.range[1]} />
              </Form.Item>
            )}
            {item.type === 'Text' && (
              <Form.Item tooltip={item.key} label={item.name} name={item.key}>
                <Input />
              </Form.Item>
            )}
            {item.type === 'TextArea' && (
              <Form.Item tooltip={item.key} label={item.name} name={item.key}>
                <TextArea rows={4} />
              </Form.Item>
            )}

            {item.type === 'Select' && (
              <Form.Item tooltip={item.key} label={item.name} name={item.key}>
                <Select placeholder='请选择'>
                  {item.range.map((v: any) => {
                    return (
                      <Option value={v.key} key={v.key}>
                        {v.text}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            )}
            {item.type === 'Radio' && (
              <Form.Item tooltip={item.key} label={item.name} name={item.key}>
                <Radio.Group>
                  {item.range.map((v: any) => {
                    return (
                      <Radio value={v.key} key={v.key}>
                        {v.text}
                      </Radio>
                    );
                  })}
                </Radio.Group>
              </Form.Item>
            )}
            {item.type === 'Switch' && (
              <Form.Item
                tooltip={item.key}
                label={item.name}
                name={item.key}
                valuePropName='checked'
              >
                <Switch />
              </Form.Item>
            )}
            {item.type === 'Object' && (
              <Form.Item
                tooltip={item.key}
                label={item.name}
                name={item.key}
                valuePropName='formList'
              >
                <FormItems data={item.data} rightPannelRef={rightPannelRef} />
              </Form.Item>
            )}
            {/* {item.type === 'MutiText' && (
              <Form.Item tooltip={item.key} label={item.name} name={item.key}>
                <MutiText />
              </Form.Item>
            )}
            {item.type === 'DataList' && (
              <Form.Item tooltip={item.key} label={item.name} name={item.key}>
                <DataList cropRate={item.cropRate} />
              </Form.Item>
            )}
            {item.type === 'Color' && (
              <Form.Item tooltip={item.key} label={item.name} name={item.key}>
                <Color />
              </Form.Item>
            )}
            {item.type === 'Upload' && (
              <Form.Item tooltip={item.key}
                label={item.name}
                name={item.key}
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload cropRate={item.cropRate} isCrop={item.isCrop} />
              </Form.Item>
            )}
            {item.type === 'CardPicker' && (
              <Form.Item tooltip={item.key} label={item.name} name={item.key} valuePropName="type">
                <CardPicker icons={item.icons} type={defaultValue['type']} />
              </Form.Item>
            )}
            {item.type === 'Table' && (
              <Form.Item tooltip={item.key} label={item.name} name={item.key} valuePropName="data">
                <Table data={item.data} />
              </Form.Item>
            )}
            {item.type === 'Pos' && (
              <Form.Item tooltip={item.key} label={item.name} name={item.key}>
                <Pos />
              </Form.Item>
            )}
            {item.type === 'FormItems' && (
              <Form.Item tooltip={item.key} name={item.key} valuePropName="formList">
                <FormItems data={item.data} rightPannelRef={rightPannelRef} />
              </Form.Item>
            )}
            {item.type === 'RichText' && (
              <Form.Item tooltip={item.key} label={item.name} name={item.key} noStyle={true}>
                <RichText />
              </Form.Item>
            )}*/}
          </React.Fragment>
        );
      })}
    </Form>
  );
};

export default memo(FormEditor);
