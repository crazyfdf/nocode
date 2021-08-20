import { useState } from 'react';
import { uuid } from '@/utils/tool';

export default function Checkbox(props: any) {
  const { value: defaultValue, onChange, id, options } = props;
  const [value, setValue] = useState(defaultValue);
  const btnClick = e => {
    onChange && onChange(e.target.value);
    setValue(e.target.value);
  };
  return options.map((v: any) => (
    <div key={uuid(6, 10)} className='flex items-center'>
      <label className='ml-3 block text-sm font-medium text-gray-700'>{v.label}</label>
      <input
        checked={v.value === value}
        type='radio'
        name={id}
        value={v.value}
        className='focus:ring-indigo-500 h-4 w-4 ml-1 text-indigo-600 border-gray-300'
        onChange={btnClick}
      />
    </div>
  ));
}
