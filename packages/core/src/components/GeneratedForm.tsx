import * as React from 'react';

import {
  FormMetaDescription,
  RawFieldMetaDescription,
  FieldMetaDescription,
  FieldRenderer
} from '../interfaces';

import { Field } from './Field';
import { FieldsRest } from './FieldsRest';
import * as Utils from '../utils';

export interface GeneratedFormProps {
  meta: FormMetaDescription;
  data: { [key: string]: any };
  errors: { [key: string]: any };
  validator(valdiate: any, schema: any): void;
  renderers: { [key: string]: typeof FieldRenderer };
  actions?: { [key: string]: any };
  onChange(data: any, errors: any): void;
}

export class GeneratedForm extends React.PureComponent<GeneratedFormProps, {}> {
  render() {
    const fields: JSX.Element[] = [];
    const { meta, data, errors, actions: formActions, renderers, children } = this.props;
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
          onChange={event => {
            this.onChange(id, event);
          }}
        >
          {id}
        </Renderer>
      );
    }

    return <div className="generated-form">{Utils.layout(children, fields)}</div>;
  }

  onChange(id: string, event: any): void {}
}
