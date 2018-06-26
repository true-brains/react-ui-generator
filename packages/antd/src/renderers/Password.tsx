import * as React from 'react';
import { ChangeEvent } from 'react';
import { _Input } from './Input';

import {
  FieldRenderer,
  PropTypes,
  basePropTypes
} from '@react-ui-generator/core';

export class Password extends FieldRenderer {
  render() {
    return (<_Input type='password' {...this.props} />);
  }
}
