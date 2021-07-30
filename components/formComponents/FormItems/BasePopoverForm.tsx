import React, { ReactText } from 'react';
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
} from '@/types/types';

// 维护表单控件， 提高form渲染性能

type TBaseForm = {
  [key in baseFormUnionType]: any;
};

const BaseForm: TBaseForm = {
  Text: (props: baseFormTextTpl & { onChange: (v: string | undefined) => void }) => {
    const { label, onChange } = props;
    return (
      <Button style={{ color: '#fff', backgroundColor: '#4a4a4a' }} onChange={() => onChange}>
        {label}
      </Button>
    );
  },
  Color: (props: baseFormColorTpl & { onChange: (v: string | undefined) => void }) => {
    const { label, onChange } = props;
    return (
      <Button style={{ color: '#fff', backgroundColor: '#4a4a4a' }} onChange={() => onChange}>
        {label}
      </Button>
    );
  },
  Textarea: (props: baseFormTextAreaTpl & { onChange: (v: string | undefined) => void }) => {
    const { label, onChange } = props;
    return (
      <Button style={{ color: '#fff', backgroundColor: '#4a4a4a' }} onChange={() => onChange}>
        {label}
      </Button>
    );
  },
  Number: (props: baseFormNumberTpl & { onChange: (v: string | undefined | number) => void }) => {
    const { label, onChange } = props;
    return (
      <Button style={{ color: '#fff', backgroundColor: '#4a4a4a' }} onChange={() => onChange}>
        {label}
      </Button>
    );
  },
  Radio: (props: baseFormRadioTpl & { onChange: (v: string | undefined | number) => void }) => {
    const { label, onChange } = props;
    return (
      <Button style={{ color: '#fff', backgroundColor: '#4a4a4a' }} onChange={() => onChange}>
        {label}
      </Button>
    );
  },
  Checkbox: (
    props: baseFormCheckboxTpl & { onChange: (v: Array<ReactText> | undefined) => void },
  ) => {
    const { label, onChange } = props;
    return (
      <Button style={{ color: '#fff', backgroundColor: '#4a4a4a' }} onChange={() => onChange}>
        {label}
      </Button>
    );
  },
  Switch: (props: baseFormSwitchTpl & { onChange: (v: Array<ReactText> | undefined) => void }) => {
    const { label, onChange } = props;
    return (
      <Button style={{ color: '#fff', backgroundColor: '#4a4a4a' }} onChange={() => onChange}>
        {label}
      </Button>
    );
  },
  Date: (props: baseFormDateTpl & { onChange: (v: Date) => void }) => {
    const { label, onChange } = props;
    return (
      <Button style={{ color: '#fff', backgroundColor: '#4a4a4a' }} onChange={() => onChange}>
        {label}
      </Button>
    );
  },
  Select: (
    props: baseFormSelectTpl & { onChange: ((v: Record<string, any>) => void) | undefined },
  ) => {
    const { label, onChange } = props;
    return (
      <Button style={{ color: '#fff', backgroundColor: '#4a4a4a' }} onChange={() => onChange}>
        {label}
      </Button>
    );
  },
};

export default BaseForm;
