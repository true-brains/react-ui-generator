import * as React from 'react';
import { ChangeEvent } from 'react';
import { Input, Label } from 'reactstrap';
import { FieldRenderer } from '@react-ui-generator/core';
import { ValidatableField } from './ValidatableField';

export class Checkbox extends FieldRenderer {
  handleChange(event: ChangeEvent<HTMLInputElement>): void {
    this.props.onChange(event.target.checked);
  }

  render() {
    const { id, data, className, onChange, config, disabled, errors } = this.props;
    const value: boolean = Boolean(data);
    const label =
      config.label || (id.length ? id.charAt(0).toUpperCase() + id.slice(1) : '');

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

        <Label key={`label-for-${id}`} htmlFor={id} check>{label}</Label>
      </ValidatableField>
    );
  }
}
