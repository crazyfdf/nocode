import { useState } from 'react';
import style from './index.module.css';

export default function Switch(props: any) {
  const { value, onChange } = props;
  const [checked, setChecked] = useState(value);
  const btnClick = () => {
    setChecked(!checked);
    onChange && onChange(!checked);
  };
  return (
    <div className={style.switchCont} onClick={btnClick}>
      <input type='checkbox' className={style.switch} {...props} checked={checked} />
      <label className={style.label} />
    </div>
  );
}
