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
      placeholder: PropTypes.string
    })
  };

  static defaultProps = {
    type: 'text',
    className: '',
    disabled: false,
    dirty: false,
    config: {
      label: '',
      placeholder: ''
    },
    data: value
  };

  handleChange(event: ChangeEvent<HTMLInputElement>): void {
    this.props.onChange(event.target.value);
  }

  render() {
    const { type, id, data, className, onChange, config, disabled, ...rest } = this.props;
    const value: string = String(data);

    return (
      <FieldWrapper label={config.label} {...rest}>
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
