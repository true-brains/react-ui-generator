import * as React from 'react';
import get from 'lodash.get';
import { withFields } from './Layout';
import { FormMetaDescription } from '../interfaces';
import { findFieldIdx } from '../utils';

export interface FieldProps {
  id: string;
  fields: JSX.Element[];
  updateFields: any;
  className?: string;
}

class _Field extends React.Component<FieldProps, {}> {
  render(): JSX.Element {
    const { id, fields, children, ...rest } = this.props;
    const fieldIdx = findFieldIdx(fields, id);

    // TODO: check if this is safe to modify context reference
    const [field] = fields.splice(fieldIdx, 1);

    const isSubForm = get(field, 'props.config.fields', false);

    return isSubForm
      ? React.cloneElement(field, { children, ...rest })
      : React.cloneElement(field, { ...rest });
  }
}

export const Field = withFields(_Field);
