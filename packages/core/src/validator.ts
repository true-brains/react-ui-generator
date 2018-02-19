import { get, set } from 'lodash';
import { FormMetaDescription, KeyValue } from './interfaces';
import { Key } from 'react';

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
      } else if (typeof value === 'object') {
        value = prepareValidatedData(value);
      }

      validated[fieldId] = value;
    }

    return validated;
}


export class Ajv {
  constructor(options: KeyValue) {}
}

export function buildAjvValidator(AjvFn: typeof Ajv, schema: KeyValue): Validator {
  function validateWithAjv(schema: KeyValue, data: KeyValue): KeyValue {
    const ajv: KeyValue = new AjvFn({ allErrors: true, $data: true });
    const validate = ajv.compile(schema);
    const isValid = validate(data);
    const errors = validate.errors || [];

    const processedErrors = errors.reduce((acc: KeyValue, item: KeyValue) => {
      const [fieldName, subFormIndex] = item.dataPath
        .replace(/^\./, '')
        .split('[')
        .map((item: string) => item.replace(']', ''));

      const fieldErrors = acc[fieldName] || [];
      const message = (item.keyword === 'enum' && item.params.allowedValues)
        ? `${item.message}: [${item.params.allowedValues}]`
        : item.message;

      if (subFormIndex) {
        const [ idx, ...path ] = subFormIndex.split('.');
        const subFormErrObj = fieldErrors[idx] || {};
        const subFormErrors = get(subFormErrObj, path, []);

        fieldErrors[idx] = set(subFormErrObj, path, [...subFormErrors, message])
        acc[fieldName] = fieldErrors;
      } else {
        acc[fieldName] = [...fieldErrors, message];
      }

      return acc;
    }, {});

    return { isValid, errors: processedErrors };
  }

  return buildValidator(validateWithAjv, schema);
}
