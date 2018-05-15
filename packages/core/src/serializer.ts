// import * as React from 'react';
import get from 'lodash.get';
import set from 'lodash.set';
import { FormMetaDescription, KeyValue } from './interfaces';

export function serializeToObject(formData: KeyValue): KeyValue {
  const serialized: KeyValue = {}

  for (let fieldId of Object.keys(formData)) {
    const fieldData = formData[fieldId]
    const value = fieldData.value;

    if (Array.isArray(value)) {
      serialized[fieldId] = value.map(serializeToObject);
    } else if (typeof value === 'object') {
      serialized[fieldId] = serializeToObject(value);
    } else {
      serialized[fieldId] = value;
    }
  }

  return serialized;
}

export function buildJSONSerializer() {
  return function(formData: KeyValue): string {
    return JSON.stringify(serializeToObject(formData));
  }
}
