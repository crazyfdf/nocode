import { baseFormUnion, TFormItemsDefaultType } from '@/types/types';
import { uuid } from '@/utils/tool';
import { PlusOutlined, MinusCircleFilled, EditFilled } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React, { RefObject, useCallback, useEffect, useState, memo } from 'react';
import BasePopoverForm from '@/components/FormComponents/FormItems/BasePopoverForm';
import EditorModal from '@/components/FormComponents/FormItems/EditorModal';
import BaseForm from '@/components/FormComponents/FormItems/BaseForm';

const formTpl: TFormItemsDefaultType = [
  {
    id: '',
    type: 'Text',
    label: 'string',
    placeholder: 'string属性默认值',
    value: '',
  },
  {
    id: '',
    type: 'Number',
    label: 'number',
    placeholder: 'number属性默认值',
    value: '',
  },
  {
    id: '',
    type: 'Switch',
    label: 'boolean',
    value: '',
  },
  {
    id: '',
    type: 'Radio',
    label: 'type',
    options: [
      { label: '选项一', value: '1' },
      { label: '选项二', value: '2' },
    ],
    value: '',
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
    value: '',
  },
  {
    id: '',
    type: 'Date',
    label: 'date',
    placeholder: 'date属性默认值',
    value: '',
  },
];
interface FormItemsProps {
  formList?: TFormItemsDefaultType;
  onChange?: any;
  data: any;
  rightPanelRef: RefObject<{ changeVal }>;
}
function EditableFormItems(props: FormItemsProps) {
  const { formList: list, data: formData, onChange, rightPanelRef } = props;
  console.log('====================================');
  console.log(list, formData);
  console.log('====================================');
  const [formList, setFormList] = useState<TFormItemsDefaultType>(list || []);
  const [visible, setVisible] = useState(false);
  const [curItem, setCurItem] = useState<baseFormUnion>();
  const [force, setForce] = useState<{ force: Function }>({
    force: () => {},
  });
  const handleAddItem = (item: baseFormUnion) => {
    handleEditItem(item);
  };

  const handleEditItem = (item: baseFormUnion) => {
    setVisible(true);
    setCurItem(item);
  };

  const handleDelItem = (item: baseFormUnion) => {
    let newData = formList.filter(v => v.id !== item.id);
    setFormList(newData);
    onChange({
      [formData.id]: formList.map(item => ({ [item.id]: item.value })),
    });
  };

  const handleSaveItem = (data: baseFormUnion) => {
    let add = true;
    let newData = formList.map(v => {
      if (v.id === data.id) {
        add = false;
        return data;
      } else {
        return v;
      }
    });
    if (add) {
      setFormList([...newData, data]);
      onChange({
        [formData.id]: [
          ...formList.map(item => ({ [item.id]: item.value })),
          { [data.id]: data.value },
        ],
      });
    } else {
      setFormList(newData);
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
  // useEffect(() => {
  //   let listener: (e: Event) => void;
  //   console.log('====================================');
  //   console.log(rightPanelRef);
  //   console.log('====================================');
  //   if (rightPanelRef.current) {
  //     listener = () => {
  //       force.force();
  //     };
  //     rightPanelRef.current.addEventListener('scroll', listener);
  //   }
  //   return () => {
  //     if (rightPanelRef.current) {
  //       rightPanelRef.current.removeEventListener('scroll', listener);
  //     }
  //   };
  // }, [force, rightPanelRef]);
  // const [form] = Form.useForm();
  const handleChange = data => {
    formList.forEach((item, index) => {
      if (item.id === data.id) {
        formList[index].value = data.value;
      }
    });

    onChange &&
      onChange({
        [formData.id]: formList.map(item => ({ [item.id]: item.value })),
      });
  };

  return (
    <div>
      {formList.map((item: baseFormUnion) => {
        let FormItem = BaseForm[item.type];
        return (
          <div className='flex justify-between items-center mb-4' key={uuid(6, 10)}>
            <MinusCircleFilled onClick={() => handleDelItem(item)} />
            <div className='flex mx-1 flex-1 items-center'>
              {item.id}：
              <FormItem
                {...item}
                onChange={(id, e) => handleChange({ ...item, value: e.target.value })}
              />
            </div>
            <EditFilled onClick={() => handleEditItem(item)} />
          </div>
        );
      })}
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
                  <FormItem {...item} onChange={onChange} />
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
