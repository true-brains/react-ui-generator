import * as React from 'react';
import { ChangeEvent } from 'react';
import Radio from 'antd/lib/radio';

import {
  FieldRenderer,
  PropTypes,
  basePropTypes
} from '@react-ui-generator/core';

import { FieldWrapper } from './FieldWrapper';

const RadioGroup = Radio.Group;


export interface RadiogroupItem {
  id: string | number;
  title: string;
}

const value: string | number = null;
const options: RadiogroupItem[] = [];

export class _RadioGroup extends FieldRenderer {
  static propTypes = {
    ...basePropTypes(),
    config: PropTypes.shape({
      label: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string
      }))
    }),
  }

  static defaultProps = {
    className: '',
    disabled: false,
    dirty: false,
    config: {
      label: '',
      options
    },
    data: value,
  }

  handleChange(value: string): void {
    this.props.onChange(value);
  }

  render() {
    const {
      id,
      data,
      className,
      onChange,
      config,
      disabled,
      ...rest
    } = this.props;

    return (
      <FieldWrapper
        hasFeedback={false}
        label={config.label}
        {...rest}
      >
        <RadioGroup
          value={data}
          disabled={disabled}
          onChange={event => {
            this.handleChange(event.target.value);
          }}
        >
          {config.options.map((item: RadiogroupItem, idx: number) => (
            <Radio key={`${item.id}-${idx}`} value={item.id} className={className || ''}>
              {item.title}
            </Radio>
          ))}
        </RadioGroup>
      </FieldWrapper>
    );
  }
}
