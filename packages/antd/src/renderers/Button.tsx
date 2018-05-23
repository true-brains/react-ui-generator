import React from 'react';
import Button, { ButtonType, ButtonSize } from 'antd/lib/button';
import makeClass from 'classnames';
import { FieldWrapper } from './FieldWrapper';

export interface ButtonProps {
  className?: string;
  actions: { [key: string]: any };
  config: {
    title: string;
    active?: boolean;
    outline?: boolean;
    color?: string;
    size?: string;
  };
  disabled: boolean;
}

export class _Button extends React.PureComponent<ButtonProps, {}> {
  render() {
    const {
      actions: { onClick },
      config: { title, outline, color, size },
      disabled,
      className,
      ...rest
    } = this.props;

    const props = {
      type: color as ButtonType,
      size: size as ButtonSize,
      ghost: outline
    };

    return (
      <FieldWrapper errors={[]} isDirty={false} {...rest}>
        <Button onClick={onClick} {...props} disabled={disabled}>
          {title}
        </Button>
      </FieldWrapper>
    );
  }
}
