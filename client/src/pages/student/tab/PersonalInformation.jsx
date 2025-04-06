import React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import CustomFormControl from "@/components/inputs/CustomFormControl";
import { NATIONALITY } from "@/mockup/data/nationality";
import { TOWNS } from "@/mockup/data/towns";
import DateInputPicker from "@/components/inputs/DateInputPicker";
import Input from "@/components/inputs/Input";
import SelectInput from "@/components/inputs/SelectInput";

const PersonalInformation = ({ setValue, errors, watch, control }) => {
  
  return (
    <Stack py={2} spacing={2}>
      <Input
        label="Student ID"
        control={control}
        name="personal.indexnumber"
        type="text"
        sx={{ maxWidth: 300 }}
        size="small"
      />
      <CustomFormControl>
        <Input
          label="Firstname"
          fullWidth
          size="small"
          control={control}
          name="personal.firstname"
        />
        <Input
          label="Surname"
          fullWidth
          size="small"
          control={control}
          name="personal.surname"
        />
        <Input
          label="Othername"
          fullWidth
          size="small"
          control={control}
          name="personal.othername"
        />
      </CustomFormControl>
      <CustomFormControl>
        <DateInputPicker
          label="Date of Birth"
          name="personal.dateofbirth"
          control={control}
          disableFuture={true}
          // format="L"
        />
        <SelectInput
          label="Gender"
          select
          fullWidth
          size="small"
          name="personal.gender"
          control={control}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </SelectInput>
      </CustomFormControl>
      <CustomFormControl>
        <Input
          label="Email"
          fullWidth
          size="small"
          name="personal.email"
          control={control}
        />
        <Input
          label="Telephone No."
          type="tel"
          fullWidth
          size="small"
          name="personal.phonenumber"
          control={control}
        />
      </CustomFormControl>
      <Input
        label="Address"
        fullWidth
        size="small"
        name="personal.address"
        control={control}
      />
      <CustomFormControl>
        <Autocomplete
          freeSolo
          fullWidth
          size="small"
          options={TOWNS}
          getOptionLabel={(option) => option || ""}
          value={watch("personal.residence") || ""}
          onChange={(_, value) => setValue("personal.residence", value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Residence"
              fullWidth
              size="small"
              error={Boolean(errors.personal?.residence)}
              helperText={errors.personal?.residence?.message}
            />
          )}
        />
        <Autocomplete
          freeSolo
          fullWidth
          size="small"
          options={NATIONALITY}
          getOptionLabel={(option) => option || ""}
          value={watch("personal.nationality") || ""}
          onChange={(_, value) => setValue("personal.nationality", value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Nationality"
              fullWidth
              size="small"
              error={Boolean(errors.personal?.nationality)}
              helperText={errors.personal?.nationality?.message}
            />
          )}
        />
      </CustomFormControl>
    </Stack>
  );
};

export default PersonalInformation;
