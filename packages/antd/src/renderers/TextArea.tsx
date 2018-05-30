import * as React from 'react';
import { ChangeEvent } from 'react';
import Input from 'antd/lib/input';

import {
  FieldProps,
  PropTypes,
  basePropTypes
} from '@react-ui-generator/core';

import { FieldWrapper } from './FieldWrapper';

const { TextArea } = Input;

export interface TextAreaProps extends FieldProps {}

const value: string = '';

export class _TextArea extends React.PureComponent<TextAreaProps, {}> {
  static propTypes = {
    ...basePropTypes(),
    config: PropTypes.shape({
      label: PropTypes.string,
      placeholder: PropTypes.string,
    }),
  }

  static defaultProps = {
    className: '',
    disabled: false,
    config: {
      label: '',
      placeholder: '',
    },
    data: {
      value,
      isDirty: false
    },
  }

  handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    this.props.onChange(event.target.value);
  };

  render() {
    const { id, data, className, onChange, config, disabled, errors, ...rest } = this.props;
    const value: string = String(data.value);

    return (
      <FieldWrapper errors={errors} isDirty={data.isDirty} label={config.label} {...rest}>
        <TextArea
          id={id}
          className={className || ''}
          value={value}
          placeholder={config.placeholder || ''}
          onChange={this.handleChange}
          disabled={disabled}
        />
      </FieldWrapper>
    );
  }
}
