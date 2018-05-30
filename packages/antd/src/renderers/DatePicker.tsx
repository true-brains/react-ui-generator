import React from 'react';
import { ChangeEvent } from 'react';
import DatePicker from 'antd/lib/date-picker';
import moment, { Moment, MomentInput } from 'moment';

import {
  FieldProps,
  PropTypes,
  basePropTypes
} from '@react-ui-generator/core';

import { FieldWrapper } from './FieldWrapper';

export interface DatePickerProps extends FieldProps {
  format: String;
}

const value: string = null;

export class _DatePicker extends React.PureComponent<DatePickerProps, {}> {
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
    config: {
      label: '',
      placeholder: '',
      format: 'DD.MM.YYYY'
    },
    data: {
      value,
      isDirty: false
    }
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
