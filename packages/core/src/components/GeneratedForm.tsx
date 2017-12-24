import * as React from 'react';
import { FormMetaDescription, FieldRenderer } from '../interfaces';
import { Field } from './Field';
import { FieldsRest } from './FieldsRest';

export interface GeneratedFormProps {
  meta: FormMetaDescription;
  renderers: { [key: string]: typeof FieldRenderer };
  data: { [key: string]: any };
  errors: { [key: string]: any };
  validator(valdiate: any, schema: any): void;
  onChange(data: any, errors: any): void;
}

export class GeneratedForm extends React.Component<GeneratedFormProps, {}> {
  render() {
    const fields: JSX.Element[] = [];
    const { meta, data, errors, renderers, children } = this.props;

    for (let { id, renderer } of meta.fields) {
      const Renderer: typeof FieldRenderer = renderers[renderer];

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

    return <div className="generated-form">{layout(children, fields)}</div>;
  }

  onChange(id: string, event: any): void {}
}

interface NodeWithIdProps {
  children: string | JSX.Element
  id?: string
}
type NodeWithId = React.ReactElement<NodeWithIdProps>;

function layout(children: React.ReactNode, fields: JSX.Element[]): React.ReactNode {
  return React.Children.map(children, (child: NodeWithId, index) => {
    if (child.type === Field) {
      const idx = findFieldIdx(fields, child.props.id);
      const [ field ] = fields.splice(idx, 1);
      return field;
    } else if (child.type === FieldsRest) {
      return fields;
    } else if (child.props && child.props.children) {
      return React.cloneElement(child, {
        children: layout(child.props.children, fields)
      });
    } else {
      return child;
    }
  });
}

function findFieldIdx(fields: JSX.Element[], id: string) {
  return fields.findIndex(({ props }) => props.id === id);
}
