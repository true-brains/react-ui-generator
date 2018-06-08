import React, { ReactNode, ReactInstance, ReactElement } from 'react';
import get from 'lodash.get';
import set from 'lodash.set';

export { get, set };

import { Field } from './components/Field';
import { Fields } from './components/Fields';

import {
  RawMetaDescription,
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

export function enhanceFormMeta(meta: RawMetaDescription): FormMetaDescription {
  const result: FormMetaDescription = {
    fields: []
  };

  for (let field of meta.fields) {
    result.fields.push(enhanceFieldMeta(field));
  }

  return result;
}

export function enhanceFieldMeta(meta: RawFieldMetaDescription): FieldMetaDescription {
  return {
    id: meta.id,
    renderer: computeFieldRenderer(meta),
    serializer: meta.serializer || meta.id,
    actions: meta.actions ? { ...meta.actions } : {},
    hidden: meta.hidden || false,
    disabled: meta.disabled || false
  };
}

function computeFieldRenderer(meta: RawFieldMetaDescription) {
  const _renderer = { type: 'text', config: {} };

  if (meta.renderer && typeof meta.renderer === 'object') {
    return { ...meta.renderer };
  } else if (typeof meta.renderer === 'string') {
    _renderer.type = meta.renderer;
  }

  return _renderer;
}

export function extractFieldActions(formActions: KeyValue, fieldActions: KeyValue) {
  let actions: KeyValue = {};

  for (let callbackName of Object.keys(fieldActions)) {
    const actionName = fieldActions[callbackName];
    const fn = formActions[actionName];

    if (fn) {
      actions[callbackName] = fn;
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

  const resultData = { ...data };

  for (let fieldMeta of fieldsMeta) {
    const { id, renderer: { type } } = fieldMeta;
    const dataValue = data[id];
    let defaultValue;

    if (dataValue === undefined) {
      defaultValue = _defaults[type];

      if (defaultValue !== undefined) {
        const value =
          type === 'list'
            ? [withDefaults({}, fieldMeta.renderer.config.fields)] // and what about "form"?
            : defaultValue;

        resultData[id] = { value, isDirty: false };
      }
    }
  }

  return resultData;
}

export function findFieldIdx(fieldId: string, fields: JSX.Element[]) {
  return fields.findIndex(({ props }) => props.id === fieldId);
}

export function findFieldMetaById(
  fieldId: string,
  fieldsMeta: FieldMetaDescription[] = []
): FieldMetaDescription {
  return fieldsMeta.find(meta => meta.id === fieldId);
}
