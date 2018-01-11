import * as React from 'react';
import makeClass from 'classnames';
import { ChangeEvent } from 'react';
import { FieldProps } from '../interfaces';

export interface TextAreaProps extends FieldProps {
}

export class TextArea extends React.PureComponent<TextAreaProps, {}> {
  handleChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    this.props.onChange(event.target.value);
  }

  render() {
    const { id, data, className, onChange, config } = this.props;

    return (
      <textarea
        id={id}
        className={className || ''}
        value={data.value}
        placeholder={config.placeholder || ''}
        rows={config.rows}
        onChange={event => {
          this.handleChange(event);
        }}
      />
    );
  }
}
