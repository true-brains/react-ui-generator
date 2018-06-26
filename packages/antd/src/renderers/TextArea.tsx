import * as React from 'react';
import { ChangeEvent } from 'react';
import Input from 'antd/lib/input';
import { FieldRenderer, PropTypes, basePropTypes } from '@react-ui-generator/core';

import { FieldWrapper } from './FieldWrapper';

const { TextArea } = Input;


const value: string = '';

export class _TextArea extends FieldRenderer {
  static propTypes = {
    ...basePropTypes(),
    config: PropTypes.shape({
      label: PropTypes.string,
      placeholder: PropTypes.string
    })
  };

  static defaultProps = {
    className: '',
    disabled: false,
    dirty: false,
    config: {
      label: '',
      placeholder: ''
    },
    data: value
  };

  handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    this.props.onChange(event.target.value);
  };

  render() {
    const { id, data, className, onChange, config, disabled, ...rest } = this.props;
    const value: string = String(data);

    return (
      <FieldWrapper label={config.label} {...rest}>
        <TextArea
          id={id}
          className={className || ''}
          value={value}
          placeholder={config.placeholder || ''}
          onChange={this.handleChange}
          disabled={disabled}
        />
      </FieldWrapper>
    );
  }
}
