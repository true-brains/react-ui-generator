import merge from 'lodash.merge';
import cloneDeep from 'lodash.clonedeep';
import { Metaphor } from '../';

export interface FieldPart {
  [key: string]: any
}

class FieldPartGateway {
  private form: Metaphor;
  private path: string;

  constructor(form: Metaphor, path: string) {
    this.form = form;
    this.path = path;
  }

  set(fieldIds: string[] | string, newPart: FieldPart) {
    const idsToProcess = Array.isArray(fieldIds) ? fieldIds : [fieldIds];
    
    for (let fieldId of idsToProcess) {
      const path = `${fieldId}.${this.path}`;
      const fieldPart = this.form.get(path);
      const newFieldPart = cloneDeep(fieldPart);

      merge(newFieldPart, newPart);
      this.form.set(path, newFieldPart);
    }

    return this;
  }

  up() {
    return this.form;
  }
}

export default FieldPartGateway;
