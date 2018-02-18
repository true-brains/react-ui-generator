import * as React from 'react';
import { ChangeEvent } from 'react';
import { GeneratedForm } from '../GeneratedForm';
import {
  FieldRenderer,
  FieldProps,
  KeyValue,
  FieldMetaDescription
} from '../../interfaces';
import { withDefaults, extractFieldActions } from '../../utils';

export interface SubFormProps extends FieldProps {
  formData: {
    value: object;
    isDirty: boolean;
  };

  serializer?: string;
  validator(formData: KeyValue): KeyValue;
  renderers: { [key: string]: typeof FieldRenderer };
}

export class SubForm extends React.PureComponent<SubFormProps, {}> {
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
      const renderer =
        typeof meta.renderer === 'object'
          ? meta.renderer
          : { type: meta.renderer, config: {} };

      renderer.config.disabled = disabled;
      meta.serializer = `${serializer || id}.${meta.serializer || meta.id}`;

      return meta;
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
      >
        {this.props.children}
      </GeneratedForm>
    );
  }
}
