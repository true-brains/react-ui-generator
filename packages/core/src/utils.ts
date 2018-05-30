import React, { ReactNode, ReactInstance, ReactElement } from 'react';
import get from 'lodash.get';
import set from 'lodash.set';

export {
  get,
  set
};

import { Field } from './components/Field';
import { Fields } from './components/Fields';

import {
  FormMetaDescription,
  RawFieldMetaDescription,
  FieldMetaDescription,
  KeyValue
} from './interfaces';

interface NodeWithIdProps {
  children: React.ReactNode;
  id?: string;
  until?: string;
  className: string;
}
type NodeWithId = React.ReactElement<NodeWithIdProps>;

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
    serializer: meta.serializer || meta.id,
    actions: meta.actions || {},
    hidden: meta.hidden || false,
    disabled: meta.disabled || false
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

/**
 * Completes `data` object with default values for known types of renderers.
 * Default values for custom renderers can be provided with `defaults` argument.
 */
export function withDefaults(
  data: KeyValue = {},
  fieldsMeta: FieldMetaDescription[] = [],
  defaults: KeyValue = {}
): KeyValue {
  const _defaults: KeyValue = {
    form: {},
    list: [],

    checkbox: false,
    radiogroup: '',
    select: '',
    text: '',
    textarea: '',
    date: null,
    upload: null,

    ...defaults
  };

  for (let fieldMeta of fieldsMeta) {
    const { id, renderer: { type } } = enhanceFieldMeta(fieldMeta);
    const dataValue = data[id];
    let defaultValue;

    if (dataValue === undefined) {
      defaultValue = _defaults[type];

      if (defaultValue !== undefined) {
        const value =
          type === 'list'
            ? [withDefaults({}, fieldMeta.renderer.config.fields)]
            : defaultValue;

        data[id] = { value, isDirty: false };
      }
    }
  }

  return data;
}

export function getMetaById(
  fieldId: string,
  fieldsMeta: FieldMetaDescription[] = []
): FieldMetaDescription {
  return fieldsMeta.find(meta => meta.id === fieldId);
}

