import { TFormItemsDefaultType } from '@/types/types';

export const formTpl: TFormItemsDefaultType = [
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
  {
    id: '',
    type: 'CodeData',
    label: 'code',
    placeholder: 'object属性默认值',
    value: '',
  },
];

export default {};
