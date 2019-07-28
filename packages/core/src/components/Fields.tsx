import * as React from 'react';
import { withFields } from './Layout';
import { findFieldIdx } from '../utils';

export interface FieldsProps {
  until?: string;
  fields: JSX.Element[];
  updateFields: any;
  className?: string;
}

class _Fields extends React.Component<FieldsProps, {}> {
  render(): JSX.Element[] {
    const { until, fields, ...rest } = this.props;
    const fieldId = until || null;
    let idx;

    if (fieldId) {
      const maybeIdx = findFieldIdx(fieldId, fields);

      if (maybeIdx === -1) {
        console.warn(`Property "until" of "<Fields />" contains unknown id "${fieldId}". Check metadata, please.`);
        idx = fields.length;
      } else {
        idx = maybeIdx;
      }
    } else {
      idx = fields.length;
    }

    return fields
      .splice(0, idx)
      .map(field => React.cloneElement(field, { ...rest }));
  }
}

export const Fields = withFields(_Fields);
