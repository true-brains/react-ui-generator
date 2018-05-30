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
  FieldMetaDescription
} from '../../interfaces';
import { withDefaults, extractFieldActions } from '../../utils';

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
      isDirty: false,
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

    const enhancedFieldsMeta = config.fields.map((meta: FieldMetaDescription) => {
      const renderer =
        typeof meta.renderer === 'object'
          ? meta.renderer
          : { type: meta.renderer, config: {} };

      renderer.config.disabled = disabled;
      meta.serializer = `${serializer || id}.${meta.serializer || meta.id}`;

      return meta;
    });

    return formData.value.map((itemData: ItemData, idx: number) => {
      const wrappedActions = Object.keys(actions).reduce((acc: KeyValue, key: string) => {
        acc[key] = (...args: any[]) => actions[key](idx, ...args);
        return acc;
      }, {});

      return (
        <GeneratedForm
          key={`list-form-${id}-${idx}`}
          className={className || ''}
          meta={{ fields: enhancedFieldsMeta }}
          data={itemData}
          errors={errors[idx] || {}}
          validator={validator}
          renderers={renderers}
          actions={wrappedActions}
          onChange={data => this.handleOnChange(idx, data)}
          isSubForm
        >
          {this.props.children}
        </GeneratedForm>
      );
    });
  }
}
