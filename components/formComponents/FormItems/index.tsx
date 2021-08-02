import { baseFormUnion, TFormItemsDefaultType } from '@/types/types';
import { uuid } from '@/utils/tool';
import { MinusCircleFilled, EditFilled } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React, { RefObject, useState, memo, useRef } from 'react';
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
    type: 'Color',
    label: 'color',
    placeholder: 'color',
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
    value: false,
  },
  {
    id: '',
    type: 'Radio',
    label: 'type',
    options: [], // {label:"",value:""}
    value: '',
  },
  {
    id: '',
    type: 'Checkbox',
    label: 'array',
    options: [], // {label:"",value:""}
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
  edit?: Boolean;
  rightPanelRef: RefObject<{ changeVal }>;
}
function EditableFormItems(props: FormItemsProps) {
  const { formList: list, data: formData, onChange, rightPanelRef, edit = false } = props;
  const [formList, setFormList] = useState<TFormItemsDefaultType>(list || []);
  const [curItem, setCurItem] = useState<baseFormUnion>();
  const ref = useRef({
    changeVal: v => {},
  });

  const handleAddItem = (item: baseFormUnion) => {
    setCurItem(item);
    handleEditItem(item);
  };

  const handleEditItem = (item: baseFormUnion) => {
    ref.current.changeVal(true);
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
  };

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
          <div key={uuid(6, 10)}>
            <label className='font-medium'>{item.label}</label>
            <div className='flex justify-between items-center mb-4'>
              {edit && <MinusCircleFilled onClick={() => handleDelItem(item)} />}
              <div className='flex mx-4 flex-1 items-center'>
                {item.id}：
                <FormItem
                  {...item}
                  onChange={(id, e) => handleChange({ ...item, value: e.target.value })}
                />
              </div>
              {edit && <EditFilled onClick={() => handleEditItem(item)} />}
            </div>
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
        {edit && <Button style={{ width: '100%' }}>添加</Button>}
      </Tooltip>
      <EditorModal item={curItem} onSave={handleSaveItem} ref={ref} />
    </div>
  );
}

export default EditableFormItems;
