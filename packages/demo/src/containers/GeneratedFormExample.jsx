import React from 'react';
import { connect } from 'react-redux';

import { GeneratedForm, Field, Fields, FieldRenderer } from '@react-ui-generator/core';
import { Renderers, Layouts } from '@react-ui-generator/bootstrap';

import { sendForm, updateForm, clearForm } from '@actions'

/**
 * You can add custon renderers here.
 */
const renderers = {
  ...Renderers
};

const { FormGroup } = Layouts

class GeneratedFormExample extends React.PureComponent {
  render() {
    console.log('GeneratedFormExample props: ', this.props);
    const { meta, data, errors, updateForm, ...actions } = this.props;

    return (
      <GeneratedForm
        className="form"
        meta={meta}
        data={data}
        errors={errors}
        renderers={renderers}
        actions={actions}
        onChange={(nextData, nextErrors) => updateForm({ nextData, nextErrors })}
      >
        {/* <div className="my-custom-layout-for-email-field">
          <Field id="email" />
        </div> */}

        {/* One of predefined layouts for the rest of form's fields. */}
        <FormGroup className="rest-of-fields" fieldClassName="class-for-every-field">
          <Fields until="btnSend" />
        </FormGroup>

        <hr className="example-of-custom-layout"/>

        <Field id="btnSend" />
        <Field id="btnClear" />
      </GeneratedForm>
    );
  }
}

export default connect(
  state => state,
  dispatch => ({
    sendForm: () => dispatch(sendForm()),
    updateForm: payload => dispatch(updateForm(payload)),
    clearForm: () => dispatch(clearForm())
  })
)(GeneratedFormExample);
