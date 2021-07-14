import { baseFormUnion, TFormItemsDefaultType } from '@/types/types';
import { uuid } from '@/utils/tool';
import { PlusOutlined, MinusCircleFilled, EditFilled } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { RefObject, useCallback, useEffect, useState } from 'react';
import BasePopoverForm from '@/components/formComponents/FormItems/BasePopoverForm';
import EditorModal from '@/components/formComponents/FormItems/EditorModal';
import BaseForm from '@/components/formComponents/FormItems/BaseForm';

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
    type: 'MyRadio',
    label: 'type',
    options: [
      { label: '选项一', value: '1' },
      { label: '选项二', value: '2' },
    ],
  },
  {
    id: '',
    type: 'MyCheckbox',
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
    placeholder: '请输入日期',
  },
];
interface FormItemsProps {
  formList?: TFormItemsDefaultType;
  onChange?: (v: TFormItemsDefaultType) => void;
  data: any;
  rightPannelRef: RefObject<HTMLDivElement>;
}
export default function EditableFormItems(props: FormItemsProps) {
  const { formList, onChange, rightPannelRef: rightPanelRef } = props;
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
  return (
    <div>
      {formData.map((item: baseFormUnion) => {
        let FormItem = BaseForm[item.type];
        return (
          <div className='flex justify-between items-center' key={item.id}>
            <MinusCircleFilled onClick={() => handleDelItem(item)} />
            <FormItem className='flex-1' {...item} />
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
                <Button key={item.id} onClick={() => handleAddItem(item)}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'row',
                      marginTop: '10px',
                    }}
                  >
                    <FormItem {...item} />
                  </div>
                </Button>
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
