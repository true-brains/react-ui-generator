import * as React from 'react';
import { ChangeEvent } from 'react';
import Select, { SelectValue } from 'antd/lib/select';
import { FieldProps, KeyValue, PropTypes, basePropTypes } from '@react-ui-generator/core';

import { FieldWrapper } from './FieldWrapper';

const { Option } = Select;

export interface SelectProps extends FieldProps {}

export interface SelectItemProps {
  id: string | number;
  title: string;
}

const value: SelectValue = undefined;
const options: SelectItemProps[] = [];

export class _Select extends React.PureComponent<SelectProps> {
  static propTypes = {
    ...basePropTypes(),
    config: PropTypes.shape({
      label: PropTypes.string,
      placeholder: PropTypes.string,
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
    config: {
      label: '',
      placeholder: '',
      options
    },
    data: {
      value,
      isDirty: false
    }
  };

  handleChange = (value: SelectValue): void => {
    this.props.onChange(value);
  };

  render() {
    const {
      id,
      actions: { onToggle },
      config: { placeholder, title, options, label, allowClear },
      data,
      disabled,
      className,
      onChange,
      errors,
      ...rest
    } = this.props;

    let value: SelectValue;

    if (typeof data.value === 'boolean') {
      value = Number(value);
    } else if (data.value === null) {
      value = undefined;
    } else {
      value = data.value;
    }

    console.log('config.placeholder: ', placeholder);

    return (
      <FieldWrapper errors={errors} isDirty={data.isDirty} label={label} {...rest}>
        <Select
          onChange={this.handleChange}
          value={value}
          allowClear={allowClear}
          disabled={disabled}
          placeholder={placeholder || title || ''}
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
