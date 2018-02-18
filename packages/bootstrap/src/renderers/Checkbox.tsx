import * as React from 'react';
import makeClass from 'classnames';
import { ChangeEvent } from 'react';
import { Input } from 'reactstrap';
import { FieldProps } from '@react-ui-generator/core';
import { ValidatableField } from './ValidatableField';

export interface CheckboxProps extends FieldProps {}

export class Checkbox extends React.PureComponent<CheckboxProps, {}> {
  handleChange(event: ChangeEvent<HTMLInputElement>): void {
    this.props.onChange(event.target.checked);
  }

  render() {
    const { id, data, className, onChange, config, disabled, errors } = this.props;
    const value: boolean = (typeof data.value === "string") ? data.value !== '' : data.value;

    return (
      <ValidatableField errors={errors} isDirty={data.isDirty}>
        <Input
          id={id}
          type="checkbox"
          className={className || ''}
          onChange={event => {
            this.handleChange(event);
          }}
          disabled={disabled}
          checked={value}
        />
      </ValidatableField>
    );
  }
}
