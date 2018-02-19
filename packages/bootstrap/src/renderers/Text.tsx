import * as React from 'react';
import makeClass from 'classnames';
import { ChangeEvent } from 'react';
import { Input } from 'reactstrap';
import { FieldProps } from '@react-ui-generator/core';
import { ValidatableField } from './ValidatableField';

export interface TextProps extends FieldProps {}

export class Text extends React.PureComponent<TextProps, {}> {
  handleChange(event: ChangeEvent<HTMLInputElement>): void {
    this.props.onChange(event.target.value);
  }

  render() {
    const { id, data, className, onChange, config, disabled, errors } = this.props;
    const value: string = String(data.value);

    return (
      <ValidatableField errors={errors} isDirty={data.isDirty}>
        <Input
          id={id}
          type={config.isPassword ? 'password' : 'text'}
          className={className || ''}
          value={value}
          placeholder={config.placeholder || ''}
          onChange={event => {
            this.handleChange(event);
          }}
          disabled={disabled}
        />
      </ValidatableField>
    );
  }
}
