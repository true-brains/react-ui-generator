import React from "react";
import { GeneratedForm, Field } from "react-ui-generator/core";
import { DivsLayout } from "react-ui-generator/layouts";
import { validator, embedded } from "react-ui-generator/validators";
import ajv from "ajv";

import formMeta from "../meta/complete";
import embeddedSchema from "../validation/embedded-validator";

class GneratedFormExample extends React.PureComponent {
  render() {
    const { data, errors, onChange } = this.props;

    return (
      <GeneratedForm
        meta={formMeta}
        data={data}
        errors={errors}
        validator={validator(embedded, embeddedSchema)}
        onChange={(nextData, nextErrors) => onChange({ nextData, nextErrors })}
      >
        <div className="my-custom-layout-for-email-field">
          <Field id="email" />
        </div>

        {/* One of predefined layouts for the rest of form's fields */}
        <DivsLayout
          blockClassName="block-with-rest-of-fields"
          fieldClassName="class-for-every-fieldin-block"
        />
      </GeneratedForm>
    );
  }
}
