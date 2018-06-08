/**
 * Renderer "ListForm" allows to render list of nested subforms.
 * It is useful, when you need to build form with list of repated
 * sections, where each section consists of more than one fields
 * (e.g. section "Linked accounts" in user profile form, with
 * "user name", "avatar", "unlink button" fields,).
 */

import * as React from 'react';
import { ChangeEvent } from 'react';
import { GeneratedForm } from '../GeneratedForm';
import {
  FieldRenderer,
  FieldProps,
  KeyValue,
  FieldMetaDescription,
  RawFieldMetaDescription
} from '../../interfaces';

import { withDefaults, extractFieldActions, enhanceFieldMeta } from '../../utils';

export interface ItemData {
  value: object;
  isDirty: boolean;
}

export interface ListFormProps extends FieldProps {
  formData: {
    value: ItemData[];
    isDirty: boolean;
  };

  serializer?: string;
  renderers: { [key: string]: typeof FieldRenderer };
  validator(formData: KeyValue): KeyValue;
}

const value: ItemData[] = [];

export class ListForm extends React.PureComponent<ListFormProps, {}> {
  static defaultProps = {
    formData: {
      value,
      isDirty: false
    }
  };

  handleOnChange(idx: number, itemData: any) {
    const newValue = [...this.props.formData.value];

    newValue[idx] = itemData;
    this.props.onChange(newValue);
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

    const enhancedFieldsMeta: FieldMetaDescription[] = [];

    for (let meta of config.fields) {
      const newMeta = enhanceFieldMeta(meta);

      newMeta.renderer.config.disabled = disabled;
      newMeta.serializer = `${serializer || id}.${meta.serializer || meta.id}`;
      enhancedFieldsMeta.push(newMeta);
    }

    const values = formData.value || [];
    const result = [];

    for (let idx = 0; idx < values.length; idx++) {
      const itemData = values[idx];
      const indexedActions = Object.keys(actions).reduce((acc: KeyValue, key: string) => {
        acc[key] = (...args: any[]) => actions[key](idx, ...args);
        return acc;
      }, {});

      result.push(
        <GeneratedForm
          key={`list-form-${id}-${idx}`}
          className={className || ''}
          meta={{ fields: enhancedFieldsMeta }}
          data={itemData}
          errors={errors[idx] || {}}
          validator={validator}
          renderers={renderers}
          actions={indexedActions}
          onChange={data => this.handleOnChange(idx, data)}
          isSubForm
        >
          {this.props.children}
        </GeneratedForm>
      );
    }

    return result;
  }
}
