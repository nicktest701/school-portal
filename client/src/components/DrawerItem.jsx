import { useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { NavLink } from 'react-router-dom';

const DrawerItem = ({ title, icon, to }) => {
  const { palette } = useTheme();

  const myLinkStyles = ({ isActive }) => {
    return {
      textDecoration: 'none',
      color: isActive ? `${palette.secondary.main}` : '#fff',
      // color: `${palette.text.primary}`,
      backgroundColor: isActive ? 'rgba(255,255,255,0.3)' : null,
      fontWeight: isActive ? 'bold' : '400',
      whiteSpace: 'nowrap',
      borderRadius: 4,
    };
  };

  return (
    <NavLink to={to} style={myLinkStyles}>
      <Stack
        direction='row'
        justifyContent='flex-start'
        alignItems='center'
        sx={{
          p: { xs: 1, sm: '12px' },
          cursor: 'pointer',
          width: { xs: 'inherit', md: 150 },

          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.1)',
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
            // color: 'white',
          }}
        >
          {title}
        </Typography>
      </Stack>
    </NavLink>
  );
};

export default DrawerItem;
