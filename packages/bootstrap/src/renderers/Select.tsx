import * as React from 'react';
import { ChangeEvent } from 'react';
import makeClass from 'classnames';
import { Input } from 'reactstrap';
import { FieldProps } from '@react-ui-generator/core';
import { ValidatableField } from './ValidatableField';

export interface SelectProps extends FieldProps {
  title: string;
  caret?: boolean;
  isOpen?: boolean;
}

interface SelectItemProps {
  id: string;
  title: string;
}

export class Select extends React.PureComponent<SelectProps, {}> {
  handleChange(event: ChangeEvent<HTMLInputElement>): void {
    this.props.onChange(event.target.value);
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
