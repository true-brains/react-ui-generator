import * as React from 'react';
import { ChangeEvent } from 'react';
import Input from 'antd/lib/input';

import {
  FieldProps,
  PropTypes,
  basePropTypes
} from '@react-ui-generator/core';

import { FieldWrapper } from './FieldWrapper';

export interface TextProps extends FieldProps {}

const value: string = '';

export class Text extends React.PureComponent<TextProps, {}> {
  static propTypes = {
    ...basePropTypes(),
    config: PropTypes.shape({
      label: PropTypes.string,
      placeholder: PropTypes.string,
    }),
  }

  static defaultProps = {
    className: '',
    disabled: false,
    config: {
      label: '',
      placeholder: '',
    },
    data: {
      value,
      isDirty: false
    },
  }

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
