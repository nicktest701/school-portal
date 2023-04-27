import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

function CustomDatePicker({
  label,
  date,
  setDate,
  error,
  touched,
  disableFuture,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        size='small'
        label={label}
        value={date}
        onChange={(date) => setDate(date)}
        format=' Do MMMM YYYY'
        disableMaskedInput
        disableFuture={disableFuture}
        slotProps={{
          textField: {
            helperText: touched && error,
          },
        }}
        sx={{ width: '100%' }}
      />
    </LocalizationProvider>
  );
}

export default CustomDatePicker;
