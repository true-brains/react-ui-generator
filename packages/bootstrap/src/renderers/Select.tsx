import * as React from 'react';
import { ChangeEvent } from 'react';
import makeClass from 'classnames';
import { Input } from 'reactstrap';
import { FieldProps, KeyValue } from '@react-ui-generator/core';
import { ValidatableField } from './ValidatableField';

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

const Types: KeyValue = {
  'number': Number,
  'boolean': Boolean
}

export class Select extends React.PureComponent<SelectProps, SelectState> {
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

  handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const rawValue = event.target.value;
    const valueType = this.state.valueTypes[rawValue];
    const Type = Types[valueType] || String;
    const value = Type(rawValue);

    this.props.onChange(value);
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
        <Input type="select" onChange={event => this.handleChange(event)} value={value}>
          <option value={''} disabled>
            {title}
          </option>>
          {options.map((item: SelectItemProps) => {
            const { id, title } = item;
            return (
              <option key={id} value={id}>
                {title}
              </option>
            );
          })}
        </Input>
      </ValidatableField>
    );
  }
}
