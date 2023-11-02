import { ListItemText, Stack } from '@mui/material';
import PropTypes from 'prop-types';
function CustomTableTitle({ icon, title, subtitle }) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      columnGap={1}
      justifyContent='center'
      alignItems='center'
      p={2}
    >
      <img
        alt='ico'
        loading='lazy'
        src={icon}
        style={{ width: '40px', heigth: '40px' }}
        className='hide-on-print'
      />
      <ListItemText
        primary={title}
        primaryTypographyProps={{
          fontSize: { xs: 12, sm: 16 },
          fontWeight: 'bold',
        }}
        secondary={subtitle}
        className='hide-on-print'
      />
    </Stack>
  );
}

CustomTableTitle.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
export default CustomTableTitle;
