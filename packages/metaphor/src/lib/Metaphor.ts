import cloneDeep from 'lodash.clonedeep';

import {
  RawMetaDescription,
  FormMetaDescription,
  enhanceFormMeta,
  findFieldMetaById,
  set,
  get,
} from '@react-ui-generator/core';

import { FieldPart } from '../';


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
    ids?: string[] | string
  ): Metaphor {
    const idsArray = (typeof ids === 'string') ? [ids] : ids;
    const fieldsToProcess: IdsToProcess = idsArray
      ? idsArray.reduce((acc, id) => ({ ...acc, [id]: true }), {})
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

  show(fieldsToShow?: string[] | string, hideNotMatched?: boolean): Metaphor {
    return this.togglePropByFieldIds('hidden', false, hideNotMatched, fieldsToShow);
  }

  showAll(): Metaphor {
    return this.show();
  }

  hide(fieldsToHide?: string[] | string, showNotMatched?: boolean): Metaphor {
    return this.togglePropByFieldIds('hidden', true, showNotMatched, fieldsToHide);
  }

  hideAll(): Metaphor {
    return this.hide();
  }

  enable(fieldsToEnable?: string[] | string, disableNotMatched?: boolean): Metaphor {
    return this.togglePropByFieldIds('disabled', false, disableNotMatched, fieldsToEnable);
  }

  enableAll(): Metaphor {
    return this.enable();
  }

  disable(fieldsToDisable?: string[] | string, enableNotMatched?: boolean): Metaphor {
    return this.togglePropByFieldIds('disabled', true, enableNotMatched, fieldsToDisable);
  }

  disableAll(): Metaphor {
    return this.disable();
  }

  get config(): FieldPart {
    return new FieldPart(this, 'renderer.config');
  }

  get actions(): FieldPart {
    return new FieldPart(this, 'actions');
  }
}

export default Metaphor;
