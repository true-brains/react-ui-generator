import React from 'react'
import { GeneratedForm, Field, FieldRenderer } from '@react-ui-generator/core';
// import { DivsLayout } from "react-ui-generator/layouts";
// import { validator, embedded } from "react-ui-generator/validators";
// import ajv from 'ajv';

import formMeta from '../meta/complete';
// import embeddedSchema from "../validation/embedded/embedded.json";

class Text extends FieldRenderer {
  render() {
    return (<div>This is "{this.props.id}" field</div>)
  }
}

const renderers = {
  'text': Text
}



export class GeneratedFormExample extends React.PureComponent {
  render() {
    const { data={}, errors={}, onChange=(function () {}) } = this.props;

    return (
      <GeneratedForm
        meta={formMeta}
        data={data}
        errors={errors}
        renderers={renderers}
        // validator={validator(embedded, embeddedSchema)}
        onChange={(nextData, nextErrors) => onChange({ nextData, nextErrors })}
      >
        <div className="my-custom-layout-for-email-field">
          <Field id="email" />
        </div>

        {/* One of predefined layouts for the rest of form's fields */}
        {/* <DivsLayout
          blockClassName="block-with-rest-of-fields"
          fieldClassName="class-for-every-field-in-block"
        /> */}
        <div>test</div>
      </GeneratedForm>
    );
  }
}
