import FieldPart from './FieldPart';
import { Metaphor } from '../';

class Config extends FieldPart {
  constructor(form: Metaphor) {
    super(form, 'config');
  }
}

export default Config;
