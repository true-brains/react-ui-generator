import * as React from 'react';
import { ChangeEvent } from 'react';

import {
  FormMetaDescription,
  RawFieldMetaDescription,
  FieldMetaDescription,
  FieldRenderer
} from '../interfaces';

import * as Utils from '../utils';
import { SubForm } from '../components/renderers/SubForm';
import { ListForm } from '../components/renderers/ListForm';

export interface GeneratedFormProps {
  className: string;
  meta: FormMetaDescription;
  data: { [key: string]: any };
  errors: { [key: string]: any };
  validator(valdiate: any, schema: any): void;
  renderers: { [key: string]: typeof FieldRenderer };
  actions?: { [key: string]: any };
  onChange(data: any, errors: any): void;
}

export class GeneratedForm extends React.PureComponent<GeneratedFormProps, {}> {
  handleChange(fieldId: string, newValue: any): void {
    const newData = { ...this.props.data };

    newData[fieldId] = { value: newValue, isDirty: true };
    this.props.onChange(newData, {});
  }

  render() {
    const fields: JSX.Element[] = [];

    const {
      className,
      meta,
      data,
      errors,
      actions: formActions,
      renderers,
      children
    } = this.props;

    const _meta = Utils.enhanceFormMeta(meta);

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

      const Renderer = type === 'form'
        ? SubForm
        : type === 'list' ? ListForm : renderers[type];

      const actions: { [key: string]: any } = Utils.extractFieldActions(
        formActions,
        fieldActions
      );

      const subFormAdditionalProps = (type === 'form' || type === 'list') ? {
        serializer,
        renderers,
        formData: data[id],
        actions: formActions,
        errors: errors[id] || {}
      } : {};

      fields.push(
        <Renderer
          key={id}
          id={id}
          data={data[id]}
          errors={errors[id]}
          config={config}
          actions={actions}
          onChange={(newValue: any) => {
            this.handleChange(id, newValue);
          }}
          disabled={disabled}
          { ...subFormAdditionalProps }
        >
          {id}
        </Renderer>
      );
    }

    return (
      <div className={`generated-form ${className || ''}`}>
        {Utils.layout(children, fields)}
      </div>
    );
  }

  onChange(id: string, event: any): void {}
}
