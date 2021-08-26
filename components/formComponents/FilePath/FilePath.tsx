import { Form, Input, Button, Row, Col } from 'antd';
import { useState } from 'react';

export default function index(props) {
  const { form, title } = props;
  const [filePath, setFilePath] = useState('');

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
  return (
    <Form.Item label={`${title}路径`}>
      <Row gutter={8}>
        <Col span={15}>
          <Form.Item name='file' rules={[{ message: `${title}路径不能为空`, whitespace: true }]}>
            <Input value={filePath} placeholder={`请选择${title}文件夹`} />
          </Form.Item>
        </Col>
        <Col span={9}>
          <Button onClick={selectFile}>选择{title}文件夹</Button>
        </Col>
      </Row>
    </Form.Item>
  );
}
