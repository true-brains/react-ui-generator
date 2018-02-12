import * as React from 'react';
import makeClass from 'classnames';
import { FormGroup, Label } from 'reactstrap';
import { FieldRendererProps, FieldRenderer } from '@react-ui-generator/core';
import Renderers from '../renderers';

export interface FormGroupsProps {
  className?: string;
}

interface ChildNodeProps extends FieldRendererProps {
  className: string;
}
type ChildNode = React.ReactElement<ChildNodeProps>;

export class FormGroups extends React.PureComponent<FormGroupsProps, {}> {
  render() {
    const { children, className } = this.props;

    return React.Children.map(children, (child: ChildNode, idx) => {
      const { id, config } = child.props;
      const isCheckbox = child.type.toString() === Renderers.checkbox.toString();
      const isRadiogroup = child.type.toString() === Renderers.radiogroup.toString();

      const label =
        config.label || (id.length ? id.charAt(0).toUpperCase() + id.slice(1) : '');

      return (
        <FormGroup
          key={`form-group-${idx}`}
          check={isCheckbox}
          tag={isRadiogroup ? 'fieldset' : undefined}
          className={className || ''}
        >
          {isCheckbox ? (
            <Label check>{child} {label}</Label>
          ) : (
          isRadiogroup ? [
            <label key={`legend-for-${id}`}>{label}</label>,
            child
          ] : (
            React.cloneElement(child, { className: 'form-control' })
          ))}
        </FormGroup>
      );
    });
  }
}

export default FormGroups;
