import * as React from 'react';
import Form from 'antd/lib/form';

const FormItem = Form.Item;

export interface FieldWrapperProps {
  errors: string[];
  dirty: boolean;
  children: JSX.Element | JSX.Element[];
  labelOnly?: boolean;
  hasFeedback?: boolean;
  showAsterix?: boolean;
  label?: string;
  labelCol?: any;
  wrapperCol?: any;
}

export class FieldWrapper extends React.PureComponent<FieldWrapperProps, {}> {
  render() {
    const { errors, dirty = false, children, labelOnly, hasFeedback, showAsterix, ...rest } = this.props;
    const isValidated = Array.isArray(errors) && dirty;
    const isValid = !isValidated || (errors.length === 0);
    const errorComponents = (errors || []).map((err, idx) => (<div className="field-error" key={idx}>{err}</div>))

    return(
      <FormItem
        help={isValidated ? errorComponents : ''}
        validateStatus={isValidated ? (isValid ? 'success' : 'error') : null}
        hasFeedback={(hasFeedback !== undefined) ? hasFeedback : isValidated}
        required={showAsterix}
        {...rest}
      >
        {children}
      </FormItem>
    );
  }
}
