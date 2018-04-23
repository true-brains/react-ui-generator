import { get, set } from 'lodash';
import { FormMetaDescription, KeyValue } from '@react-ui-generator/core';

export type Validator = (formValue: KeyValue) => KeyValue;

export function buildValidator(validatorFn: Function, schema: KeyValue): Validator {
  return (formValue: KeyValue): KeyValue => {
    const validationResult = validatorFn(schema, prepareValidatedData(formValue));
    const allFields: KeyValue = {};

    for (let fieldId of Object.keys(formValue)) {
      allFields[fieldId] = validationResult.errors[fieldId] || [];
    }

    return { ...validationResult, errors: allFields };
  };
}

function prepareValidatedData(formValue: KeyValue): KeyValue {
    let validated: KeyValue = {};

    for (let fieldId of Object.keys(formValue)) {
      let value = formValue[fieldId].value;
      
      if (Array.isArray(value)) {
        value = value.map(prepareValidatedData);
      } else if (value && (typeof value === 'object')) {
        value = prepareValidatedData(value);
      }

      validated[fieldId] = value;
    }

    return validated;
}

