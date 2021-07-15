export interface IUploadConfigType {
  key: string;
  name: string;
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
  type: 'Text';
}
export type TTextDefaultType = string;

export interface ITextAreaConfigType {
  key: string;
  name: string;
  type: 'TextArea';
}
export type TTextAreaDefaultType = string;

export interface INumberConfigType {
  key: string;
  name: string;
  type: 'Number';
  range?: [number, number];
  step?: number;
}

export type TNumberDefaultType = number;

export interface IDataListConfigType {
  key: string;
  name: string;
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
  type: 'Color';
}

export type TColorDefaultType = string;

export interface IRichTextConfigType {
  key: string;
  name: string;
  type: 'RichText';
}
export type TRichTextDefaultType = string;

export interface IMutiTextConfigType {
  key: string;
  name: string;
  type: 'MutiText';
}

export type TMutiTextDefaultType = Array<string>;

export interface ISelectConfigType<KeyType> {
  key: string;
  name: string;
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
  type: 'Switch';
}
export type TSwitchDefaultType = boolean;

export interface ICardPickerConfigType<T> {
  key: string;
  name: string;
  type: 'CardPicker';
  icons: Array<T>;
}
export type TCardPickerDefaultType<T> = T;

export interface ITableConfigType {
  key: string;
  name: string;
  type: 'Table';
}
export type TTableDefaultType = Array<{
  name: string;
  value: number;
}>;

export interface IPosConfigType {
  key: string;
  name: string;
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
  type: 'FormItems';
}

export type baseFormOptionsType = {
  label: string;
  value: string;
};

export type baseFormTextTpl = {
  id: string;
  type: 'Text';
  label: string;
  placeholder: string;
};

export type baseFormSwitchTpl = {
  id: string;
  type: 'Switch';
  label: string;
  placeholder: string;
};

export type baseFormNumberTpl = {
  id: string;
  type: 'Number';
  label: string;
  placeholder: string;
};

export type baseFormTextAreaTpl = {
  id: string;
  type: 'Textarea';
  label: string;
  placeholder: string;
};

export type baseFormRadioTpl = {
  id: string;
  type: 'Radio';
  label: string;
  options: baseFormOptionsType[];
};

export type baseFormCheckboxTpl = {
  id: string;
  type: 'Checkbox';
  label: string;
  options: baseFormOptionsType[];
};

export type baseFormSelectTpl = {
  id: string;
  type: 'Select';
  label: string;
  options: baseFormOptionsType[];
};

export type baseFormDateTpl = {
  id: string;
  type: 'Date';
  label: string;
  placeholder: string;
};

export type baseFormUnion =
  | baseFormSwitchTpl
  | baseFormTextTpl
  | baseFormNumberTpl
  | baseFormTextAreaTpl
  | baseFormRadioTpl
  | baseFormCheckboxTpl
  | baseFormSelectTpl
  | baseFormDateTpl;
export type baseFormUnionType =
  | baseFormSwitchTpl['type']
  | baseFormTextTpl['type']
  | baseFormNumberTpl['type']
  | baseFormTextAreaTpl['type']
  | baseFormRadioTpl['type']
  | baseFormCheckboxTpl['type']
  | baseFormSelectTpl['type']
  | baseFormDateTpl['type'];

export type TFormItemsDefaultType = Array<baseFormUnion>;
