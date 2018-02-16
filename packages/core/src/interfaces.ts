import * as React from 'react';

export interface FormMetaDescription {
  fields: FieldMetaDescription[];
}

export interface RawFieldMetaDescription {
  id: string;
  renderer?: string | RendererComplex;
  serializer?: string;
  validator?: any;
  actions?: { [key: string]: any };
  hidden?: boolean;
  disabled?: boolean;
}

export interface FieldMetaDescription extends RawFieldMetaDescription {
  id: string;
  renderer: RendererComplex;
  serializer: string;
  actions: { [key: string]: any };
  hidden: boolean;
  disabled: boolean;
}

export interface RendererComplex {
  type: string;
  config: any;
}

export interface FieldRendererProps {
  id: string;
  data: any;
  errors: any;
  actions: any;
  config: any;
  type?: any;
  onChange(data: any, errors: any): void;
  disabled: boolean;
}

export class FieldRenderer extends React.Component<FieldRendererProps, {}> {}

export type KeyValue = { [key: string]: any }

export interface FieldProps {
  id: string;
  className?: string;
  data: {
    value: string | boolean;
    isDirty: boolean;
  };
  errors?: string[];
  actions: KeyValue;
  config: KeyValue;
  disabled: boolean;
  onChange(value: any): void;
}
