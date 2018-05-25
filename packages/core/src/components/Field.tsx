import * as React from 'react';
import { withFields } from './Layout';
import { FormMetaDescription } from '../interfaces';
import { findFieldIdx, get } from '../utils';

export interface FieldProps {
  id: string;
  fields: JSX.Element[];
  updateFields: any;
  className?: string;
}

class _Field extends React.Component<FieldProps, {}> {
  render(): JSX.Element {
    const { id, fields, ...rest } = this.props;
    const fieldIdx = findFieldIdx(fields, id);

    if (fieldIdx === -1) {
      console.warn(`Property "id" of "<Field />" contains unknown id "${id}". Check metadata, please.`);
      return null;
    }

    // TODO: check if this is safe to modify context reference
    const [field] = fields.splice(fieldIdx, 1);

    return React.cloneElement(field, { ...rest });
  }
}

export const Field = withFields(_Field);
