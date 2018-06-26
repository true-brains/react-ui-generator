import React from 'react';
import Button, { ButtonType, ButtonSize } from 'antd/lib/button';
import makeClass from 'classnames';

import {
  FieldRenderer,
  PropTypes,
  basePropTypes
} from '@react-ui-generator/core';

import { FieldWrapper } from './FieldWrapper';

export class _Button extends FieldRenderer {
  static propTypes = {
    ...basePropTypes(),
    config: PropTypes.shape({
      title: PropTypes.string,
      outline: PropTypes.bool,
      color: PropTypes.oneOf(['default', 'primary', 'ghost', 'dashed', 'danger']),
      size: PropTypes.oneOf(['small', 'default', 'large']),
    }),
  }

  static defaultProps = {
    className: '',
    disabled: false,
    config: {
      color: 'default',
      size: 'default',
      outline: false
    }
  }

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
      <FieldWrapper errors={[]} {...rest}>
        <Button onClick={onClick} {...props} disabled={disabled}>
          {title}
        </Button>
      </FieldWrapper>
    );
  }
}
