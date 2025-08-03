import { Controller } from "react-hook-form";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Typography,
  FormControl,
  FormHelperText,
} from "@mui/material";

const CustomRadioInput = ({ title, control, name }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, onBlur },
        fieldState: { error },
      }) => (
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={3}
        >
          <Typography
            // fontSize={13}
            variant="body2"
            sx={{ fontWeight: "bold", width: "40%" }}
          >
            {title}
          </Typography>
          <FormControl component="fieldset" error={!!error}>
            <RadioGroup
              row
              aria-labelledby="status"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            >
              <FormControlLabel
                value="Yes"
                control={<Radio size="small" />}
                label="Yes"
              />
              <FormControlLabel
                value="No"
                control={<Radio size="small" />}
                label="No"
              />
            </RadioGroup>
            {error && <FormHelperText>{error?.message}</FormHelperText>}
          </FormControl>
        </Stack>
      )}
    />
  );
};

export default CustomRadioInput;
