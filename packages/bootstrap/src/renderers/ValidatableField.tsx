import * as React from 'react';
import { FormFeedback } from 'reactstrap';

export interface ValidatableFieldProps {
  errors: string[];
  isDirty: boolean;
  children: JSX.Element | JSX.Element[];
  labelOnly?: boolean;
}

export class ValidatableField extends React.PureComponent<ValidatableFieldProps, {}> {
  render() {
    const { errors, isDirty, children, labelOnly } = this.props;
    const isValidated = Boolean(errors) && isDirty;
    const isValid = !isValidated || !errors.length;

    const validatedChildren = React.Children.map(
      children,
      (child: JSX.Element, idx: number) => {
        // bootstrap components can be followed by a label,
        // so we explicitly process only the first child
        return idx === 0
          ? React.cloneElement(child, {
              valid: isValidated ? isValid : undefined
            })
          : child;
      }
    );

    if (!isValidated) {
      return [validatedChildren];
    }

    const errorMessages = errors.map((error, idx) => (
      <FormFeedback key={`${error}-${idx}`}>{error}</FormFeedback>
    ));

    return [validatedChildren, ...(labelOnly ? [] : errorMessages)];
  }
}
