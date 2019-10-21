import * as React from 'react';
import Select, { SelectValue } from 'antd/lib/select';
import PropTypes from 'prop-types'
import {
  FieldRenderer,
  basePropTypes
} from '@react-ui-generator/core';

import { FieldWrapper } from './FieldWrapper';

const { Option } = Select;

export type MultipleSelectValue = string[] | number[];

export interface SelectItemProps {
  id: string | number;
  title: string;
}

const value: SelectValue = undefined;
const options: SelectItemProps[] = [];

export class MultipleSelect extends FieldRenderer {
  static propTypes = {
    ...basePropTypes(),
    config: PropTypes.shape({
      label: PropTypes.string,
      placeholder: PropTypes.string,
      showAsterix: PropTypes.bool,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          title: PropTypes.string
        })
      )
    })
  };

  static defaultProps = {
    className: '',
    disabled: false,
    dirty: false,
    config: {
      label: '',
      placeholder: '',
      showAsterix: false,
      options
    },
    data: value,
  };

  handleChange = (value: MultipleSelectValue): void => {
    this.props.onChange(value);
  };

  render() {
    const {
      id,
      config: { label, placeholder, showAsterix, options, allowClear },
      data,
      disabled,
      className,
      onChange,
      ...rest
    } = this.props;

    let value: SelectValue;
    
    if (typeof data === 'boolean') {
      value = Number(data);
    } else if (Array.isArray(data) && (data.length === 0)) {
      value = undefined;
    } else {
      value = data;
    }

    return (
      <FieldWrapper label={label} showAsterix={showAsterix} {...rest}>
        <Select
          mode='multiple'
          onChange={this.handleChange}
          value={value}
          allowClear={allowClear}
          disabled={disabled}
          placeholder={placeholder}
        >
          {options.map(({ id, title }: SelectItemProps) => {
            return (
              <Option key={id} value={id}>
                {title}
              </Option>
            );
          })}
        </Select>
      </FieldWrapper>
    );
  }
}
