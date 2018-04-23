import * as React from 'react';
import makeClass from 'classnames';
import { ChangeEvent } from 'react';
import Upload, { UploadChangeParam } from 'antd/lib/upload';
import Button from 'antd/lib/button';
import Icon  from 'antd/lib/icon';
import { FieldProps } from '@react-ui-generator/core';
import { ValidatableField } from './ValidatableField';

export interface TextProps extends FieldProps {}

export class _Upload extends React.PureComponent<TextProps, {}> {
  handleChange = (info: UploadChangeParam): void => {
    this.props.onChange(info.fileList);
  }

  render() {
    const { id, data, className, onChange, config, disabled, errors } = this.props;
    const value: string = String(data.value);

    return (
      <ValidatableField errors={errors} isDirty={data.isDirty}>
        <Upload
          action={config.url}
          className={className || ''}
          onChange={this.handleChange}
          disabled={disabled}
        >
          <Button>
            <Icon type='upload' />{config.label}
          </Button>
        </Upload>
      </ValidatableField>
    );
  }
}
