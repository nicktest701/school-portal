import React from "react";
import {
  TextField,
  Typography,
  FormLabel,
  Stack,
  FormControl,
} from "@mui/material";
import { Controller } from "react-hook-form";
import DateInputPicker from "@/components/inputs/DateInputPicker";
import CustomFormControl from "@/components/inputs/CustomFormControl";
import Input from "@/components/inputs/Input";

const Core = ({ watch, control, errors }) => {
  const academicYear = watch("core.academicYear");

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
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />

        <FormControl required>
          <FormLabel component="legend">Academic Session</FormLabel>
          <CustomFormControl>
            <DateInputPicker
              label="Start of Academic Term/Semester"
              name="core.from"
              control={control}
              disabled
              textFieldProps={{
                required: true,
                slotProps: {
                  input: {
                    readOnly: true,
                  },
                },
              }}
            />

            <DateInputPicker
              label="End of Academic Term/Semester"
              name="core.to"
              control={control}
              disabled
              textFieldProps={{
                required: true,
                slotProps: {
                  input: {
                    readOnly: true,
                  },
                },
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
          {academicYear}
        </FormLabel>

        <Typography variant="h6" gutterBottom>
          Semester
        </Typography>

        <Controller
          name="core.term"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              size="small"
              label="Term/Semester"
              fullWidth
              error={!!errors.core?.term}
              helperText={errors.core?.term?.message}
              required
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
          )}
        />
        <FormControl required>
          <FormLabel component="legend">Others</FormLabel>
          <CustomFormControl>
            <DateInputPicker
              label="Vacation Date"
              name="core.vacationDate"
              control={control}
            />

            <DateInputPicker
              label="Next Term/Semester Begins"
              name="core.reOpeningDate"
              control={control}
            />
          </CustomFormControl>
        </FormControl>
      </Stack>
    </div>
  );
};

export default Core;
