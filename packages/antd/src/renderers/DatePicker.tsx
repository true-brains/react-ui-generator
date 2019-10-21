import React from 'react';
import DatePicker from 'antd/lib/date-picker';
import moment, { Moment } from 'moment';
import PropTypes from 'prop-types'

import { FieldRenderer, basePropTypes } from '@react-ui-generator/core';

import { FieldWrapper } from './FieldWrapper';

const value: string = null;

export class _DatePicker extends FieldRenderer {
  static propTypes = {
    ...basePropTypes(),
    config: PropTypes.shape({
      label: PropTypes.string,
      placeholder: PropTypes.string,
      showAsterix: PropTypes.bool,
      format: PropTypes.string
    })
  };

  static defaultProps = {
    className: '',
    disabled: false,
    dirty: false,
    config: {
      label: '',
      placeholder: '',
      showAsterix: false,
      format: 'DD.MM.YYYY'
    },
    data: value
  };

  handleChange = (date: Moment, dateString: String): void => {
    this.props.onChange(dateString);
  };

  render() {
    const {
      id,
      data,
      className,
      onChange,
      config: { label, placeholder, showAsterix, format },
      disabled,
      ...rest
    } = this.props;
    const _format = format || 'YYYY-MM-DD';
    const momentValue: Moment = data ? moment(String(data), _format) : undefined;

    return (
      <FieldWrapper label={label} showAsterix={showAsterix} {...rest}>
        <DatePicker
          id={id}
          className={className || ''}
          value={momentValue || undefined}
          placeholder={placeholder || ''}
          format={_format}
          onChange={this.handleChange}
          disabled={disabled}
        />
      </FieldWrapper>
    );
  }
}
