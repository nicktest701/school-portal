import React from 'react';

import { Box, IconButton } from '@mui/material';

import DrawerItem from '../../components/DrawerItem';
import { ExitToAppSharp } from '@mui/icons-material';
import PropTypes from 'prop-types';

const HorizontalSidebar = ({ onLogOut }) => {
  return (
    <Box
      sx={{
        width: 200,
        display: { xs: 'flex', sm: 'none' },
        columnGap: 1,
        overflowX: 'scroll',
        overscrollBehaviorInline: 'contain',
        '&::-webkit-scrollbar': {
          width: 'none',
        },
        paddingY: 1,
      }}
    >
      {/* <Divider /> */}
      {/* <Stack padding={1} direction='row'> */}
      <DrawerItem title='Dashboard' to='/' />
      <DrawerItem title='Session' to='/session' />
      <DrawerItem title='Levels & Subjects' to='/level' />
      <DrawerItem title='Student' to='/student' />
      <DrawerItem title='Teacher' to='/teacher' />
      <DrawerItem title='School Fees' to='/fee' />
      <DrawerItem title='Examination' to='/examination' />
      {/* <DrawerItem
          title="Assessment"
          icon={<EventNoteRoundedIcon />}
          to="/assessment"
        /> */}
      <DrawerItem title='SMS Portal' to='/sms' />
      <DrawerItem title='Users' to='/users' />
      <DrawerItem title='Settings' to='/settings' />
      <DrawerItem title='About' to='/about' />
      <IconButton
        sx={{ display: { xs: 'inline-flex', md: 'none' } }}
        onClick={onLogOut}
      >
        <ExitToAppSharp />
      </IconButton>
      {/* </Stack> */}
    </Box>
  );
};

HorizontalSidebar.propTypes = {
  onLogOut: PropTypes.func,
};

export default HorizontalSidebar;
