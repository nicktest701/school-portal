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
export default function ScoreSelection({ control, errors }) {
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
    </Paper>
  );
}
