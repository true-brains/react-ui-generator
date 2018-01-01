import React from 'react';

import {
  GeneratedForm,
  Field,
  FieldsRest,
  FieldRenderer
} from '@react-ui-generator/core';

import { DivsLayout } from '@react-ui-generator/layouts';
import * as BootstrapRenderers from '@react-ui-generator/renderers-bootstrap';
import formMeta from '../meta/complete';

class Text extends FieldRenderer {
  render() {
    return <div className="text-field">This is "{this.props.id}" field</div>;
  }
}

const renderers = {
  ...BootstrapRenderers,
  text: Text
};

export class GeneratedFormExample extends React.PureComponent {
  render() {
    const { data = {}, errors = {}, onChange = () => {} } = this.props;
    const actions = {
      sayHello() { alert('Hello, world!'); }
    }

    return (
      <GeneratedForm
        meta={formMeta}
        data={data}
        errors={errors}
        renderers={renderers}
        actions={actions}
        onChange={(nextData, nextErrors) => onChange({ nextData, nextErrors })}
      >
        <div className="my-custom-layout-for-email-field">
          <Field id="email" />
        </div>

        <div>-------------------- Example of custom layout --------------------</div>

        {/* One of predefined layouts for the rest of form's fields */}
        <DivsLayout className="rest-of-fields" fieldClassName="class-for-every-field">
          <FieldsRest />
        </DivsLayout>
      </GeneratedForm>
    );
  }
}

// import { validator, embedded } from "react-ui-generator/validators";
// import ajv from 'ajv';
// import embeddedSchema from "../validation/embedded/embedded.json";
// validator={validator(embedded, embeddedSchema)}
