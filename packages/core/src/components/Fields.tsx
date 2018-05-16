import * as React from 'react';
import get from 'lodash.get';
import { withFields } from './Layout';
import { FormMetaDescription } from '../interfaces';
import { findFieldIdx } from '../utils';

export interface FieldsProps {
  until?: string;
  fields: JSX.Element[];
  updateFields: any;
  className?: string;
}

class _Fields extends React.Component<FieldsProps, {}> {
  render(): JSX.Element[] {
    const { until, fields, className, children } = this.props;
    const fieldId = until || null;
    const idx = fieldId ? findFieldIdx(fields, fieldId) : fields.length;

    return fields.splice(0, idx);
  }
}

export const Fields = withFields(_Fields);
