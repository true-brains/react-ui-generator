import * as React from 'react';
import makeClass from 'classnames';
import { ChangeEvent } from 'react';
import { FieldRendererProps } from '@react-ui-generator/core';
import { Input } from 'reactstrap';
import { ValidatableField } from './ValidatableField';

export interface TextAreaProps extends FieldRendererProps {}

export class TextArea extends React.PureComponent<TextAreaProps, {}> {
  handleChange(event: ChangeEvent<HTMLInputElement>): void {
    this.props.onChange(event.target.value);
  }

  render() {
    const { id, data, className, onChange, config, disabled, errors } = this.props;
    const value: string = String(data);

    return (
      <ValidatableField errors={errors} isDirty={data.isDirty}>
        <Input
          id={id}
          type="textarea"
          className={className || ''}
          value={value}
          placeholder={config.placeholder || ''}
          onChange={event => {
            this.handleChange(event);
          }}
          disabled={disabled}
        />
      </ValidatableField>
    );
  }
}
