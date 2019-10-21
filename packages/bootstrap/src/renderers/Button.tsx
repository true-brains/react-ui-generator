import * as React from 'react';
import { Button as RButton } from 'reactstrap';

export interface ButtonProps {
  className?: string;
  actions: { [key: string]: any };
  config: {
    title: string;
    active?: boolean;
    outline?: boolean;
    color?: string;
    // size?: string;
  };
  disabled: boolean;
}

export class Button extends React.PureComponent<ButtonProps, {}> {
  render() {
    const {
      actions: { onClick },
      config: {
        title,
        ...rest
      },
      disabled,
      className
    } = this.props;

    return (
      <RButton onClick={onClick} {...rest}>{title}</RButton>
    );
  }
}
