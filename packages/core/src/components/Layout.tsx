import React from 'react';
import { FormMetaDescription } from '../interfaces';

const { Provider, Consumer } = React.createContext({
  fields: [],
  updateFields: (fields: JSX.Element[]) => {}
});

export function withFields(Component: React.ComponentClass) {
  return function ComponentWithMeta(props: any) {
    return (
      <Consumer>
        {(contextProps) => <Component {...props} {...contextProps} />}
      </Consumer>
    );
  }
}

export interface LayoutProps {
  fields: JSX.Element[],
  children?: React.ReactNode;
}

export interface LayoutState {
  fields: JSX.Element[],
}

export class Layout extends React.Component<LayoutProps, LayoutState> {
  constructor(props: LayoutProps) {
    super(props);

    this.state = {
      fields: props.fields
    };
  }

  static getDerivedStateFromProps(nextProps: LayoutProps) {
    return { fields: nextProps.fields };
  }

  render(): JSX.Element {
    const { children } = this.props;
    const value = {
      fields: this.state.fields,
      updateFields: (newFields: JSX.Element[]) => { this.setState({ fields: newFields }); }
    }

    return (<Provider value={value}>{children}</Provider>);
  }
}
