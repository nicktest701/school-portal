import React from "react";
import {
  Stack,
  TextField,
  MenuItem,
  Autocomplete,
} from "@mui/material";

import CustomFormControl from "@/components/inputs/CustomFormControl";
import { NATIONALITY } from "@/mockup/data/nationality";
import { TOWNS } from "@/mockup/data/towns";
import { RELATIONSHIP } from "@/mockup/columns/sessionColumns";
import { Controller } from "react-hook-form";
import Input from "@/components/inputs/Input";
import Typography from "@mui/material/Typography";
import SelectInput from "@/components/inputs/SelectInput";

const ParentInfo = ({ control, watch, index }) => {
  const gender = watch(`parent.${index}.gender`);

  const renderTextField = (
    name,
    label,
    type = "text",
    select = false,
    options = []
  ) => {
    return select ? (
      <SelectInput size="small" name={name} label={label} control={control}>
        {select &&
          options.map((option) => (
            <MenuItem
              key={option}
              value={option}
              sx={{ textTransform: "capitalize" }}
            >
              {option}
            </MenuItem>
          ))}
      </SelectInput>
    ) : (
      <Input
        fullWidth
        size="small"
        name={name}
        label={label}
        type={type}
        select={select}
        control={control}
      />
    );
  };

  const renderAutoComplete = (name, label, options) => (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, onBlur },
        fieldState: { error },
      }) => (
        <Autocomplete
          freeSolo
          fullWidth
          size="small"
          options={options}
          getOptionLabel={(option) => option || ""}
          value={value}
          onInputChange={(_, value) => onChange(value)}
          onBlur={onBlur}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!error} // Display an error state when validation fails
              helperText={error ? error?.message : null}
            />
          )}
        />
      )}
    />
  );

  return (
    <Stack py={2} spacing={1}>
      
      <CustomFormControl>
      
        {renderTextField(`parent.${index}.firstname`, "Firstname")}
        {renderTextField(`parent.${index}.surname`, "Surname")}
      </CustomFormControl>
      <CustomFormControl>
        {renderTextField(`parent.${index}.gender`, "Gender", "text", true, [
          "male",
          "female",
        ])}
        {renderAutoComplete(
          `parent.${index}.relationship`,
          "Relationship",
          RELATIONSHIP(gender)
        )}
      </CustomFormControl>
      <CustomFormControl>
        {renderTextField(`parent.${index}.email`, "Email", "email")}
        {renderTextField(`parent.${index}.phonenumber`, "Telephone No.", "tel")}
      </CustomFormControl>
      {renderTextField(`parent.${index}.address`, "Address")}
      <CustomFormControl>
        {renderAutoComplete(`parent.${index}.residence`, "Residence", TOWNS)}
        {renderAutoComplete(
          `parent.${index}.nationality`,
          "Nationality",
          NATIONALITY
        )}
      </CustomFormControl>
    </Stack>
  );
};

export default ParentInfo;
