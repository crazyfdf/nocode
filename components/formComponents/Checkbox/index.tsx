import { useState } from 'react';

export default function Checkbox(props: any) {
  const { value: defaultValue = [], options } = props;
  const [value, setValue] = useState(defaultValue);
  const btnClick = e => {
    console.log(e.target.value);
    let res: any[] = [];
    if (value.includes(e.target.value)) {
      res = value.filter(item => {
        return item !== e.target.value;
      });
    } else {
      res = [...value, e.target.value];
    }
    props.onChange && props.onChange(res);
    setValue(res);
  };
  return options.map((v: any) => (
    <div className='flex items-center mx-2'>
      <label htmlFor='candidates' className='font-medium text-gray-700'>
        {v.label}
      </label>
      <input
        type='checkbox'
        value={v.value}
        className='focus:ring-indigo-500 h-4 w-4 ml-1 text-indigo-600 border-gray-300 rounded'
        checked={value.includes(v.value)}
        onChange={btnClick}
      />
    </div>
  ));
}
