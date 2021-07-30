import { Select, Modal, Form, Input, Button } from 'antd';
import { postPage } from '@/request/api';
import { useState, useImperativeHandle, forwardRef } from 'react';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 2,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
function UniAppCreatedPagesModal(props, ref) {
  const { changeData, app } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [filePath, setFilePath] = useState('');
  const [form] = Form.useForm();
  useImperativeHandle(ref, () => ({
    changeVal: newVal => {
      setIsModalVisible(newVal);
    },
  }));

  const handleOk = async values => {
    // await postComponentDocs({
    //   data: values,
    // });
    const data = await postPage({ page: values, app });
    changeData(data);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = async (values: any) => {
    setIsModalLoading(true);
    console.log('Received values of form: ', values);

    await handleOk(values);
    form.resetFields();

    setIsModalVisible(false);
    setIsModalLoading(false);
  };
  return (
    <Modal
      title='创建页面'
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form {...formItemLayout} form={form} name='app' onFinish={onFinish} scrollToFirstError>
        <Form.Item
          name='title'
          label='页面名称'
          tooltip='不能超过20个字符'
          rules={[
            { required: true, message: '请输入页面名称，不能超过20个字符', whitespace: true },
          ]}
        >
          <Input placeholder='请输入页面名称，不能超过20个字符' />
        </Form.Item>

        <Form.Item
          name='name'
          label='页面标识'
          tooltip='只能包含小写字母、数字、-或_'
          rules={[
            {
              required: true,
              message: '请输入页面标识，不能超过20个字符，只能包含小写字母、数字、-或_',
            },
          ]}
        >
          <Input placeholder='请输入页面标识，不能超过20个字符，只能包含小写字母、数字、-或_' />
        </Form.Item>
        <Form.Item name='description' label='页面描述'>
          <Input.TextArea placeholder='请输入页面描述' />
        </Form.Item>

        <Form.Item
          name='type'
          label='页面类型'
          rules={[{ required: true, message: '请选择页面类型!' }]}
        >
          <Select placeholder='select your gender'>
            <Option value='list'>列表</Option>
            <Option value='form'>表单</Option>
            <Option value='details'>详情</Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button className='mr-4' htmlType='reset' loading={isModalLoading} onClick={handleCancel}>
            取消
          </Button>
          <Button type='primary' htmlType='submit' loading={isModalLoading}>
            创建
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default forwardRef(UniAppCreatedPagesModal);
