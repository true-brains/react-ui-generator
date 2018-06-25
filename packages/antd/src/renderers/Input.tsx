import * as React from 'react';
import { ChangeEvent } from 'react';
import Input from 'antd/lib/input';
import { FieldProps, PropTypes, basePropTypes } from '@react-ui-generator/core';

import { FieldWrapper } from './FieldWrapper';

export interface InputProps extends FieldProps {
  type?: string;
}

const value: string = '';

export class _Input extends React.PureComponent<InputProps, {}> {
  static propTypes = {
    ...basePropTypes(),
    type: PropTypes.string,
    config: PropTypes.shape({
      label: PropTypes.string,
      placeholder: PropTypes.string
    })
  };

  static defaultProps = {
    type: 'text',
    className: '',
    disabled: false,
    config: {
      label: '',
      placeholder: ''
    },
    data: {
      value,
      isDirty: false
    }
  };

  handleChange(event: ChangeEvent<HTMLInputElement>): void {
    this.props.onChange(event.target.value);
  }

  render() {
    const {
      type,
      id,
      data,
      className,
      onChange,
      config,
      disabled,
      errors,
      ...rest
    } = this.props;
    const value: string = String(data.value);

    return (
      <FieldWrapper errors={errors} isDirty={data.isDirty} label={config.label} {...rest}>
        <Input
          type={type}
          id={id}
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
