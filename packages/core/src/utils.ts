import * as React from 'react';
import { Field } from './components/Field';
import { FieldsRest } from './components/FieldsRest';

import {
  FormMetaDescription,
  RawFieldMetaDescription,
  FieldMetaDescription
} from './interfaces';

interface NodeWithIdProps {
  children: string | JSX.Element;
  id?: string;
}
type NodeWithId = React.ReactElement<NodeWithIdProps>;

export function layout(
  children: React.ReactNode,
  fields: JSX.Element[]
): React.ReactNode {
  return React.Children.map(children, (child: NodeWithId, index) => {
    if (child.type === Field) {
      const idx = findFieldIdx(fields, child.props.id);
      const [field] = fields.splice(idx, 1);
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

export function findFieldIdx(fields: JSX.Element[], id: string) {
  return fields.findIndex(({ props }) => props.id === id);
}

export function enhanceFormMeta(meta: any): FormMetaDescription {
  const result: FormMetaDescription = {
    fields: []
  };

  for (let field of meta.fields) {
    result.fields.push(enhanceFieldMeta(field));
  }

  return result;
}

export function enhanceFieldMeta(meta: RawFieldMetaDescription): FieldMetaDescription {
  const _result: FieldMetaDescription = {
    id: meta.id,
    renderer: {
      type: '',
      config: {}
    },
    accessor: meta.accessor || meta.id,
    serializer: meta.serializer || meta.id,
    actions: meta.actions || {}
  };

  if (typeof meta.renderer === 'string') {
    _result.renderer.type = meta.renderer;
  } else {
    _result.renderer = meta.renderer;
  }

  return _result;
}

export function extractFieldActions(
  formActions: { [key: string]: any },
  fieldActions: { [key: string]: any }
) {
  let actions: { [key: string]: any } = {};

  for (let handler in fieldActions) {
    const action = fieldActions[handler];
    const fn = formActions[action];

    if (fn) {
      actions[handler] = fn;
    }
  }

  return actions;
}
