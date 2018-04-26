import * as React from 'react';
import makeClass from 'classnames';
import { ChangeEvent } from 'react';
import DatePicker from 'antd/lib/date-picker';
import { FieldProps } from '@react-ui-generator/core';
import { FieldWrapper } from './FieldWrapper';
import moment, { Moment, MomentInput } from 'moment';

export interface DatePickerProps extends FieldProps {
  format: String;
}

export class _DatePicker extends React.PureComponent<DatePickerProps, {}> {
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
      errors,
      ...rest
    } = this.props;
    const format = config.format || 'YYYY-MM-DD';
    const { value } = data;
    const momentValue: Moment = value ? moment(String(value), format) : undefined;

    return (
      <FieldWrapper errors={errors} isDirty={data.isDirty} label={config.label} {...rest}>
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
