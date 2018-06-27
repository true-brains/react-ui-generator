import React from 'react';

import {
  RawMetaDescription,
  KeyValue,
  FieldRenderer,
  FormMetaDescription,
} from '../interfaces';

import { get, extractFieldActions, enhanceFormMeta } from '../utils';

import { Layout } from './Layout';
import { SubForm } from './renderers/SubForm';
import { ListForm } from './renderers/ListForm';
import { Fields } from './Fields';

export interface GeneratedFormProps {
  className?: string;
  meta: RawMetaDescription;
  data: KeyValue;
  errors: any;
  dirtiness: KeyValue;
  renderers: { [key: string]: typeof FieldRenderer };
  actions: KeyValue;
  isSubForm?: boolean;
  validator(formData: KeyValue): KeyValue;
  onChange(data: KeyValue, errors: KeyValue, isValid: boolean, dirtiness: KeyValue): void;
}

export interface GeneratedFormState {
  meta: FormMetaDescription;
}

const meta: FormMetaDescription = { fields: [] };

export class GeneratedForm extends React.PureComponent<
  GeneratedFormProps,
  GeneratedFormState
> {
  state = { meta };

  static getDerivedStateFromProps(props: GeneratedFormProps) {
    return {
      meta: enhanceFormMeta(props.meta)
    };
  }

  handleChange(fieldId: string, newValue: any, newDirtines: any): void {
    const nextData = { ...this.props.data };
    const nextDirtiness = { ...this.props.dirtiness };

    nextData[fieldId] = newValue;
    nextDirtiness[fieldId] = newDirtines;

    const { validator, isSubForm } = this.props;

    /**
     * Skip validation if current form is subform,
     * because validation is processed on the top level.
     */
    const isValidatable = validator && !isSubForm;
    const nextErrors = isValidatable
      ? validator(nextData)
      : { isValid: true, errors: {} };

    this.props.onChange(nextData, nextErrors.errors, nextErrors.isValid, nextDirtiness);
  }

  render() {
    const fields: JSX.Element[] = [];

    const {
      className = '',
      data,
      errors,
      dirtiness,
      actions: formActions,
      renderers,
      validator,
      children
    } = this.props;

    for (let field of this.state.meta.fields) {
      const {
        id,
        renderer: { type, config },
        actions: fieldActions,
        hidden,
        disabled,
      } = field;

      /**
       * Skip rendering of hidden fields.
       * It does not influence field's state, only presentation.
       */
      if (hidden) {
        continue;
      }

      const Renderer =
        type === 'form' ? SubForm : (type === 'list' ? ListForm : renderers[type]);

      if (!Renderer) {
        throw new Error(`Could not find renderer of type "${type}" (field "${id}") in form renderers.`)
      }

      const actions: { [key: string]: any } = extractFieldActions(
        formActions,
        fieldActions
      );

      const subFormAdditionalProps =
        type === 'form' || type === 'list'
          ? {
              isSubForm: true,
              data: data[id],
              actions: formActions,
              errors: get(errors, id, type === 'list' ? [] : {}),
              dirtiness: get(dirtiness, id, type === 'list' ? [] : {}),
              renderers,
              validator
            }
          : {};

      fields.push(
        <Renderer
          key={id}
          id={id}
          data={data[id]}
          errors={errors[id] || null}
          config={config}
          actions={actions}
          onChange={(newValue: any, newDirtines: any = true) => {
            this.handleChange(id, newValue, newDirtines);
          }}
          disabled={disabled}
          dirty={dirtiness[id] || false}
          {...subFormAdditionalProps}
        />
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
