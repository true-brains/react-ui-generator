import * as React from 'react';
import { ChangeEvent } from 'react';
import {
  GeneratedForm,
  Fields,
  FieldRenderer,
  FieldMetaDescription,
  FieldProps,
} from '@react-ui-generator/core';

import { withDefaults } from '@react-ui-generator/core';

export interface SubFormProps extends FieldProps {
  formData: {
    value: object;
    isDirty: boolean;
  };

  serializer?: string;
  validator(valdiate: any, schema: any): void;
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
        <Fields />
      </GeneratedForm>
    );
  }
}
