import React, { useContext } from 'react';

import {
  Avatar,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import Person2Rounded from '@mui/icons-material/Person2Rounded';
import LocalLibraryRounded from '@mui/icons-material/LocalLibraryRounded';
import PaymentsRounded from '@mui/icons-material/PaymentsRounded';
import SmsRounded from '@mui/icons-material/SmsRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import BedroomBabyRoundedIcon from '@mui/icons-material/BedroomBabyRounded';
import DataThresholdingRoundedIcon from '@mui/icons-material/DataThresholdingRounded';
import DrawerItem from '../../components/DrawerItem';
import { ExitToAppSharp, SchoolRounded } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { UserContext } from '../../context/providers/userProvider';


const Sidebar = ({ onLogOut }) => {
  const school_info = JSON.parse(localStorage.getItem('@school_info'));

  const {
    userState: { user },
  } = useContext(UserContext);

  return (
    <Container
      sx={{
        display: { xs: 'none', sm: 'flex' },
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: { xs: 'center', md: 'flex-start' },
        width: { xs: 0, sm: 80, md: 250 },
        height: '100%',
        borderRight: '2px solid #F3F5F9',
        paddingY: 1,
        transition: 'all 0.4s ease-in-out',
        gap:1
      }}
    >
      <Stack alignItems={{ xs: 'center', sm: 'left' }}>
        <IconButton color='primary'>
          {school_info?.badge ? (
            <Avatar
              alt='school logo'
              loading='lazy'
              srcSet={`${import.meta.env.VITE_BASE_URL}/images/users/${
                school_info?.badge
              }`}
              sx={{
                width: 70,
                height: 70,
              }}
            />
          ) : (
            <SchoolRounded sx={{ width: 80, height: 80 }} />
          )}
        </IconButton>
        <Stack alignItems='start' display={{ xs: 'none', md: 'block' }}>
          <Typography fontWeight='bold' textAlign='center'>
            {school_info?.name}
          </Typography>
          <Typography variant='body2' textAlign='center'>
            &ldquo; {school_info?.motto} &rdquo;
          </Typography>
        </Stack>
      </Stack>
      {/* <Divider /> */}
      <Stack
        padding={1}
        justifyContent='flex-start'
        alignItems='flex-start'
        // border='1px solid black'
        flex={1}
      >
        <DrawerItem title='Dashboard' icon={<GridViewRoundedIcon />} to='/' />
        {user?.role === 'administrator' && (
          <DrawerItem
            title='Sessions'
            icon={<ArticleRoundedIcon />}
            to='/session'
          />
        )}
        <DrawerItem
          title='Levels & Subjects'
          icon={<BedroomBabyRoundedIcon />}
          to='/level'
        />
        <DrawerItem
          title='Students'
          icon={<LocalLibraryRounded />}
          to='/student'
        />
        <DrawerItem title='Teachers' icon={<Person2Rounded />} to='/teacher' />
        <DrawerItem title='School Fees' icon={<PaymentsRounded />} to='/fee' />
        <DrawerItem
          title='Exams Portal'
          icon={<DataThresholdingRoundedIcon />}
          to='/examination'
        />
        {/* <DrawerItem
          title="Assessment"
          icon={<EventNoteRoundedIcon />}
          to="/assessment"
        /> */}
        <DrawerItem title='Messages' icon={<SmsRounded />} to='/sms' />
        {user?.role === 'administrator' && (
          <>
            <DrawerItem
              title='Users'
              icon={<PeopleAltRoundedIcon />}
              to='/users'
            />
            <DrawerItem
              title='Settings'
              icon={<SettingsRoundedIcon />}
              to='/settings'
            />
          </>
        )}
        <DrawerItem title='About' icon={<InfoRoundedIcon />} to='/about' />
      </Stack>

      <Stack>
        <Button
          variant='outlined'
          color='primary'
          fullWidth
          // startIcon={<CancelRoundedIcon />}
          sx={{ display: { xs: 'none', md: 'block' } }}
          onClick={onLogOut}

        >
          Log out
        </Button>
        <IconButton
          sx={{ display: { xs: 'inline-flex', md: 'none' } }}
          onClick={onLogOut}
        >
          <ExitToAppSharp />
        </IconButton>
      </Stack>
    </Container>
  );
};

Sidebar.propTypes = {
  onLogOut: PropTypes.func,
};

export default Sidebar;
