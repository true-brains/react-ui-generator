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

export interface ItemData {
  value: object;
  isDirty: boolean;
}

export interface ListFormProps extends FieldProps {
  formData: {
    value: ItemData[];
    isDirty: boolean;
  }

  serializer?: string;
  validator(valdiate: any, schema: any): void;
  renderers: { [key: string]: typeof FieldRenderer };
}

export class ListForm extends React.PureComponent<ListFormProps, {}> {
  handleOnChange(itemData: any) {
    console.log('itemData: ', itemData)
  }

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

    return formData.value.map((itemData: ItemData, idx: number) => (
      <GeneratedForm
        key={`list-form-${id}-${idx}`}
        className={className || ''}
        meta={{ fields: enhancedFieldsMeta }}
        data={itemData}
        errors={errors}
        validator={validator}
        renderers={renderers}
        actions={actions}
        onChange={(data) => this.handleOnChange(data)}
      >
        {this.props.children}
      </GeneratedForm>
    ));
  }
}
