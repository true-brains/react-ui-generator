import * as React from 'react';
import Form from 'antd/lib/form';

const FormItem = Form.Item;

export interface FieldWrapperProps {
  errors: string[];
  isDirty: boolean;
  children: JSX.Element | JSX.Element[];
  labelOnly?: boolean;
  hasFeedback?: boolean;
  label?: string;
  labelCol?: any;
  wrapperCol?: any;
}

export class FieldWrapper extends React.PureComponent<FieldWrapperProps, {}> {
  render() {
    const { errors, isDirty, children, labelOnly, hasFeedback, ...rest } = this.props;
    const isValidated = Boolean(errors) && isDirty;
    const isValid = !isValidated || !errors.length;
    const errorComponents = (errors || []).map((err, idx) => (<div key={idx}>{err}</div>))

    return(
      <FormItem
        help={(isValidated && (errors || []).length) ? errorComponents : ''}
        validateStatus={isValidated ? (isValid ? 'success' : 'error') : null}
        hasFeedback={(hasFeedback !== undefined) ? hasFeedback : isValidated}
        {...rest}
      >
        {children}
      </FormItem>
    );
  }
}
