import React from 'react';
import PropTypes from 'prop-types';

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

export interface RawMetaDescription {
  fields: RawFieldMetaDescription[];
}

export interface FormMetaDescription {
  fields: FieldMetaDescription[];
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
    value: string | boolean | number;
    isDirty: boolean;
  };
  errors?: any[];
  actions: KeyValue;
  config: KeyValue;
  disabled: boolean;
  onChange(value: any): void;
}

export function basePropTypes() {
  return {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    data: PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]),
      isDirty: PropTypes.bool,
    }),
    errors: PropTypes.arrayOf(PropTypes.string),
    actions: PropTypes.objectOf(PropTypes.func),
    config: PropTypes.shape({
      type: PropTypes.string,
    }),
    disabled: PropTypes.bool,
  };
}
