import * as React from 'react';
import makeClass from 'classnames';
import { ChangeEvent } from 'react';
import { Input, Label, FormGroup } from 'reactstrap';
import { FieldProps } from '@react-ui-generator/core';

export interface RadiogroupProps extends FieldProps {}

export interface RadiogroupItem {
  id: string;
  title: string;
}

export class Radiogroup extends React.PureComponent<RadiogroupProps, {}> {
  handleChange(value: string): void {
    this.props.onChange(value);
  }

  render() {
    const { id, data, className, onChange, config, disabled } = this.props;
    const value: string = String(data.value);

    return config.options.map((item: RadiogroupItem, idx: number) => (
      <FormGroup check key={`${id}-${idx}`}>
        <Label check>
          <Input
            id={id}
            name={id}
            type="radio"
            className={className || ''}
            onChange={event => {
              this.handleChange(item.id);
            }}
            disabled={disabled}
            checked={value === item.id.toString()}
          />{' '}
          {item.title}
        </Label>
      </FormGroup>
    ));
  }
}
