import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';
import { Controller, Control, UseFormRegisterReturn } from 'react-hook-form';
import './css/style.css';

type Option = {
  id?: string | number;
  label: string;
  value: string | number;
};

type MultiSelectFieldProps = FieldWrapperPassThroughProps & {
  options: Option[];
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  isMulti?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  registration?: Partial<UseFormRegisterReturn>;
  control: Control;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const animatedComponents = makeAnimated();

export const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  label,
  options,
  error,
  defaultValue,
  placeholder,
  required,
  isMulti,
  disabled,
  isLoading,
  isSearchable = false,
  isClearable,
  control,
  registration,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e);
    }

    if (registration?.onChange) {
      registration.onChange(e);
    }
  };

  return (
    <FieldWrapper label={label} error={error} required={required}>
      <Controller
        control={control}
        name={label ? label : 'dropdown'}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            components={animatedComponents}
            classNamePrefix="react-select"
            placeholder={placeholder}
            isMulti={isMulti}
            disabled={disabled}
            isLoading={isLoading}
            isClearable={isClearable}
            isSearchable={isSearchable}
            {...registration}
            onChange={handleChange}
          />
        )}
      />
    </FieldWrapper>
  );
};
