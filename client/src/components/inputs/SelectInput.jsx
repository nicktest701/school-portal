import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

const SelectInput = ({
  children,
  name,
  control,
  label,
  rules,
  defaultValue = "",
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue} // In case initial value is needed
      render={({
        field: { onChange, value, onBlur },
        fieldState: { error },
      }) => (
        <TextField
        fullWidth
          select
          label={label}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={!!error} // Display an error state when validation fails
          helperText={error ? error.message : null} // Show the error message from validation
          {...rest} // Spread any other props like placeholder, fullWidth, etc.
        >
          {children}
        </TextField>
      )}
    />
  );
};

export default SelectInput;
