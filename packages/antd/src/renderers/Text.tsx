import * as React from 'react';
import { _Input } from './Input';
import { FieldRenderer, } from '@react-ui-generator/core';

export class Text extends FieldRenderer {
  render() {
    return (<_Input type='text' {...this.props} />);
  }
}
