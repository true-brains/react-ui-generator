import * as React from 'react';
import makeClass from 'classnames';
import { ChangeEvent } from 'react';
import Radio from 'antd/lib/radio';
import { FieldProps } from '@react-ui-generator/core';
import { ValidatableField } from './ValidatableField';

const RadioGroup = Radio.Group;

export interface RadiogroupProps extends FieldProps {}

export interface RadiogroupItem {
  id: string;
  title: string;
}

export class _RadioGroup extends React.PureComponent<RadiogroupProps, {}> {
  handleChange(value: string): void {
    this.props.onChange(value);
  }

  render() {
    const { id, data, className, onChange, config, disabled, errors } = this.props;
    console.log('radiogroup items: ', config.options);

    return (
      <ValidatableField
        errors={errors}
        isDirty={data.isDirty}
        hasFeedback={false}
      >
        <RadioGroup
          value={data.value}
          disabled={disabled}
          onChange={event => {
            this.handleChange(event.target.value);
          }}
        >
          {config.options.map((item: RadiogroupItem, idx: number) => (
              <Radio
                key={`${item.id}-${idx}`}
                value={item.id}
                className={className || ''}
              >
                {item.title}
              </Radio>
          ))}
        </RadioGroup>
      </ValidatableField>
    );
  }
}
