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
}

export interface FieldMetaDescription extends RawFieldMetaDescription {
  id: string;
  renderer: RendererComplex;
  serializer: string;
  actions: { [key: string]: any };
}

export interface RendererComplex {
  type: string;
  config: any;
}


export class FieldRenderer extends React.Component<FieldRendererProps, {}> {}

export interface FieldRendererProps {
  id: string;
  data: any;
  errors: any;
  actions: any;
  config: any;
  onChange(data: any, errors: any): void;
}

export type KeyValue = { [key: string]: any }
