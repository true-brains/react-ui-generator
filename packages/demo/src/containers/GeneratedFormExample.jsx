import React from 'react';
import { connect } from 'react-redux';

import { GeneratedForm, Field, Fields, FieldRenderer } from '@react-ui-generator/core';
import { Renderers, Layouts } from '@react-ui-generator/bootstrap';

import {
  toggleSex,
  updateForm,
  sendForm,
  clearForm
} from '@actions';

/**
 * You can add custon renderers here.
 */
const renderers = {
  ...Renderers
};

const { FormGroups } = Layouts;

class GeneratedFormExample extends React.PureComponent {
  render() {
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
        <div className="card border-dark mb-3">
          <div className="card-body">
            <FormGroups>
              <Fields until="answer" />
            </FormGroups>

            <hr className="example-of-custom-layout" />

            <Field id="relatives" />

            <hr className="example-of-custom-layout" />

            <FormGroups>
              <Fields until="btnSend" />
            </FormGroups>
          </div>
        </div>

        <hr className="example-of-custom-layout" />

        <div style={{ position: 'relative' }}>
          <Field id="btnSend" /> <Field id="btnClear" />
        </div>
      </GeneratedForm>
    );
  }
}

export default connect(
  state => state,
  dispatch => ({
    updateForm: payload => dispatch(updateForm(payload)),
    toggleSex: fieldId => dispatch(toggleSex(fieldId)),
    sendForm: () => dispatch(sendForm()),
    clearForm: () => dispatch(clearForm())
  })
)(GeneratedFormExample);
