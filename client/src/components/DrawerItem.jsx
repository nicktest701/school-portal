import { useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { NavLink } from 'react-router-dom';

const DrawerItem = ({ title, icon, to }) => {
  const { palette } = useTheme();

  const myLinkStyles = ({ isActive }) => {
    return {
      textDecoration: 'none',
      color: `${palette.text.primary}`,
      backgroundColor: isActive ? palette.grey[300] : null,
      fontWeight: isActive ? 'bold' : '400',
      whiteSpace: 'nowrap',
      borderRadius:4
    };
  };

  return (
    <NavLink to={to} style={myLinkStyles} >
      <Stack
        direction='row'
        justifyContent='flex-start'
        alignItems='center'
        sx={{
          p: { xs: 1, sm: '12px' },
          cursor: 'pointer',
          width: { xs: 'inherit', md: 150 },

          '&:hover': {
            backgroundColor: palette.grey[300],
            borderRadius: '4px',
          },
        }}
        spacing={1}
      >
        {icon}
        <Typography
          variant='caption'
          sx={{
            display: { xs: 'block', sm: 'none', md: 'block' },
            whiteSpace: 'noWrap',
          }}
        >
          {title}
        </Typography>
      </Stack>
    </NavLink>
  );
};

export default DrawerItem;
