import { KeyValue, serializeToObject, get, set } from '@react-ui-generator/core';

export function buildJSONSerializer() {
  return function(formData: KeyValue): string {
    return JSON.stringify(serializeToObject(formData));
  }
}
