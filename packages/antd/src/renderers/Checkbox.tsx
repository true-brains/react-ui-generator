import * as React from 'react';
import makeClass from 'classnames';
import { ChangeEvent } from 'react';
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { FieldProps } from '@react-ui-generator/core';
import { ValidatableField } from './ValidatableField';

export interface CheckboxProps extends FieldProps {}

export class _Checkbox extends React.PureComponent<CheckboxProps, {}> {
  handleChange = (event: CheckboxChangeEvent): void => {
    this.props.onChange(event.target.checked);
  }

  render() {
    const { id, data, className, onChange, config, disabled, errors } = this.props;
    const value: boolean = (typeof data.value === "string") ? data.value !== '' : data.value;
    const label =
      config.label || (id.length ? id.charAt(0).toUpperCase() + id.slice(1) : '');

    return (
      <ValidatableField
        errors={errors}
        isDirty={data.isDirty}
        hasFeedback={false}
      >
        <Checkbox
          className={className || ''}
          disabled={disabled}
          checked={value}
          onChange={this.handleChange}
        >
          {label}
        </Checkbox>
      </ValidatableField>
    );
  }
}
