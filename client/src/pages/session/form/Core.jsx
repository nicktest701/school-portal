import React from "react";
import {
  TextField,
  Typography,
  MenuItem,
  FormLabel,
  Stack,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";
import { Controller } from "react-hook-form";
import DateInputPicker from "@/components/inputs/DateInputPicker";
import SelectInput from "@/components/inputs/SelectInput";
import { SCHOOL_TERMS } from "@/mockup/columns/sessionColumns";
import CustomFormControl from "@/components/inputs/CustomFormControl";
import moment from "moment";
import CustomRadioInput from "@/components/items/CustomRadioInput";
import Input from "@/components/inputs/Input";

const Core = ({ watch, control, errors }) => {
  const sT = watch("core.from");
  const eT = watch("core.to");

  return (
    <div>
      <Typography variant="h5" fontWeight="bold">
        Basic Session Details
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        fontStyle="italic"
        mb={3}
      >
        Easily configure session start and end dates, set term structures, and
        define academic periods for streamlined school management
      </Typography>

      <Stack spacing={2} py={2}>
        <Input
          name="core.name"
          control={control}
          size="small"
          label="Session Name"
          fullWidth
          // render={({ field }) => (
          //   <TextField
          //     {...field}
          //     error={!!errors.core?.name}
          //     helperText={errors.core?.name?.message}
          //     required
          //   />
          // )}
        />

        <FormControl required>
          <FormLabel component="legend">Academic Session</FormLabel>
          <CustomFormControl>
            <DateInputPicker
              label="Start of Academic Term/Semester"
              name="core.from"
              control={control}
              textFieldProps={{
                required: true,
              }}
            />
            <DateInputPicker
              label="End of Academic Term/Semester"
              name="core.to"
              control={control}
              textFieldProps={{
                required: true,
              }}
            />
          </CustomFormControl>
        </FormControl>

        <FormLabel
          sx={{
            textAlign: "center",
            p: 1,
            borderRadius: 1,
            border: "1px solid lightgray",
          }}
        >
          {`${moment(sT || new Date()).year()}/${moment(
            eT || new Date()
          ).year()}`}
        </FormLabel>

        <Typography variant="h6" gutterBottom>
          Semester
        </Typography>
        <SelectInput
          label="Term/Semester"
          size="small"
          name="core.term"
          control={control}
          fullWidth
          margin="normal"
          required
        >
          {SCHOOL_TERMS.map((term) => (
            <MenuItem key={term} value={term}>
              {term}
            </MenuItem>
          ))}
        </SelectInput>
        <CustomRadioInput
          name="core.isPromotionTerm"
          title="Promotion Term / Semester?"
          control={control}
        />
      </Stack>
    </div>
  );
};

export default Core;
