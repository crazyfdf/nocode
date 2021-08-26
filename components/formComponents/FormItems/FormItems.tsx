import { baseFormUnion, TFormItemsDefaultType } from '@/types/types';
import { uuid } from '@/utils/tool';
import { MinusCircleFilled, EditFilled } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useState, useRef, useEffect } from 'react';
import EditorModal from '@/components/FormComponents/FormItems/EditorModal';
import BaseForm from '@/components/FormComponents/FormItems/BaseForm';
import { formTpl } from '@/components/FormComponents/FormItems/formTpl';

interface FormItemsProps {
  formList?: TFormItemsDefaultType;
  onChange?: any;
  onDelete?: any;
  defaultData?: any;
  edit?: Boolean;
}
function EditableFormItems(props: FormItemsProps) {
  const { formList: list, defaultData, onChange, onDelete, edit = false } = props;
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
    onDelete && onDelete(item);
  };
  useEffect(() => {
    if (defaultData) {
      setFormList(formList.map(item => ({ ...item, value: defaultData[item.id] })));
    } else {
      setFormList(list || []);
    }
  }, [list]);

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
    } else {
      setFormList(newData);
    }
    onChange(data);
  };

  const handleChange = data => {
    formList.forEach((item, index) => {
      if (item.id === data.id) {
        formList[index].value = data.value;
      }
    });
    onChange(data);
  };

  return (
    <div>
      {formList.map((item: baseFormUnion) => {
        let FormItem = BaseForm[item.type];
        return (
          <div key={uuid(6, 10)}>
            <Tooltip title={item.id}>
              <label className='font-medium'>{item.label}</label>
            </Tooltip>
            <div className='flex justify-between items-center mt-2 mb-4'>
              {edit && <MinusCircleFilled onClick={() => handleDelItem(item)} />}
              <div className='flex px-4 my-2 items-center w-full'>
                <FormItem {...item} onChange={value => handleChange({ ...item, value })} />
              </div>
              {edit && <EditFilled onClick={() => handleEditItem(item)} />}
            </div>
          </div>
        );
      })}
      <Tooltip
        placement='leftBottom'
        title={
          <div className='flex flex-col'>
            {formTpl.map(item => (
              <Button
                className='mb-1'
                key={uuid(6, 10)}
                onClick={() => handleAddItem(item)}
                style={{ color: '#fff', backgroundColor: '#4a4a4a' }}
              >
                {item.label}
              </Button>
            ))}
          </div>
        }
      >
        {edit && <Button style={{ width: '100%' }}>添加</Button>}
      </Tooltip>
      <EditorModal item={curItem} onSave={handleSaveItem} ref={ref} />
    </div>
  );
}
export default EditableFormItems;
