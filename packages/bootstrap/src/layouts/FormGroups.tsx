import * as React from 'react';
import makeClass from 'classnames';
import { FieldRendererProps } from '@react-ui-generator/core';

export interface FormGroupsProps {
  className?: string;
}

interface ChildNodeProps extends FieldRendererProps {
  className: string;
}
type ChildNode = React.ReactElement<ChildNodeProps>;

export class FormGroups extends React.PureComponent<FormGroupsProps, {}> {
  render() {
    const { children } = this.props;

    return React.Children.map(children, (child: ChildNode, idx) => {
      const { id, config } = child.props;
      const label =
        config.label || (id.length ? id.charAt(0).toUpperCase() + id.slice(1) : '');

      return (
        <div className="form-group" key={`form-group-${idx}`}>
          <label htmlFor={id}>{label}</label>
          {React.cloneElement(child, {
            className: 'form-control'
          })}
        </div>
      );
    });
  }
}

export default FormGroups;
