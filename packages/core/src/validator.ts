import { KeyValue } from './interfaces';
import { get } from './utils';

export interface ExternalValidator {
  (schema: KeyValue, data: KeyValue): KeyValue;
}

export interface Validator {
  (formValue: KeyValue): KeyValue;
}

interface ValidationResult {
  errors: { [key: string]: string[] };
}

export interface FieldValue {
  value: any;
}

export interface FormValue {
  [key: string]: FieldValue;
}

export function buildValidator(
  validatorFn: ExternalValidator,
  schema: KeyValue
): Validator {
  return (formValue: KeyValue): ValidationResult => {
    const dataToValidate = prepareValidatedData(formValue);
    const validationResult = validatorFn(schema, dataToValidate);
    const errorsByFields: KeyValue = {};

    for (let fieldId of Object.keys(dataToValidate)) {
      errorsByFields[fieldId] = get(validationResult, ['errors', fieldId]) || [];
    }

    return { ...validationResult, errors: errorsByFields };
  };
}

function prepareValidatedData(formValue: FormValue): KeyValue {
  let dataToValidate: KeyValue = {};

  for (let fieldId of Object.keys(formValue)) {
    const fieldValue: FieldValue = formValue[fieldId];
    if (!fieldValue || !fieldValue.hasOwnProperty('value')) continue;

    let { value } = fieldValue;

    if (Array.isArray(value)) {
      value = value.map(prepareValidatedData);
    } else if (value && typeof value === 'object') {
      value = prepareValidatedData(value);
    }

    dataToValidate[fieldId] = value;
  }

  return dataToValidate;
}
