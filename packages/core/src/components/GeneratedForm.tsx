import React from 'react';
import { ChangeEvent } from 'react';

import {
  RawMetaDescription,
  RawFieldMetaDescription,
  FormMetaDescription,
  FieldMetaDescription,
  FieldRenderer,
  KeyValue
} from '../interfaces';

import {
  get,
  extractFieldActions,
  enhanceFormMeta
} from '../utils';

import { Layout } from '../components/Layout';
import { SubForm } from '../components/renderers/SubForm';
import { ListForm } from '../components/renderers/ListForm';
import { Fields } from '../components/Fields';

export interface GeneratedFormProps {
  className?: string;
  meta: RawMetaDescription;
  data: KeyValue;
  errors: KeyValue;
  validator(formData: KeyValue): KeyValue;
  renderers: { [key: string]: typeof FieldRenderer };
  actions?: KeyValue;
  onChange(data: any, errors: any, isValid: boolean): void;
  isSubForm?: boolean;
}

export class GeneratedForm extends React.PureComponent<GeneratedFormProps, {}> {
  handleChange(fieldId: string, newValue: any): void {
    const nextData = { ...this.props.data };
    nextData[fieldId] = { value: newValue, isDirty: true };

    const { validator, isSubForm } = this.props;

    /**
     * Skip validation if current form is subform,
     * because validation is processed on the top level.
     */
    const isValidatable = validator && !isSubForm;
    const nextErrors = isValidatable ? validator(nextData) : { isValid: true, errors: {} };

    this.props.onChange(nextData, nextErrors.errors, nextErrors.isValid);
  }

  render() {
    const fields: JSX.Element[] = [];

    const {
      className = '',
      meta,
      data,
      errors,
      actions: formActions,
      renderers,
      validator,
      children
    } = this.props;

    const _meta = enhanceFormMeta(meta);

    for (let field of _meta.fields) {
      const {
        id,
        renderer: { type, config },
        actions: fieldActions,
        hidden,
        disabled,
        serializer
      } = field;

      /**
       * Skip rendering of hidden fields.
       * It does not influence field's state, only presentation.
       */
      if (hidden) {
        continue;
      }

      const Renderer =
        type === 'form' ? SubForm : type === 'list' ? ListForm : renderers[type];

      const actions: { [key: string]: any } = extractFieldActions(
        formActions,
        fieldActions
      );

      const subFormAdditionalProps =
        type === 'form' || type === 'list'
          ? {
              isSubForm: true,
              formData: data[id],
              actions: formActions,
              errors: get(errors, id, type === 'list' ? [] : {}),
              serializer,
              renderers,
              validator
            }
          : {};

      fields.push(
        <Renderer
          key={id}
          id={id}
          data={data[id]}
          errors={get(errors, id, null)}
          config={config}
          actions={actions}
          onChange={(newValue: any) => {
            this.handleChange(id, newValue);
          }}
          disabled={disabled}
          {...subFormAdditionalProps}
        >
          {id}
        </Renderer>
      );
    }

    return (
      <div className={`generated-form ${className || ''}`}>
        <Layout fields={fields}>{children || <Fields />}</Layout>
      </div>
    );
  }

  onChange(id: string, event: any): void {}
}
