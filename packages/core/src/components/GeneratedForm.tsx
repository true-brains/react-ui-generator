import * as React from "react";

export interface IGeneratedFormProps {
  meta: any,
  data: any,
  errors: any,
  validator(valdiate: any, schema: any): void,
  onChange(data: any, errors: any): void
}

export class GeneratedForm extends React.Component<IGeneratedFormProps, {}> {
  render () {
    return (<div>test</div>)
  }
}