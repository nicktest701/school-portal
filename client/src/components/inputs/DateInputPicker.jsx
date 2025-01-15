import React from "react";
import { Controller } from "react-hook-form";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";



// Custom Date Picker Controller
const DateInputPicker = ({
  name,
  control,
  label,
  rules,
  disableFuture,
  style,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            label={label}
            value={value || null}
            onChange={(newValue) => {
              onChange(moment(new Date(newValue)));
            }}
            format="Do MMMM YYYY"
            disableMaskedInput
            disableFuture={disableFuture}
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",
                error: !!error,
                helperText: error ? error.message : null,
              },
            }}
            sx={{ width: "100%", ...style }}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default DateInputPicker;
