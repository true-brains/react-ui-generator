import * as React from 'react';
import makeClass from 'classnames';
import { ChangeEvent } from 'react';
import { Input, Label, FormGroup } from 'reactstrap';
import { FieldRendererProps } from '@react-ui-generator/core';
import { ValidatableField } from './ValidatableField';

export interface RadiogroupProps extends FieldRendererProps {}

export interface RadiogroupItem {
  id: string;
  title: string;
}

export class Radiogroup extends React.PureComponent<RadiogroupProps, {}> {
  handleChange(value: string): void {
    this.props.onChange(value);
  }

  render() {
    const { id, data, className, onChange, config, disabled, errors } = this.props;
    const value: string = String(data);

    return (
      config.options.map((item: RadiogroupItem, idx: number) => (
        <FormGroup check key={`${id}-${idx}`}>
          <ValidatableField
            errors={errors}
            isDirty={data.isDirty}
            labelOnly={idx !== (config.options.length - 1)}
          >
            <Input
              id={`${id}-${idx}`}
              name={id}
              type="radio"
              className={className || ''}
              onChange={event => {
                this.handleChange(item.id);
              }}
              disabled={disabled}
              checked={value === item.id.toString()}
            />

            <Label htmlFor={`${id}-${idx}`} check>{item.title}</Label>
          </ValidatableField>
        </FormGroup>
      ))
    );
  }
}
