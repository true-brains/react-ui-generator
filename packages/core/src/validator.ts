import { KeyValue } from './interfaces';

export interface ExternalValidator {
  (schema: KeyValue, data: KeyValue): ValidationResult;
}

export interface Validator {
  (formValue: KeyValue): ValidationResult;
}

interface ValidationResult {
  errors: { [key: string]: string[] };
  isValid: boolean;
}

export function buildValidator(
  validatorFn: ExternalValidator,
  schema: KeyValue
): Validator {
  return (formValue: KeyValue): ValidationResult => {
    const { errors, isValid } = validatorFn(schema, formValue);
    const errorsByFields: KeyValue = {};

    for (let fieldId of Object.keys(formValue)) {
      errorsByFields[fieldId] = errors[fieldId] || []; // empty array for valid fields
    }

    return { isValid, errors: errorsByFields };
  };
}

