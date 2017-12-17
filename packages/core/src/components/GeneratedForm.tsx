import * as React from 'react';

export interface FieldRendererProps {
  id: string;
  data: any;
  errors: any;
  onChange(data: any, errors: any): void;
}

export class FieldRenderer extends React.Component<FieldRendererProps, {}> {}

export interface FieldMetaDescription {
  id: string;
  renderer: string;
  accessor: string;
  serializer: string;
  validator: any;
}

export interface FormMetaDescription {
  fields: FieldMetaDescription[];
}

export interface GeneratedFormProps {
  meta: FormMetaDescription;
  renderers: { [key: string]: typeof FieldRenderer };
  data: { [key:string]: any };
  errors: { [key:string]: any };
  validator(valdiate: any, schema: any): void;
  onChange(data: any, errors: any): void;
}

export class GeneratedForm extends React.Component<GeneratedFormProps, {}> {
  render() {
    const fields: JSX.Element[] = [];
    const { meta, data, errors, renderers, children } = this.props;

    for (let { id, renderer } of meta.fields) {
      const Renderer: typeof FieldRenderer = renderers[renderer]

      fields.push(
        <Renderer
          key={id}
          id={id}
          data={data[id]}
          errors={errors[id]}
          onChange={event => {
            this.onChange(id, event);
          }}
        >
          {id}
        </Renderer>
      );
    }

    return <div>{fields}</div>;
  }

  onChange(id: string, event: any): void {}
}
