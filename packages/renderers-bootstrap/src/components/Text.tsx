import * as React from 'react';
import makeClass from 'classnames';
import { ChangeEvent } from 'react';

export interface ButtonProps {
  className?: string;
  data: {
    value: string;
    isDirty: boolean;
  }
  actions: { [key: string]: any };
  config: {};
  onChange(value: string): void;
}

export class Text extends React.PureComponent<ButtonProps, {}> {
  handleChange(event: ChangeEvent<HTMLInputElement>): void {
    this.props.onChange(event.target.value);
  }

  render() {
    const { data, onChange } = this.props;
    // const className = makeClass(this.props.className, `btn btn-${mode}`);

    return (
      <input value={data.value} onChange={(event) => { this.handleChange(event)}} />
    );
  }
}
