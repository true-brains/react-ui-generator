import cloneDeep from 'lodash.clonedeep';

import {
  RawMetaDescription,
  FormMetaDescription,
  enhanceFormMeta,
  findFieldMetaById,
  set,
  get,
} from '@react-ui-generator/core';

import { Config, Actions } from '../';


export interface IdsToProcess {
  [key: string]: boolean
}

export type FieldBooleanProps = 'hidden' | 'disabled';

class Metaphor {
  private meta: FormMetaDescription;

  constructor(baseMeta: RawMetaDescription) {
    this.meta = enhanceFormMeta(baseMeta);
  }

  togglePropByFieldIds(
    propName: FieldBooleanProps,
    value: boolean,
    reverseIfNotMatch?: boolean,
    ids?: string[]
  ): Metaphor {
    const fieldsToProcess: IdsToProcess = ids
      ? ids.reduce((acc, id) => ({ ...acc, [id]: true }), {})
      : {};

    for (let fieldMeta of this.meta.fields) {
      const fieldId = fieldMeta.id;

      if ((ids === undefined) || fieldsToProcess[fieldId]) {
        fieldMeta[propName] = value;
      } else if (reverseIfNotMatch) {
        fieldMeta[propName] = !value;
      }
    }

    return this;
  }

  value(): FormMetaDescription {
    return cloneDeep(this.meta);
  }

  get(path: string) {
    const [fieldId, ...tokens] = path.split('.');
    const fieldMeta = findFieldMetaById(fieldId, this.meta.fields);
    return get(fieldMeta, tokens);
  }

  set(path: string, value: any) {
    const [fieldId, ...tokens] = path.split('.');
    const fieldMeta = findFieldMetaById(fieldId, this.meta.fields);
    set(fieldMeta, tokens, value);

    return this;
  }

  show(fieldsToShow?: string[], hideNotMatched?: boolean): Metaphor {
    return this.togglePropByFieldIds('hidden', false, hideNotMatched, fieldsToShow);
  }

  showAll(): Metaphor {
    return this.show();
  }

  hide(fieldsToHide?: string[], showNotMatched?: boolean): Metaphor {
    return this.togglePropByFieldIds('hidden', true, showNotMatched, fieldsToHide);
  }

  hideAll(): Metaphor {
    return this.hide();
  }

  enable(fieldsToEnable?: string[], disableNotMatched?: boolean): Metaphor {
    return this.togglePropByFieldIds('disabled', false, disableNotMatched, fieldsToEnable);
  }

  enableAll(): Metaphor {
    return this.enable();
  }

  disable(fieldsToDisable?: string[], enableNotMatched?: boolean): Metaphor {
    return this.togglePropByFieldIds('disabled', false, enableNotMatched, fieldsToDisable);
  }

  disableAll(): Metaphor {
    return this.disable();
  }

  get config(): Config {
    return new Config(this);
  }

  get actions(): Actions {
    return new Actions(this);
  }
}

export default Metaphor;
