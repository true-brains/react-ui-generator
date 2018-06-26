import React from 'react';
import { connect } from 'react-redux';
import Ajv from 'ajv';
import { Form,  Row, Col } from 'antd';

import {
  GeneratedForm,
  Field,
  Fields,
} from '@react-ui-generator/core';

import { buildAjvValidator } from '@react-ui-generator/validators';
import { Renderers, Layouts } from '@react-ui-generator/antd';

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

const { FormLayout, FieldLayout } = Layouts;

class GeneratedFormExample extends React.PureComponent {
  render() {
    const { meta, data, errors, dirtiness, updateForm, ...actions } = this.props;

    return (
      <GeneratedForm
        className="form-demo"
        meta={meta}
        data={data}
        errors={errors}
        dirtiness={dirtiness}
        renderers={renderers}
        actions={actions}
        onChange={(data, errors, isValid, dirtiness) => updateForm({ data, errors, isValid, dirtiness })}
        validator={buildAjvValidator(Ajv, validationSchema)}
      >
        <div className="card border-dark mb-3">
          <div className="card-body">
            <FormLayout mode="horizontal">
              <FieldLayout labelCol={{ span: 8 }} wrapperCol={{ span: 12 }}>
                <Fields until="aboutMe" />
              </FieldLayout>

              <hr className="example-of-custom-layout" />

              <FieldLayout labelCol={{ span: 8 }} wrapperCol={{ span: 12 }}>
                <Field id="aboutMe" />
              </FieldLayout>

              <hr className="example-of-custom-layout" />

              <Field id="relatives">
                <Row>
                  <Col offset={8} span={12}>
                    <Fields until="btnRemoveRelative" />
                    <Field id="btnRemoveRelative" />
                  </Col>
                </Row>
              </Field>

              <FieldLayout wrapperCol={{ offset: 8, span: 12 }}>
                <Field id="btnAddRelative" />
              </FieldLayout>

              <FieldLayout labelCol={{ span: 8 }} wrapperCol={{ span: 12 }}>
                <Fields until="btnSend" />
              </FieldLayout>
            </FormLayout>
          </div>
        </div>

        <hr className="example-of-custom-layout" />

        <Row>
          <Col span={2}>
            <Field id="btnSend" />
          </Col>

          <Col span={2}>
            <Field id="btnClear" />
          </Col>
        </Row>
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
