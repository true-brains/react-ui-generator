import * as React from 'react';
import Form from 'antd/lib/form';
import { FieldRendererProps } from '@react-ui-generator/core';

export interface FieldLayoutProps {
  labelCol: any;
  wrapperCol: any;
}

export interface ChildNodeProps extends FieldRendererProps {
  labelCol: any;
  wrapperCol: any;
}

export type ChildNode = React.ReactElement<ChildNodeProps>;

const FormItem = Form.Item;

export class FieldLayout extends React.PureComponent<FieldLayoutProps, {}> {
  render() {
    const { labelCol, wrapperCol, children } = this.props;

    return React.Children.map(children, (child: ChildNode, idx) =>
      React.cloneElement(child, { labelCol, wrapperCol })
    );
  }
}
