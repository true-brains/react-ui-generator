import * as React from 'react';
import makeClass from 'classnames';
import { ChangeEvent } from 'react';
import Input from 'antd/lib/input';
import { FieldProps } from '@react-ui-generator/core';
import { FieldWrapper } from './FieldWrapper';

export interface TextProps extends FieldProps {}

export class Text extends React.PureComponent<TextProps, {}> {
  handleChange(event: ChangeEvent<HTMLInputElement>): void {
    this.props.onChange(event.target.value);
  }

  render() {
    const { id, data, className, onChange, config, disabled, errors, ...rest } = this.props;
    const value: string = String(data.value);

    return (
      <FieldWrapper errors={errors} isDirty={data.isDirty} label={config.label} {...rest}>
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
      </FieldWrapper>
    );
  }
}
