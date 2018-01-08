import * as React from 'react';
import makeClass from 'classnames';
import { ChangeEvent } from 'react';
import { KeyValue } from '@react-ui-generator/core';

export interface TextProps {
  className?: string;
  id: string;
  data: {
    value: string;
    isDirty: boolean;
  };
  actions: KeyValue;
  config: KeyValue;
  onChange(value: string): void;
}

export class Text extends React.PureComponent<TextProps, {}> {
  handleChange(event: ChangeEvent<HTMLInputElement>): void {
    this.props.onChange(event.target.value);
  }

  render() {
    const { id, data, className, onChange, config } = this.props;

    return (
      <input
        id={id}
        className={className || ''}
        value={data.value}
        placeholder={config.placeholder || ''}
        onChange={event => {
          this.handleChange(event);
        }}
      />
    );
  }
}
