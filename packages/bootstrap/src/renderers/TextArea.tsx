import * as React from 'react';
import makeClass from 'classnames';
import { ChangeEvent } from 'react';
import { FieldProps } from '@react-ui-generator/core';
import { ValidatableField } from './ValidatableField';

export interface TextAreaProps extends FieldProps {}

export class TextArea extends React.PureComponent<TextAreaProps, {}> {
  handleChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    this.props.onChange(event.target.value);
  }

  render() {
    const { id, data, className, onChange, config, disabled, errors } = this.props;
    const value: string = String(data.value);

    return (
      <ValidatableField errors={errors} isDirty={data.isDirty}>
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
      </ValidatableField>
    );
  }
}
