import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Form, Select, Input, Modal, Button, InputNumber } from 'antd';
import { baseFormOptionsType } from '@/types/types';
import { useStateValue, uuid } from '@/utils/tool';
import Color from '@/components/FormComponents/Color/Color';
import { formTpl } from '@/components/FormComponents/FormItems/formTpl';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const EditorModal = (props, ref) => {
  const { item: data, onSave } = props;
  const [item, setItem] = useStateValue(data);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const onChange = type => {
    item.type = type;
    setItem({ ...item });
  };

  useImperativeHandle(ref, () => ({
    changeVal: newVal => {
      setVisible(newVal);
    },
  }));
  const onFinish = (values: any) => {
    onSave && onSave(values);
  };
  const onCancel = () => {
    setVisible(false);
  };
  const handleOk = () => {
    form.validateFields().then(values => {
      onSave && onSave(values);
      setVisible(false);
    });
  };
  useEffect(() => {
    // 关联form前不能使用form下的方法，需要等到组件挂载完成
    item && form.resetFields();
  }, [visible, item]);

  return (
    <>
      {item && (
        <Modal
          title='设置props属性'
          footer={
            <Button type='primary' onClick={handleOk}>
              确定
            </Button>
          }
          forceRender
          visible={visible}
          onOk={handleOk}
          closable={true}
          onCancel={onCancel}
        >
          <Form
            form={form}
            name='formItem_editor_modal'
            {...formItemLayout}
            onFinish={onFinish}
            initialValues={item}
          >
            <Form.Item
              label='字段名'
              name='id'
              tooltip='name'
              rules={[{ required: true, message: '请输入props内的字段名!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label='类型' name='type'>
              <Select onChange={onChange}>
                {formTpl.map(item1 => (
                  <Option key={item1.type} value={item1.type}>
                    {item1.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            {item.label && (
              <Form.Item label='字段名说明' name='label' tooltip='label'>
                <Input />
              </Form.Item>
            )}
            {['Text', 'Textarea'].includes(item.type) && (
              <Form.Item label='字段默认值' name='value' tooltip='value'>
                <Input />
              </Form.Item>
            )}
            {item.type === 'Color' && (
              <Form.Item
                label='颜色默认值'
                name='value'
                tooltip='value'
                rules={[{ required: true, message: '请选择颜色默认值!' }]}
              >
                <Color />
              </Form.Item>
            )}

            {item.type === 'Number' && (
              <Form.Item
                label='数字默认值'
                name='value'
                tooltip='value'
                rules={[{ required: true, message: '请输入字段默认值!' }]}
              >
                <InputNumber />
              </Form.Item>
            )}

            {item.type === 'CodeData' && (
              <Form.Item
                label='数据源'
                name='value'
                tooltip='value'
                rules={[{ required: true, message: '请输入字段默认值!' }]}
              >
                <Input.TextArea />
              </Form.Item>
            )}
            {item.placeholder && (
              <Form.Item label='提示文本' name='placeholder' tooltip='placeholder'>
                <Input placeholder='请输入提示文本' />
              </Form.Item>
            )}
            {item.options && (
              <Form.Item
                label='选项源'
                name='options'
                rules={[{ required: true, message: '选项不能为空!' }]}
              >
                <Select
                  placeholder='请输入'
                  mode='tags'
                  labelInValue
                  maxTagCount={39}
                  maxTagTextLength={16}
                >
                  {item.options.map((v: baseFormOptionsType) => (
                    <Option value={v.value} key={uuid(6, 10)}>
                      {v.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          </Form>
        </Modal>
      )}
    </>
  );
};

export default forwardRef(EditorModal);
