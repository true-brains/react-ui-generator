import merge from 'lodash.merge';
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

      merge(fieldPart, newPart); // mutates`fieldPart`
    }

    return this;
  }

  up() {
    return this.form;
  }
}

export default FieldPartGateway;
