import React from 'react';
import PropTypes from 'prop-types';

export interface RawFieldMetaDescription {
  readonly id: string;
  readonly renderer?: string | RendererComplex;
  readonly actions?: { [key: string]: any };
  readonly hidden?: boolean;
  readonly disabled?: boolean;
}

export interface FieldMetaDescription extends RawFieldMetaDescription {
  id: string;
  renderer: RendererComplex;
  actions: { [key: string]: any };
  hidden: boolean;
  disabled: boolean;
}

export interface RawMetaDescription {
  fields: ReadonlyArray<RawFieldMetaDescription>;
}

export interface FormMetaDescription {
  fields: FieldMetaDescription[];
}

export interface RendererComplex {
  type: string;
  config?: any;
}

export interface FieldRendererProps {
  readonly id: string;
  readonly className?: string;
  readonly data: any;
  readonly errors: Array<string>;
  readonly actions: KeyValue;
  readonly config: KeyValue;
  readonly type?: any;
  readonly disabled: boolean;
  readonly dirty: boolean;
  onChange(data: any, dirty?: any): void;
}

export type FieldRendererComponent = React.ComponentType<FieldRendererProps>
export class FieldRenderer<P = FieldRendererProps, S = {}> extends React.PureComponent<P, S> {}

export type KeyValue = { [key: string]: any }

export function basePropTypes() {
  return {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    data: PropTypes.any,
    errors: PropTypes.arrayOf(PropTypes.string),
    actions: PropTypes.objectOf(PropTypes.func),
    config: PropTypes.shape({
      type: PropTypes.string,
    }),
    disabled: PropTypes.bool,
    dirty: PropTypes.bool,
  };
}
