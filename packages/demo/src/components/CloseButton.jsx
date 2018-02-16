import * as React from 'react';
import makeClass from 'classnames';

class CloseButton extends React.PureComponent {
  render() {
    const {
      actions: { onClick },
      disabled,
      className
    } = this.props;

    return (
      <button
        type="button"
        className="close"
        aria-label="Close"
        onClick={onClick}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    );
  }
}

export default CloseButton;
