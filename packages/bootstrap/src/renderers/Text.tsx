import * as React from 'react';
import makeClass from 'classnames';
import { ChangeEvent } from 'react';
import { Input } from 'reactstrap';
import { FieldProps } from '../interfaces';

export interface TextProps extends FieldProps {}

export class Text extends React.PureComponent<TextProps, {}> {
  handleChange(event: ChangeEvent<HTMLInputElement>): void {
    this.props.onChange(event.target.value);
  }

  render() {
    const { id, data, className, onChange, config, disabled } = this.props;
    const value: string = String(data.value)

    return (
      <Input
        id={id}
        className={className || ''}
        value={value}
        placeholder={config.placeholder || ''}
        onChange={event => {
          this.handleChange(event);
        }}
        disabled={disabled}
      />
    );
  }
}
