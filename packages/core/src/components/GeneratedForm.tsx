import * as React from 'react';
import { ChangeEvent } from 'react';

import {
  FormMetaDescription,
  RawFieldMetaDescription,
  FieldMetaDescription,
  FieldRenderer
} from '../interfaces';

import * as Utils from '../utils';

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
    console.log('_meta: ', _meta);

    for (let field of _meta.fields) {
      const { id, renderer: { type, config }, actions: fieldActions } = field;
      const Renderer: typeof FieldRenderer = renderers[type];
      const actions: { [key: string]: any } = Utils.extractFieldActions(
        formActions,
        fieldActions
      );

      fields.push(
        <Renderer
          key={id}
          id={id}
          data={data[id]}
          errors={errors[id]}
          config={config}
          actions={actions}
          onChange={newValue => {
            this.handleChange(id, newValue);
          }}
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
