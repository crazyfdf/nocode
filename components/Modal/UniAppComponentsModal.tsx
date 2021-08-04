import { Select, Modal, Form, Input, Button, Row, Col } from 'antd';
import { postComponentDocs } from '@/request/api';
import { useEffect, useState, useImperativeHandle, forwardRef } from 'react';

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
function UniAppComponentsModal(props, ref) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [filePath, setFilePath] = useState('');
  const [form] = Form.useForm();
  useImperativeHandle(ref, () => ({
    changeComponentsVal: newVal => {
      setIsModalVisible(newVal);
    },
  }));
  const selectFile = () => {
    const { remote } = window.require('electron');
    remote.dialog
      .showOpenDialog({
        defaultPath: '',
        buttonLabel: '选择目录',
        title: '选择项目文件夹',
        properties: ['openDirectory'],
      })
      .then(ret => {
        setFilePath(ret.filePaths[0]);
        form.setFieldsValue({ file: ret.filePaths[0] });
      });
  };

  const handleOk = async values => {
    values.file = `${values.file}/${values.name}`;
    await postComponentDocs({
      data: values,
    });
    if (window.require) {
      const { remote } = window.require('electron');

      let subWin = new remote.BrowserWindow({
        width: 1024,
        height: 768,
        minWidth: 1024,
        minHeight: 500,
        frame: false,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          enableRemoteModule: true,
        },
      });

      subWin.loadURL(`${process.env.baseURL}/no-code/components`);

      subWin.on('close', () => {
        subWin = null;
      });
    } else {
      window.open(`${process.env.baseURL}/no-code/components`);
    }
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
      title='创建uni-app应用'
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        {...formItemLayout}
        form={form}
        name='components'
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name='title'
          label='项目名称'
          tooltip='不能超过20个字符'
          rules={[
            { required: true, message: '请输入项目名称，不能超过20个字符', whitespace: true },
          ]}
        >
          <Input placeholder='请输入项目名称，不能超过20个字符' />
        </Form.Item>

        <Form.Item
          name='name'
          label='项目标识'
          tooltip='只能包含小写字母、数字、-或_'
          rules={[
            {
              required: true,
              message: '请输入项目标识，不能超过20个字符，只能包含小写字母、数字、-或_',
            },
          ]}
        >
          <Input placeholder='请输入项目标识，不能超过20个字符，只能包含小写字母、数字、-或_' />
        </Form.Item>
        <Form.Item name='description' label='项目描述'>
          <Input.TextArea placeholder='请输入应用描述' />
        </Form.Item>

        <Form.Item label='项目路径'>
          <Row gutter={8}>
            <Col span={15}>
              <Form.Item name='file' rules={[{ message: '项目路径不能为空', whitespace: true }]}>
                <Input value={filePath} placeholder='请选择项目文件夹' />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Button onClick={selectFile}>选择项目文件夹</Button>
            </Col>
          </Row>
        </Form.Item>

        {/* <Form.Item
            name='gender'
            label='Gender'
            rules={[{ required: true, message: 'Please select gender!' }]}
          >
            <Select placeholder='select your gender'>
              <Option value='male'>Male</Option>
              <Option value='female'>Female</Option>
              <Option value='other'>Other</Option>
            </Select>
          </Form.Item> */}

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

export default forwardRef(UniAppComponentsModal);
