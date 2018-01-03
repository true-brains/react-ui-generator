import React from 'react';
import { connect } from 'react-redux';

import { GeneratedForm, Field, Fields, FieldRenderer } from '@react-ui-generator/core';
import { DivsLayout } from '@react-ui-generator/layouts';
import * as BootstrapRenderers from '@react-ui-generator/renderers-bootstrap';

import { sendForm } from '@actions'

/**
 * You can add custon renderers here.
 */
const renderers = {
  ...BootstrapRenderers
};

class GeneratedFormExample extends React.PureComponent {
  render() {
    console.log('GeneratedFormExample props: ', this.props);
    const { meta, data, errors, onChange, ...actions } = this.props;

    return (
      <GeneratedForm
        className="form"
        meta={meta}
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

        {/* One of predefined layouts for the rest of form's fields. */}
        <DivsLayout className="rest-of-fields" fieldClassName="class-for-every-field">
          <Fields until="btnSend" />
        </DivsLayout>

        <Field id="btnSend" />
      </GeneratedForm>
    );
  }
}

export default connect(
  state => state,
  dispatch => ({
    sendForm: () => dispatch(sendForm())
  })
)(GeneratedFormExample);
