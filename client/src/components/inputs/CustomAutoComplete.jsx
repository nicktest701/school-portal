import React from "react";
import { Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

export default function CustomAutoComplete({ name, label, control, data }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          options={data?.data || []}
          loading={data.isPending}
          getOptionLabel={(option) =>
            option?.fullName || option?.fullname || option?.name || ""
          }
          value={value || null}
          onChange={(_, newValue) => onChange(newValue)}
          isOptionEqualToValue={(option, val) => option._id === val?._id}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              size="small"
              error={!!error}
              helperText={error ? error.message : ""}
            />
          )}
        />
      )}
    />
  );
}
