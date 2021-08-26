import { Button } from 'antd';
import {
  baseFormDateTpl,
  baseFormRadioTpl,
  baseFormCheckboxTpl,
  baseFormSelectTpl,
  baseFormNumberTpl,
  baseFormTextAreaTpl,
  baseFormTextTpl,
  baseFormUnionType,
  baseFormSwitchTpl,
  baseFormColorTpl,
  baseFormCodeDataTpl,
} from '@/types/types';

// 维护表单控件， 提高form渲染性能

type TBaseForm = {
  [key in baseFormUnionType]: any;
};

const BaseForm: TBaseForm = {
  Text: (props: baseFormTextTpl) => {
    const { label } = props;
    return <Button style={{ color: '#fff', backgroundColor: '#4a4a4a' }}>{label}</Button>;
  },
  Color: (props: baseFormColorTpl) => {
    const { label } = props;
    return <Button style={{ color: '#fff', backgroundColor: '#4a4a4a' }}>{label}</Button>;
  },
  Textarea: (props: baseFormTextAreaTpl) => {
    const { label } = props;
    return <Button style={{ color: '#fff', backgroundColor: '#4a4a4a' }}>{label}</Button>;
  },
  Number: (props: baseFormNumberTpl) => {
    const { label } = props;
    return <Button style={{ color: '#fff', backgroundColor: '#4a4a4a' }}>{label}</Button>;
  },
  Radio: (props: baseFormRadioTpl) => {
    const { label } = props;
    return <Button style={{ color: '#fff', backgroundColor: '#4a4a4a' }}>{label}</Button>;
  },
  Checkbox: (props: baseFormCheckboxTpl) => {
    const { label } = props;
    return <Button style={{ color: '#fff', backgroundColor: '#4a4a4a' }}>{label}</Button>;
  },
  Switch: (props: baseFormSwitchTpl) => {
    const { label } = props;
    return <Button style={{ color: '#fff', backgroundColor: '#4a4a4a' }}>{label}</Button>;
  },
  Date: (props: baseFormDateTpl) => {
    const { label } = props;
    return <Button style={{ color: '#fff', backgroundColor: '#4a4a4a' }}>{label}</Button>;
  },
  Select: (props: baseFormSelectTpl) => {
    const { label } = props;
    return <Button style={{ color: '#fff', backgroundColor: '#4a4a4a' }}>{label}</Button>;
  },
  CodeData: (props: baseFormCodeDataTpl) => {
    const { label } = props;
    return <Button style={{ color: '#fff', backgroundColor: '#4a4a4a' }}>{label}</Button>;
  },
};

export default BaseForm;
