import { get, set } from 'lodash';
import { KeyValue, serializeToObject } from '@react-ui-generator/core';

export function buildJSONSerializer() {
  return function(formData: KeyValue): string {
    return JSON.stringify(serializeToObject(formData));
  }
}
