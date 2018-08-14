import * as React from 'react';
import { ChangeEvent } from 'react';
import Input from 'antd/lib/input';

import {
  FieldRendererProps,
  FieldRenderer,
  PropTypes,
  basePropTypes
} from '@react-ui-generator/core';

import { FieldWrapper } from './FieldWrapper';

export interface InputProps extends FieldRendererProps {
  type?: string;
}

const value: string = '';

export class _Input extends FieldRenderer<InputProps> {
  static propTypes = {
    ...basePropTypes(),
    type: PropTypes.string,
    config: PropTypes.shape({
      label: PropTypes.string,
      placeholder: PropTypes.string,
      showAsterix: PropTypes.bool
    })
  };

  static defaultProps = {
    type: 'text',
    className: '',
    disabled: false,
    dirty: false,
    config: {
      label: '',
      placeholder: '',
      showAsterix: false
    },
    data: value
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
      config: { label, showAsterix, placeholder },
      disabled,
      ...rest
    } = this.props;
    const value: string = String(data);

    return (
      <FieldWrapper label={label} showAsterix={showAsterix} {...rest}>
        <Input
          type={type}
          id={id}
          className={className || ''}
          value={value}
          placeholder={placeholder || ''}
          onChange={event => {
            this.handleChange(event);
          }}
          disabled={disabled}
        />
      </FieldWrapper>
    );
  }
}
