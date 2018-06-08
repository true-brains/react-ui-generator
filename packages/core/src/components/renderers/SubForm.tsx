import * as React from 'react';
import { ChangeEvent } from 'react';
import { GeneratedForm } from '../GeneratedForm';
import {
  FieldRenderer,
  FieldProps,
  KeyValue,
  FieldMetaDescription
} from '../../interfaces';

import {
  withDefaults,
  extractFieldActions,
  enhanceFieldMeta
} from '../../utils';

export interface SubFormProps extends FieldProps {
  formData: {
    value: object;
    isDirty: boolean;
  };

  serializer?: string;
  validator(formData: KeyValue): KeyValue;
  renderers: { [key: string]: typeof FieldRenderer };
}

const value: any = {};

export class SubForm extends React.PureComponent<SubFormProps, {}> {
  static defaultProps = {
    formData: {
      value,
      isDirty: false
    }
  };

  render() {
    const {
      id,
      className,
      onChange,
      disabled,
      config,
      formData,
      errors,
      renderers,
      validator,
      serializer,
      actions
    } = this.props;

    const enhancedFieldsMeta = config.fields.map((meta: FieldMetaDescription) => {
      const newMeta = enhanceFieldMeta(meta);

      newMeta.renderer.config.disabled = disabled;
      newMeta.serializer = `${serializer || id}.${meta.serializer || meta.id}`;

      return newMeta;
    });

    const enhancedFormData = withDefaults(formData.value, enhancedFieldsMeta);

    return (
      <GeneratedForm
        className={className || ''}
        meta={{ fields: enhancedFieldsMeta }}
        data={enhancedFormData}
        errors={errors}
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
