import React from 'react';
import { ChangeEvent } from 'react';
import DatePicker from 'antd/lib/date-picker';
import moment, { Moment, MomentInput } from 'moment';

import {
  FieldRenderer,
  FieldRendererProps,
  PropTypes,
  basePropTypes
} from '@react-ui-generator/core';

import { FieldWrapper } from './FieldWrapper';

export interface DatePickerProps extends FieldRendererProps {
  format: String;
}

const value: string = null;

export class _DatePicker extends FieldRenderer<DatePickerProps> {
  static propTypes = {
    ...basePropTypes(),
    config: PropTypes.shape({
      label: PropTypes.string,
      placeholder: PropTypes.string,
      format: PropTypes.string,
    }),
  }

  static defaultProps = {
    className: '',
    disabled: false,
    dirty: false,
    config: {
      label: '',
      placeholder: '',
      format: 'DD.MM.YYYY'
    },
    data: value,
  }

  handleChange = (date: Moment, dateString: String): void => {
    this.props.onChange(dateString);
  };

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
    const format = config.format || 'YYYY-MM-DD';
    const momentValue: Moment = data ? moment(String(data), format) : undefined;

    return (
      <FieldWrapper label={config.label} {...rest}>
        <DatePicker
          id={id}
          className={className || ''}
          value={momentValue || undefined}
          placeholder={config.placeholder || ''}
          format={format}
          onChange={this.handleChange}
          disabled={disabled}
        />
      </FieldWrapper>
    );
  }
}
