import { Select, Modal, Form, Input, Button } from 'antd';
import { useState, useImperativeHandle, forwardRef } from 'react';
import FilePath from '@/components/FormComponents/FilePath';
import Icon from '@/components/Icon/Icon';

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
function UniAppModal(props, ref) {
  const { add, title, type } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [form] = Form.useForm();
  useImperativeHandle(ref, () => ({
    changeVal: newVal => {
      setIsModalVisible(newVal);
    },
  }));

  const handleOk = async values => {
    add(values);
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
      title={`添加${title}`}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form {...formItemLayout} form={form} name='app' onFinish={onFinish} scrollToFirstError>
        <Form.Item
          name='title'
          label={`${title}名称`}
          tooltip='不能超过20个字符'
          rules={[
            { required: true, message: `请输入${title}名称，不能超过20个字符`, whitespace: true },
          ]}
        >
          <Input placeholder={`请输入${title}名称，不能超过20个字符`} />
        </Form.Item>

        <Form.Item
          name='name'
          label={`${title}标识`}
          tooltip='只能包含小写字母、数字、-或_'
          rules={[
            {
              required: true,
              message: `请输入${title}标识，不能超过20个字符，只能包含小写字母、数字、-或_`,
            },
          ]}
        >
          <Input
            placeholder={`请输入${title}标识，不能超过20个字符，只能包含小写字母、数字、-或_`}
          />
        </Form.Item>
        <Form.Item name='description' label={`${title}描述`}>
          <Input.TextArea placeholder={`请输入${title}描述`} />
        </Form.Item>

        <Form.Item
          name='type'
          label={`${title}类型`}
          rules={[{ required: true, message: `请选择${title}类型!` }]}
        >
          <Select placeholder={`请选择${title}类型!`}>
            {type.map(item => (
              <Option value={item.value} key={item.value}>
                <div className='flex items-center'>
                  <Icon type={item.icon} className='mr-1' />
                  {item.title}
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>
        {title === '应用' && <FilePath form={form} title={title} />}
        <Form.Item {...tailFormItemLayout}>
          <Button className='mr-4' htmlType='reset' loading={isModalLoading} onClick={handleCancel}>
            取消
          </Button>
          <Button type='primary' htmlType='submit' loading={isModalLoading}>
            添加
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default forwardRef(UniAppModal);
