import { get, set } from './utils';
import { FormMetaDescription, KeyValue } from './interfaces';

export function serializeToObject(formData: KeyValue): KeyValue {
  const serialized: KeyValue = {}

  for (let fieldId of Object.keys(formData)) {
    const fieldData = formData[fieldId]
    const value = fieldData.value;

    if (Array.isArray(value)) {
      serialized[fieldId] = value.map(serializeToObject);
    } else if (value && (typeof value === 'object')) {
      serialized[fieldId] = serializeToObject(value);
    } else {
      serialized[fieldId] = value;
    }
  }

  return serialized;
}

export function serializeToObject2(formMeta: FormMetaDescription, formData: KeyValue): KeyValue {
  const serialized: KeyValue = {}

  for (let { id} of formMeta.fields) {
    // const fieldData = formData[fieldId]
    // const value = fieldData.value;

    // if (Array.isArray(value)) {
    //   serialized[fieldId] = value.map(serializeToObject);
    // } else if (value && (typeof value === 'object')) {
    //   serialized[fieldId] = serializeToObject(value);
    // } else {
    //   serialized[fieldId] = value;
    // }
  }

  return serialized;
}
