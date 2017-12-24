import * as React from 'react';

export interface FormMetaDescription {
  fields: FieldMetaDescription[];
}

export interface FieldMetaDescription {
  id: string;
  renderer: string;
  accessor: string;
  serializer: string;
  validator: any;
}

export class FieldRenderer extends React.Component<FieldRendererProps, {}> {}

export interface FieldRendererProps {
  id: string;
  data: any;
  errors: any;
  onChange(data: any, errors: any): void;
}
