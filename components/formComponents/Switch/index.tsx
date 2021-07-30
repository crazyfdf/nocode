import { useState } from 'react';
import style from './index.module.css';

export default function Switch(props: any) {
  const { value } = props;
  const [checked, setChecked] = useState(value);
  const btnClick = () => {
    setChecked(!checked);
    props.onChange && props.onChange(!checked);
  };
  return (
    <div className={style.switchCont} onClick={btnClick}>
      {checked ? (
        <input type='checkbox' className={style.switch} {...props} checked />
      ) : (
        <input type='checkbox' className={style.switch} {...props} />
      )}
      <label className={style.label} />
    </div>
  );
}
