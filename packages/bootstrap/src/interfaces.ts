import { KeyValue } from '@react-ui-generator/core';

export interface FieldProps {
  className?: string;
  id: string;
  data: {
    value: string | boolean;
    isDirty: boolean;
  };
  actions: KeyValue;
  config: KeyValue;
  disabled: boolean;
  onChange(value: string | boolean): void;
}
