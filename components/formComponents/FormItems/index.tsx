import { baseFormUnion, TFormItemsDefaultType } from '@/types/types';
import { uuid } from '@/utils/tool';
import { PlusOutlined, MinusCircleFilled, EditFilled } from '@ant-design/icons';
import { Button, Form, Tooltip } from 'antd';
import React, { RefObject, useCallback, useEffect, useState, memo } from 'react';
import BasePopoverForm from '@/components/formComponents/FormItems/BasePopoverForm';
import EditorModal from '@/components/formComponents/FormItems/EditorModal';
import BaseForm from '@/components/formComponents/FormItems/BaseForm';
import { Store } from 'antd/lib/form/interface';

const formTpl: TFormItemsDefaultType = [
  {
    id: '',
    type: 'Text',
    label: 'string',
    placeholder: 'string属性默认值',
  },
  {
    id: '',
    type: 'Number',
    label: 'number',
    placeholder: 'number属性默认值',
  },
  {
    id: '',
    type: 'Switch',
    label: 'boolean',
    placeholder: 'boolean属性默认值',
  },
  {
    id: '',
    type: 'Radio',
    label: 'type',
    options: [
      { label: '选项一', value: '1' },
      { label: '选项二', value: '2' },
    ],
  },
  {
    id: '',
    type: 'Checkbox',
    label: 'array',
    options: [
      { label: '选项一', value: '1' },
      { label: '选项二', value: '2' },
      { label: '选项三', value: '3' },
    ],
  },
  {
    id: '',
    type: 'Date',
    label: 'date',
    placeholder: 'date属性默认值',
  },
];
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
interface FormItemsProps {
  formList?: TFormItemsDefaultType;
  onChange?: (v: any) => void;
  data: any;
  rightPanelRef: RefObject<HTMLDivElement>;
}
function EditableFormItems(props: FormItemsProps) {
  const { formList, data, onChange, rightPanelRef } = props;
  console.log('====================================');
  console.log(formList, data);
  console.log('====================================');
  const [formData, setFormData] = useState<TFormItemsDefaultType>(formList || []);
  const [visible, setVisible] = useState(false);
  const [curItem, setCurItem] = useState<baseFormUnion>();
  const [force, setForce] = useState<{ force: Function }>({
    force: () => {},
  });
  const handleAddItem = (item: baseFormUnion) => {
    // let tpl = formTpl.find(v => v.type === item.type);
    // let newData = [...formData, { ...tpl!, id: uuid(6, 10) }];
    // setFormData(newData);
    handleEditItem(item);
    // onChange && onChange(newData);
    // force.force();
  };

  const handleEditItem = (item: baseFormUnion) => {
    setVisible(true);
    setCurItem(item);
  };

  const handleDelItem = (item: baseFormUnion) => {
    let newData = formData.filter(v => v.id !== item.id);
    setFormData(newData);
    onChange && onChange(newData);
  };

  const handleSaveItem = (data: baseFormUnion) => {
    let add = true;
    let newData = formData.map(v => {
      if (v.id === data.id) {
        add = false;
        return data;
      } else {
        return v;
      }
    });
    if (add) {
      setFormData([...newData, data]);
      onChange && onChange([...newData, data]);
    } else {
      setFormData(newData);
      onChange && onChange(newData);
    }
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const callback = useCallback((v: Function) => {
    console.log(v);
    setForce({ force: v });
  }, []);
  useEffect(() => {
    let listener: (e: Event) => void;
    if (rightPanelRef.current) {
      listener = () => {
        force.force();
      };
      rightPanelRef.current.addEventListener('scroll', listener);
    }
    return () => {
      if (rightPanelRef.current) {
        rightPanelRef.current.removeEventListener('scroll', listener);
      }
    };
  }, [force, rightPanelRef]);
  const [form] = Form.useForm();
  const handlechange = () => {
    onFinish(form.getFieldsValue());
  };
  const onFinish = (values: Store) => {
    onChange && onChange(values);
  };
  return (
    <div>
      <Form
        form={form}
        name={data.id}
        layout='horizontal'
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={formData}
        onValuesChange={handlechange}
      >
        {formData.map((item: baseFormUnion) => {
          let FormItem = BaseForm[item.type];
          return (
            <div className='flex justify-between items-center mb-4' key={uuid(6, 10)}>
              <MinusCircleFilled onClick={() => handleDelItem(item)} />
              <FormItem {...item} />
              <EditFilled onClick={() => handleEditItem(item)} />
            </div>
          );
        })}
      </Form>
      <Tooltip
        placement='leftBottom'
        title={
          <>
            {formTpl.map(item => {
              let FormItem = BasePopoverForm[item.type];
              return (
                <div
                  key={uuid(6, 10)}
                  className='flex flex-col mb-1'
                  onClick={() => handleAddItem(item)}
                >
                  <FormItem {...item} />
                </div>
              );
            })}
          </>
        }
      >
        <Button style={{ width: '100%' }} block icon={<PlusOutlined />}>
          添加
        </Button>
      </Tooltip>
      <EditorModal
        item={curItem}
        onSave={handleSaveItem}
        onCancel={handleCancel}
        visible={visible}
      />
    </div>
  );
}
function compare(preProps, nextProps) {
  return true;
}
export default memo(EditableFormItems, compare);
