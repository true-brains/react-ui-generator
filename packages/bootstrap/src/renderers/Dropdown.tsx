import * as React from 'react';
import { ChangeEvent } from 'react';
import makeClass from 'classnames';
import { Dropdown as RDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FieldProps } from '../interfaces';

export interface DropdownProps extends FieldProps {
  title: string;
  caret?: boolean;
  isOpen?: boolean;
}

interface DropdownItemProps {
  title: string;
  id: string;
  header?: boolean;
  disabled?: boolean;
  divider?: boolean;
}

export class Dropdown extends React.PureComponent<DropdownProps, {}> {
  render() {
    const {
      id,
      actions: { onToggle },
      config: { title, isOpen, caret, options },
      disabled,
      className,
      onChange
    } = this.props;

    return (
      <RDropdown isOpen={isOpen} toggle={() => onToggle(id)}>
        <DropdownToggle caret>
          {title}
        </DropdownToggle>
        <DropdownMenu>
          {options.map((item: DropdownItemProps) => {
            const { title, ...item_props } = item;

            return (
              <DropdownItem
                key={item_props.id}
                onClick={() => onChange(item_props.id)}
                {...item_props}
                active
              >
                {title}
              </DropdownItem>
            )
          })}
        </DropdownMenu>
      </RDropdown>
    );
  }
}
