import React from "react";
import { Typography, Stack, FormLabel, Paper } from "@mui/material";

import CustomFormControl from "@/components/inputs/CustomFormControl";
import DateInputPicker from "@/components/inputs/DateInputPicker";
import ScoreSelection from "./ScoreSelection";

const Exams = ({ watch, control, errors }) => {
  return (
    <div>
      <Typography variant="h5">Exam & Assessment</Typography>
      <Typography variant="body2" fontStyle="italic" pb={2}>
        Create exams, record assessments, and generate automated results with
        flexible grading systems to enhance academic evaluation.
      </Typography>

      <Stack spacing={2} py={2}>
        <ScoreSelection control={control} errors={errors} isEdit={true} />

        <Paper sx={{ p: 2, boxShadow: 2, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Dates & Deadlines
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Set the dates and deadlines for exams, assessments, and other
            important events. This helps in organizing the academic calendar and
            ensuring timely completion of assessments.
          </Typography>

          {/* Mid-term Examination */}
          {/* <FormControl component="fieldset"> */}
          <FormLabel component="legend">Mid-term Examination</FormLabel>

          <CustomFormControl>
            <DateInputPicker
              label="From"
              name="exams.midTermExams.from"
              control={control}
            />
            <DateInputPicker
              label="To"
              name="exams.midTermExams.to"
              control={control}
            />
          </CustomFormControl>
          {/* </FormControl> */}
          {/* Revision Week */}
          {/* <FormControl component="fieldset"> */}
          <FormLabel component="legend">Revision Week</FormLabel>
          <CustomFormControl>
            <DateInputPicker
              label="From"
              name="exams.revisionWeek.from"
              control={control}
              textFieldProps={{
                required: true,
              }}
            />
            <DateInputPicker
              label="To"
              name="exams.revisionWeek.to"
              control={control}
              textFieldProps={{
                required: true,
              }}
            />
          </CustomFormControl>
          {/* </FormControl> */}
          {/* Examination */}
          {/* <FormControl component="fieldset"> */}
          <FormLabel component="legend">Examination</FormLabel>
          <CustomFormControl>
            <DateInputPicker
              label="From"
              name="exams.finalExams.from"
              control={control}
              textFieldProps={{
                required: true,
              }}
            />
            <DateInputPicker
              label="To"
              name="exams.finalExams.to"
              control={control}
              textFieldProps={{
                required: true,
              }}
            />
          </CustomFormControl>
          {/* </FormControl> */}
        </Paper>
      </Stack>
    </div>
  );
};

export default Exams;
