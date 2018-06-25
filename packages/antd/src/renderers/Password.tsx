import * as React from 'react';
import { ChangeEvent } from 'react';
import { _Input } from './Input';

import {
  FieldProps,
  PropTypes,
  basePropTypes
} from '@react-ui-generator/core';

export class Password extends React.PureComponent<FieldProps, {}> {
  render() {
    return (<_Input type='password' {...this.props} />);
  }
}
