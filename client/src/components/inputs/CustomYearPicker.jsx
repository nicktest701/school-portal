import TextField from '@mui/material/TextField';
import Datetime from 'react-datetime';
import moment from 'moment';

///
import '../../theme/react-datetime.css';

console.log(1)
const CustomYearPicker = ({ label, year, setYear }) => {
  console.log(2)
  return (
    <Datetime
      dateFormat='YYYY'
      timeFormat={false}
      initialViewDate='years'
      value={year}
      initialValue={moment().format('YYYY')}
      onChange={(date) => setYear(date.format('YYYY'))}
      closeOnSelect={true}
      renderInput={(params) => {
        return <TextField {...params} label={label} size='small' fullWidth />;
      }}
    />
  );
};

export default CustomYearPicker;
