import * as React from 'react';
import { ChangeEvent } from 'react';
import Select, { SelectValue } from 'antd/lib/select';

import {
  FieldProps,
  KeyValue,
  PropTypes,
  basePropTypes
} from '@react-ui-generator/core';

import { FieldWrapper } from './FieldWrapper';

const { Option } = Select;

export interface SelectProps extends FieldProps {}

export interface SelectState {
  valueTypes: KeyValue;
}

export interface SelectItemProps {
  id: string | number;
  title: string;
}

const value: string = '';
const options: SelectItemProps[] = [];

export class _Select extends React.PureComponent<SelectProps, SelectState> {
  static propTypes = {
    ...basePropTypes(),
    config: PropTypes.shape({
      label: PropTypes.string,
      title: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string
      }))
    }),
  }

  static defaultProps = {
    className: '',
    disabled: false,
    config: {
      label: '',
      title: '',
      options
    },
    data: {
      value,
      isDirty: false
    },
  }

  constructor(props: SelectProps) {
    super(props);
    this.state = { valueTypes: this.getValueTypes(props) };
  }

  componentWillReceiveProps(nextProps: SelectProps) {
    this.setState({ valueTypes: this.getValueTypes(nextProps) });
  }

  getValueTypes(props: SelectProps): KeyValue {
    return props.config.options.reduce(
      (acc: KeyValue, option: SelectItemProps) => ({
        ...acc,
        [option.id]: typeof option.id
      }),
      {}
    );
  }

  handleChange = (value: SelectValue): void => {
    this.props.onChange(value || '');
  };

  render() {
    const {
      id,
      actions: { onToggle },
      config: { title, options, label },
      data,
      disabled,
      className,
      onChange,
      errors,
      ...rest
    } = this.props;

    const value: string = String(data.value);

    return (
      <FieldWrapper errors={errors} isDirty={data.isDirty} label={label} {...rest}>
        <Select onChange={this.handleChange} value={value} allowClear disabled={disabled}>
          <Option value={''} disabled>
            {title}
          </Option>
          {options.map((item: SelectItemProps) => {
            const { id, title } = item;
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
