import * as React from 'react';
// import { FieldsRest } from '@react-ui-generator/core';

export interface DivsLayoutProps {
  className?: string,
  fieldClassName?: string
}

export class DivsLayout extends React.Component<DivsLayoutProps, {}> {
  render() {
    const { children, className='', fieldClassName='' } = this.props;
    
    return (
      <div className={className}>
        {React.Children.map(children, (child) => (<div className={fieldClassName}>{child}</div>))}
      </div>
    );
  }
}
