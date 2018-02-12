import * as React from 'react';
import makeClass from 'classnames';
import { ChangeEvent } from 'react';
import { FieldProps } from '@react-ui-generator/core';

export interface TextAreaProps extends FieldProps {}

export class TextArea extends React.PureComponent<TextAreaProps, {}> {
  handleChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    this.props.onChange(event.target.value);
  }

  render() {
    const { id, data, className, onChange, config, disabled } = this.props;
    const value: string = String(data.value)

    return (
      <textarea
        id={id}
        className={className || ''}
        value={value}
        placeholder={config.placeholder || ''}
        rows={config.rows}
        onChange={event => {
          this.handleChange(event);
        }}
        disabled={disabled}
      />
    );
  }
}
