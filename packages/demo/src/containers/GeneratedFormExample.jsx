import React from 'react';
import { connect } from 'react-redux';

import { GeneratedForm, Field, Fields, FieldRenderer } from '@react-ui-generator/core';
import { Renderers, Layouts } from '@react-ui-generator/bootstrap';

import {
  toggleSex,
  updateForm,
  sendForm,
  clearForm,
  addRelative
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
    console.log('==========================================')
    console.log('meta: ', meta);
    console.log('data: ', data);

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

            <div className="form-group">
              <Field id="relatives">
                <div className="form-inline">
                  <FormGroups className="mb-2 mr-sm-2 mb-sm-0">
                    <Fields />
                  </FormGroups>
                </div>
              </Field>
            </div>

            <FormGroups>
              <Field id="btnAddRelative" />
            </FormGroups>

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
    clearForm: () => dispatch(clearForm()),
    addRelative: () => dispatch(addRelative())
  })
)(GeneratedFormExample);
