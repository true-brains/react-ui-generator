import * as React from 'react';
import makeClass from 'classnames';
import { ChangeEvent } from 'react';

export interface ButtonProps {
  className?: string;
  actions: { [key: string]: any };
  config: {};
  onChange(event: Event): void;
}

export class Text extends React.PureComponent<ButtonProps, {}> {
  handleChange(event: ChangeEvent<HTMLInputElement>): void {
    console.log('Text.handleChange: ', event)
  }

  render() {
    const { onChange } = this.props;
    // const className = makeClass(this.props.className, `btn btn-${mode}`);

    return (
      <input onChange={(event) => { this.handleChange(event)}} />
    );
  }
}
