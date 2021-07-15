// This example requires Tailwind CSS v2.0+
import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Select, Card } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { postComponentDocsApi } from '@/request/api';
import { uuid } from '@/utils/tool';

const IconFont = createFromIconfontCN({
  scriptUrl: [
    process.env.iconPath as string,

    //  icon-javascript, icon-java, icon-shoppingcart (overrided)
  ],
});
const { Option } = Select;
const { Meta } = Card;

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

const cardModule = [
  {
    id: 0,
    title: 'uni-app应用',
    description: '添加新项目',
    avatar: 'icon-yingyong1',
  },
  {
    id: 1,
    title: 'uni-app组件',
    description: '制作组件库',
    avatar: 'icon-yingyong2',
  },
  {
    id: 2,
    title: 'uni-app工具',
    description: '创造js工具库',
    avatar: 'icon-gongjuqu',
  },
];

export default function created() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [filePath, setFilePath] = useState('');
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };
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
    await postComponentDocsApi({
      values,
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

    setIsModalVisible(false);
    setIsModalLoading(false);
  };

  return (
    <div className='flex items-center justify-around bg-white overflow-hidden flex-auto'>
      {cardModule.map(item => (
        <Card
          key={uuid(6, 10)}
          style={{ width: 300 }}
          cover={<></>}
          actions={[
            <IconFont
              style={{ fontSize: '32px' }}
              type='icon-jurassic_add-gongcheng'
              onClick={showModal}
            />,
            <IconFont
              style={{ fontSize: '32px' }}
              type='icon-jurassic_import-gongcheng'
              onClick={showModal}
            />,
          ]}
        >
          <Meta
            avatar={<IconFont type={item.avatar} style={{ fontSize: '32px' }} />}
            title={item.title}
            description={item.description}
          />
        </Card>
      ))}

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
          name='register'
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
          <Form.Item name='describe' label='项目描述'>
            <Input.TextArea placeholder='请输入应用描述' />
          </Form.Item>

          <Form.Item
            name='file'
            label='项目路径'
            rules={[{ required: true, message: '项目路径不能为空', whitespace: true }]}
          >
            <Button onClick={selectFile}>选择项目文件夹</Button>
            <Input value={filePath} placeholder='请选择项目文件夹' />
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
            <Button
              className='mr-4'
              htmlType='reset'
              loading={isModalLoading}
              onClick={handleCancel}
            >
              取消
            </Button>
            <Button type='primary' htmlType='submit' loading={isModalLoading}>
              创建
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
