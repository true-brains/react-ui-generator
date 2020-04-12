/**
 * Renderer "ListForm" allows you to render a list of nested subforms.
 * It is useful when you need to build a form with a list of the same sections,
 * where each section consists of more than one fields
 * (e.g. section "Linked accounts" in user profile form,
 * with "username", "avatar", "unlink button" fields,).
 */

import * as React from 'react';
import { GeneratedForm } from '../GeneratedForm';
import {
  FieldRendererComponent,
  FieldRendererProps,
  FieldRenderer,
  KeyValue,
  FieldMetaDescription,
} from '../../interfaces';

import { enhanceFieldMeta } from '../../utils';

export interface ListFormProps extends FieldRendererProps {
  dirtiness: KeyValue[],
  renderers: { [key: string]: FieldRendererComponent };
  validator(data: KeyValue): KeyValue;
}

export class ListForm extends FieldRenderer<ListFormProps> {
  static defaultProps = {
    data: [] as KeyValue[],
    dirtiness: [] as KeyValue[]
  };

  handleOnChange(idx: number, itemData: any, itemDirtiness: any) {
    const newValue = [...this.props.data];
    const newDirtines = [...this.props.dirtiness];

    newValue[idx] = itemData;
    newDirtines[idx] = itemDirtiness;
    this.props.onChange(newValue, newDirtines);
  }

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

    const enhancedFieldsMeta: FieldMetaDescription[] = [];

    for (let meta of config.fields) {
      const newMeta = enhanceFieldMeta(meta);

      newMeta.renderer.config.disabled = disabled;
      enhancedFieldsMeta.push(newMeta);
    }

    const values = data || [];
    const result = [];

    for (let idx = 0; idx < values.length; idx++) {
      const itemData = values[idx];
      const keyId = itemData.id || idx
      const indexedActions = Object.keys(actions).reduce((acc: KeyValue, key: string) => {
        acc[key] = (...args: any[]) => actions[key](idx, ...args);
        return acc;
      }, {});

      result.push(
        <GeneratedForm
          key={`list-form-${id}-${keyId}`}
          className={className || ''}
          meta={{ fields: enhancedFieldsMeta }}
          data={itemData}
          errors={errors[idx] || {}}
          dirtiness={dirtiness[idx] || {}}
          validator={validator}
          renderers={renderers}
          actions={indexedActions}
          onChange={(data, _errors, _isValid, dirtiness) => this.handleOnChange(idx, data, dirtiness)}
          isSubForm
        >
          {this.props.children}
        </GeneratedForm>
      );
    }

    return result;
  }
}
