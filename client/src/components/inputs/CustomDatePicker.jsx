import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

function CustomDatePicker({
  label,
  date,
  setDate,
  error,
  helperText,
  disableFuture,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        label={label}
        value={date}
        onChange={(date) => setDate(date)}
        format='Do MMMM YYYY'
        disableMaskedInput
        disableFuture={disableFuture}
        slotProps={{
          textField: {
            fullWidth: true,
            size: 'small',
            error: error,
            helperText: helperText,
          },
        }}
        sx={{ width: '100%' }}
      />
    </LocalizationProvider>
  );
}

export default CustomDatePicker;
