import React from 'react';
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox';
import PropTypes from 'prop-types'

import { FieldRenderer, basePropTypes } from '@react-ui-generator/core';
import { FieldWrapper } from './FieldWrapper';

const value: boolean = null;

export class _Checkbox extends FieldRenderer {
  static propTypes = {
    ...basePropTypes(),
    config: PropTypes.shape({
      label: PropTypes.string,
      title: PropTypes.string,
      showAsterix: PropTypes.bool
    })
  };

  static defaultProps = {
    className: '',
    disabled: false,
    drity: false,
    config: {
      label: '',
      title: '',
      showAsterix: false
    },
    data: value
  };

  handleChange = (event: CheckboxChangeEvent): void => {
    this.props.onChange(event.target.checked);
  };

  render() {
    const {
      id,
      data,
      className,
      onChange,
      config: { label, title, showAsterix },
      disabled,
      ...rest
    } = this.props;

    const value: boolean = Boolean(data);
    const _label = label || (id.length ? id.charAt(0).toUpperCase() + id.slice(1) : '');

    return (
      <FieldWrapper hasFeedback={false} label={_label} showAsterix={showAsterix} {...rest}>
        <Checkbox
          className={className || ''}
          disabled={disabled}
          checked={value}
          onChange={this.handleChange}
        >
          {title}
        </Checkbox>
      </FieldWrapper>
    );
  }
}
