import * as React from 'react';
import makeClass from 'classnames';
import { ChangeEvent } from 'react';
import DatePicker from 'antd/lib/date-picker';
import { FieldProps } from '@react-ui-generator/core';
import { ValidatableField } from './ValidatableField';
import moment, { Moment, MomentInput } from 'moment';


export interface DatePickerProps extends FieldProps {
  format: String
}

export class _DatePicker extends React.PureComponent<DatePickerProps, {}> {
  handleChange = (date: Moment, dateString: String): void => {
    console.log('date:', date);
    console.log('dateString:', dateString);
    this.props.onChange(dateString);
  }

  render() {
    const { id, data, className, onChange, config, disabled, errors } = this.props;
    const format = config.format || 'YYYY-MM-DD';
    const { value } = data;
    const momentValue: Moment = value ? moment(String(value), format) : undefined;
    console.log('data: ', data);
    console.log('momentValue: ', momentValue);

    return (
      <ValidatableField errors={errors} isDirty={data.isDirty}>
        <DatePicker
          id={id}
          className={className || ''}
          value={momentValue || undefined}
          placeholder={config.placeholder || ''}
          format={format}
          onChange={this.handleChange}
          disabled={disabled}
        />
      </ValidatableField>
    );
  }
}
