import { KeyValue, Validator, buildValidator, get, set } from '@react-ui-generator/core';


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