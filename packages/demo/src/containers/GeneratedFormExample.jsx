import React from 'react';
import { connect } from 'react-redux';
import Ajv from 'ajv';
import { Form } from 'antd';

import {
  GeneratedForm,
  Field,
  Fields,
} from '@react-ui-generator/core';

import { buildAjvValidator } from '@react-ui-generator/validators';
import { Renderers } from '@react-ui-generator/antd';

import {
  toggleSex,
  updateForm,
  sendForm,
  clearForm,
  addRelative,
  removeRelative
} from '@actions';

import CloseButton from '../components/CloseButton';
import validationSchema from '../validation/jsonSchema.json';

/**
 * You can add custon renderers here.
 */
const renderers = {
  ...Renderers,
  closeButton: CloseButton,
};

class GeneratedFormExample extends React.PureComponent {
  render() {
    const { meta, data, errors, updateForm, ...actions } = this.props;

    return (
      <GeneratedForm
        className="form-demo"
        meta={meta}
        data={data}
        errors={errors}
        renderers={renderers}
        actions={actions}
        onChange={(data, errors, isValid) => updateForm({ data, errors, isValid })}
        validator={buildAjvValidator(Ajv, validationSchema)}
      >
        <div className="card border-dark mb-3">
          <div className="card-body">
          <Form>
              <Fields until="aboutMe" />

              <hr className="example-of-custom-layout" />

              <Field id="aboutMe" />

              <hr className="example-of-custom-layout" />

              <Field id="relatives" className="card--spaced">
                <div className="form-inline row">
                  <Fields until="btnRemoveRelative" />
                  <Field id="btnRemoveRelative" />
                </div>
              </Field>

              <Field id="btnAddRelative" />

              <hr className="example-of-custom-layout" />

              <Fields until="btnSend" />
          </Form>
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
    clearForm: () => dispatch(clearForm()),
    addRelative: () => dispatch(addRelative()),
    removeRelative: (...payload) => dispatch(removeRelative(...payload))
  })
)(GeneratedFormExample);
