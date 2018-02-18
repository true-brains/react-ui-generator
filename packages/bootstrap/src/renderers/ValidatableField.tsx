import * as React from 'react';

export interface ValidatableFieldProps {
  errors: string[];
  isDirty: boolean;
  children: JSX.Element;
}

export class ValidatableField extends React.PureComponent<ValidatableFieldProps, {}> {
  render() {
    const { errors = [], isDirty, children } = this.props;
    const isValid = isDirty && !Boolean(errors.length);
    const isInvalid = isDirty && Boolean(errors.length);

    const validatedChildren = React.Children.map(children, (child: JSX.Element) => {
      const invalidClass = isInvalid ? " is-invalid" : "";
      const validClass = isValid ? " is-valid" : "";
      const className = `${child.props.className}${invalidClass}${validClass}`;

      return React.cloneElement(child, { className })
    });

    const errorMessages = isDirty ? errors.map(error => {
      const invalidClass = isInvalid ? " invalid-feedback" : "";
      const validClass = isValid ? " valid-feedback" : "";

      return (
        <div key={error} className={`${invalidClass}${validClass}`}>{error}</div>
      );
    }) : [];

    return [validatedChildren, ...errorMessages];
  }
}
