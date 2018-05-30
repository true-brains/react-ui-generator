import React from 'react';
import { ChangeEvent } from 'react';
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox';

import {
  FieldProps,
  PropTypes,
  basePropTypes
} from '@react-ui-generator/core';

import { FieldWrapper } from './FieldWrapper';

export interface CheckboxProps extends FieldProps {}

const value: boolean = null;

export class _Checkbox extends React.PureComponent<CheckboxProps, {}> {
  static propTypes = {
    ...basePropTypes(),
    config: PropTypes.shape({
      label: PropTypes.string,
      title: PropTypes.string,
    }),
  }

  static defaultProps = {
    className: '',
    disabled: false,
    config: {
      label: '',
      title: '',
    },
    data: {
      value,
      isDirty: false
    }
  }

  handleChange = (event: CheckboxChangeEvent): void => {
    this.props.onChange(event.target.checked);
  };

  render() {
    const {
      id,
      data,
      className,
      onChange,
      config: { label, title },
      disabled,
      errors,
      ...rest
    } = this.props;

    const value: boolean = Boolean(data.value);
    const _label = label || (id.length ? id.charAt(0).toUpperCase() + id.slice(1) : '');

    return (
      <FieldWrapper
        errors={errors}
        isDirty={data.isDirty}
        hasFeedback={false}
        label={_label}
        {...rest}
      >
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
