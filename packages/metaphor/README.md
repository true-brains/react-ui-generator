# Metaphor

DSL for easing baking of metadata for the react-ui-generator.

## Example

```js
import Metaphor from '@react-ui-generator/metaphor';
import BaseMeta from './meta.json';

const formToView = new Metaphor(BaseMeta)
  .showAll()
  .disableAll()
  .value();

const formToEdit = new Metaphor(BaseMeta)
  .enableAll()
  .disable(['id', 'createdAt', 'author'])
  .config
    .set('email', { showAsterix: true })
    .set(['birthDate', 'employmentDate'], {
      showAsterix: true,
      format: 'DD.MM.YYYY',
    })
    .up()
  .actions
    .set(['btnSave'], { onClick: 'sendFormToServer' })
    .set('btnCancel', { onClick: isFormChanged() ? 'confirmEditCancellation' : 'closeForm' })
    .up()
  .hide(calcSecretFieldsByUserRole(), true)
  .value();
```
