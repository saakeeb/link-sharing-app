// components/DropDownSelect.tsx

import React from 'react';
import Select, { Props as SelectProps } from 'react-select';

interface OptionType {
  value?: string;
  label?: string;
}

export interface DropDownSelectProps extends SelectProps<OptionType> {
  options: OptionType[];
  placeholder?: string;
  isClearable?: boolean;
  isMulti?: boolean;
  defaultValue?: undefined;
}

const DropDownSelect: React.FC<DropDownSelectProps> = ({
  options,
  placeholder,
  isClearable = false,
  isMulti = false,
  defaultValue = undefined,
  ...props
}) => {
  return (
    <Select
      options={options}
      placeholder={placeholder}
      isClearable={isClearable}
      defaultValue={defaultValue}
      isMulti={isMulti}
      components={{
        IndicatorSeparator: () => null,
      }}
      {...props}
    />
  );
};

export default DropDownSelect;
