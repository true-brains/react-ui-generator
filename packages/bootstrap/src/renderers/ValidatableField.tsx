import * as React from 'react';
import { FormFeedback } from 'reactstrap';

export interface ValidatableFieldProps {
  errors: string[];
  isDirty: boolean;
  children: JSX.Element | JSX.Element[];
}

export class ValidatableField extends React.PureComponent<ValidatableFieldProps, {}> {
  render() {
    const { errors = [], isDirty, children } = this.props;
    const isValid = !errors.length;

    const validatedChildren = React.Children.map(children, (child: JSX.Element, idx: number) => {
      return (idx === 0)
        ? React.cloneElement(child, { valid: isDirty ? isValid: undefined, })
        : child;
    });

    const errorMessages = errors.map((error, idx) => (
      <FormFeedback key={`${error}-${idx}`}>{error}</FormFeedback>
    ));

    return [validatedChildren, ...errorMessages];
  }
}
