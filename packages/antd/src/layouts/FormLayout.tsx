import * as React from 'react';
import Form from 'antd/lib/form';
import { FieldRendererProps } from '@react-ui-generator/core';

export interface FormLayoutProps {
  mode?: 'horizontal' | 'inline' | 'vertical';
}

export class FormLayout extends React.PureComponent<FormLayoutProps, {}> {
  render() {
    const { mode='vertical', children } = this.props;

    return (
      <Form layout={mode}>
        {children}
      </Form>
    );
  }
}
