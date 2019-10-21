import * as React from 'react';
import { FieldRenderer } from '@react-ui-generator/core';
import { _Input } from './Input';

export class Password extends FieldRenderer {
  render() {
    return (<_Input type='password' {...this.props} />);
  }
}
