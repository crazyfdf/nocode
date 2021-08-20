export interface IUploadConfigType {
  key: string;
  name: string;
  value: any;
  type: 'Upload';
  isCrop?: boolean;
  cropRate?: number;
}

export type TUploadDefaultType = Array<{
  uid: string;
  name: string;
  status: string;
  url: string;
}>;

export interface ITextConfigType {
  key: string;
  name: string;
  value: any;
  type: 'Text';
}
export type TTextDefaultType = string;

export interface ITextAreaConfigType {
  key: string;
  name: string;
  value: any;
  type: 'TextArea';
}
export type TTextAreaDefaultType = string;

export interface INumberConfigType {
  key: string;
  name: string;
  value: any;
  type: 'Number';
  range?: [number, number];
  step?: number;
}

export type TNumberDefaultType = number;

export interface IDataListConfigType {
  key: string;
  name: string;
  value: any;
  type: 'DataList';
  cropRate?: number;
}

export type TDataListDefaultTypeItem = {
  id: string;
  title: string;
  desc: string;
  link: string;
  imgUrl: TUploadDefaultType;
  type?: number;
  price?: string;
};

export type TDataListDefaultType = Array<TDataListDefaultTypeItem>;

export interface IColorConfigType {
  key: string;
  name: string;
  value: any;
  type: 'Color';
}

export type TColorDefaultType = string;

export interface IRichTextConfigType {
  key: string;
  name: string;
  value: any;
  type: 'RichText';
}
export type TRichTextDefaultType = string;

export interface IMutiTextConfigType {
  key: string;
  name: string;
  value: any;
  type: 'MutiText';
}

export type TMutiTextDefaultType = Array<string>;

export interface ISelectConfigType<KeyType> {
  key: string;
  name: string;
  value: any;
  type: 'Select';
  range: Array<{
    key: KeyType;
    text: string;
  }>;
}
export type TSelectDefaultType<KeyType> = KeyType;

export interface IRadioConfigType<KeyType> {
  key: string;
  name: string;
  value: any;
  type: 'Radio';
  range: Array<{
    key: KeyType;
    text: string;
  }>;
}
export type TRadioDefaultType<KeyType> = KeyType;

export interface ISwitchConfigType {
  key: string;
  name: string;
  value: any;
  type: 'Switch';
}
export type TSwitchDefaultType = boolean;

export interface ICardPickerConfigType<T> {
  key: string;
  name: string;
  value: any;
  type: 'CardPicker';
  icons: Array<T>;
}
export type TCardPickerDefaultType<T> = T;

export interface ITableConfigType {
  key: string;
  name: string;
  value: any;
  type: 'Table';
}
export type TTableDefaultType = Array<{
  name: string;
  value: number;
}>;

export interface IPosConfigType {
  key: string;
  name: string;
  value: any;
  type: 'Pos';
  placeObj: {
    text: string;
    link: string;
  };
}

export type TPosItem = number | undefined;

export type TPosDefaultType = [TPosItem, TPosItem];

export interface IFormItemsConfigType {
  key: string;
  name: string;
  value: any;
  type: 'FormItems';
}

export type baseFormOptionsType = {
  label: string;
  value: string;
};

export type baseFormTextTpl = {
  id: string;
  value: string;
  type: 'Text';
  label: string;
  placeholder?: string;
};

export type baseFormCodeDataTpl = {
  id: string;
  value: any;
  type: 'CodeData';
  label: string;
  placeholder?: string;
};

export type baseFormColorTpl = {
  id: string;
  value: string;
  type: 'Color';
  label: string;
  placeholder?: string;
};

export type baseFormSwitchTpl = {
  id: string;
  value: boolean;
  type: 'Switch';
  label: string;
};

export type baseFormNumberTpl = {
  id: string;
  value: any;
  type: 'Number';
  label: string;
  placeholder?: string;
};

export type baseFormTextAreaTpl = {
  id: string;
  value: string;
  type: 'Textarea';
  label: string;
  placeholder?: string;
};

export type baseFormRadioTpl = {
  id: string;
  value: any;
  type: 'Radio';
  label: string;
  options: baseFormOptionsType[];
};

export type baseFormCheckboxTpl = {
  id: string;
  value: any;
  type: 'Checkbox';
  label: string;
  options: baseFormOptionsType[];
};

export type baseFormSelectTpl = {
  id: string;
  value: any;
  type: 'Select';
  label: string;
  options: baseFormOptionsType[];
};

export type baseFormDateTpl = {
  id: string;
  value: any;
  type: 'Date';
  label: string;
  placeholder?: string;
};

export type baseFormUnion =
  | baseFormSwitchTpl
  | baseFormTextTpl
  | baseFormColorTpl
  | baseFormNumberTpl
  | baseFormTextAreaTpl
  | baseFormRadioTpl
  | baseFormCheckboxTpl
  | baseFormSelectTpl
  | baseFormDateTpl
  | baseFormCodeDataTpl;
export type baseFormUnionType =
  | baseFormSwitchTpl['type']
  | baseFormTextTpl['type']
  | baseFormColorTpl['type']
  | baseFormNumberTpl['type']
  | baseFormTextAreaTpl['type']
  | baseFormRadioTpl['type']
  | baseFormCheckboxTpl['type']
  | baseFormSelectTpl['type']
  | baseFormDateTpl['type']
  | baseFormCodeDataTpl['type'];

export type TFormItemsDefaultType = Array<baseFormUnion>;
