import * as React from 'react';
import { ChangeEvent } from 'react';
import makeClass from 'classnames';
import Select, { SelectValue } from 'antd/lib/select';
import { FieldProps, KeyValue } from '@react-ui-generator/core';
import { ValidatableField } from './ValidatableField';

const { Option } = Select;

export interface SelectProps extends FieldProps {
  title: string;
  caret?: boolean;
  isOpen?: boolean;
}

export interface SelectState {
  valueTypes: KeyValue
}

interface SelectItemProps {
  id: any;
  title: string;
}

export class _Select extends React.PureComponent<SelectProps, SelectState> {
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
  }

  render() {
    const {
      id,
      actions: { onToggle },
      config: { title, options },
      data,
      disabled,
      className,
      onChange,
      errors
    } = this.props;

    const value: string = String(data.value);

    return (
      <ValidatableField errors={errors} isDirty={data.isDirty}>
        <Select
          onChange={this.handleChange}
          value={value}
          allowClear
        >
          <Option value={''} disabled>{title}</Option>
          {options.map((item: SelectItemProps) => {
            const { id, title } = item;
            return (<Option key={id} value={id}>{title}</Option>);
          })}
        </Select>
      </ValidatableField>
    );
  }
}
