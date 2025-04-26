import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  FormHelperText,
  Paper,
} from "@mui/material";
import { Controller } from "react-hook-form";
export default function ScoreSelection({ control, errors, isEdit }) {
  return (
    <Paper sx={{ p: 2, boxShadow: 1, borderRadius: 2 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Score Distribution Preference
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Select your preferred score distribution for classwork and exams. This
        determines how final grades are calculated based on your chosen ratio.
      </Typography>
      <Controller
        name="exams.scorePreference"
        control={control}
        rules={{ required: "Score preference is required" }}
        render={({ field }) => (
          <FormControl
            component="fieldset"
            error={!!errors.scorePreference}
            required
          >
            <FormLabel component="legend">Choose Score Ratio</FormLabel>

            <RadioGroup row {...field}>
              {["20/80", "30/70", "40/60", "50/50"].map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
            {errors.scorePreference && (
              <FormHelperText>{errors.scorePreference.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
      {isEdit && (
        <FormHelperText color="text.secondary" error={true} gutterBottom>
          NOTE: Changing the score preference will affect the entire results of
          students. Be sure to know what you are doing before making any
          changes.
        </FormHelperText>
      )}

      <Typography variant="body2" color="text.secondary" gutterBottom>
  The score distribution preference is used to calculate the final
        grades for the students. The ratio of classwork to exams is used to
        determine the weightage of each component in the final grade. For
        example, a ratio of 20/80 means that classwork contributes 20% to the
        final grade, while exams contribute 80%. Similarly, a ratio of 50/50
      </Typography>
    </Paper>
  );
}
