import * as React from 'react';
import { GeneratedForm } from '../GeneratedForm';
import {
  FieldRenderer,
  FieldRendererProps,
  FieldMetaDescription,
  KeyValue,
} from '../../interfaces';

import {
  withDefaults,
  enhanceFieldMeta
} from '../../utils';

export interface SubFormProps extends FieldRendererProps {
  dirtiness: KeyValue,
  validator(formData: KeyValue): KeyValue;
  renderers: { [key: string]: typeof FieldRenderer };
}

const value: KeyValue = {};

export class SubForm extends FieldRenderer<SubFormProps> {
  static defaultProps = {
    data: value
  };

  render() {
    const {
      id,
      className,
      onChange,
      disabled,
      config,
      data,
      errors,
      dirtiness,
      renderers,
      validator,
      actions
    } = this.props;

    const enhancedFieldsMeta = config.fields.map((meta: FieldMetaDescription) => {
      const newMeta = enhanceFieldMeta(meta);

      newMeta.disabled = disabled;
      return newMeta;
    });

    const enhancedFormData = withDefaults(data, enhancedFieldsMeta);

    return (
      <GeneratedForm
        className={className || ''}
        meta={{ fields: enhancedFieldsMeta }}
        data={enhancedFormData}
        errors={errors}
        dirtiness={dirtiness}
        validator={validator}
        renderers={renderers}
        actions={actions}
        onChange={onChange}
        isSubForm
      >
        {this.props.children}
      </GeneratedForm>
    );
  }
}
