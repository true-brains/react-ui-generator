import * as React from 'react';
import makeClass from 'classnames';

export interface ButtonProps {
  className?: string;
  actions: { [key: string]: any };
  config: {
    title: string;
    mode?: string;
  };
}

export class Button extends React.PureComponent<ButtonProps, {}> {
  render() {
    const { actions: { onClick }, config: { title, mode = 'primary' } } = this.props;
    const className = makeClass(this.props.className, `btn btn-${mode}`);

    return (
      <button type="button" className={className} onClick={onClick}>
        {title}
      </button>
    );
  }
}
