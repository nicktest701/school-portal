import React from 'react';
import { ListItemText, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
function CustomTableTitle({ icon, title,subtitle }) {
  return (
    <Stack
      direction='row'
      columnGap={2}
      justifyContent='center'
      alignItems='center'
    >
      <img alt='ico' src={icon} style={{ width: '45px', heigth: '45px' }} />
     <ListItemText primary={title} primaryTypographyProps={{
      fontSize:20,fontWeight:'bold'
     }} secondary={subtitle}/>
    </Stack>
  );
}

CustomTableTitle.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
 subtitle: PropTypes.string,
};
export default CustomTableTitle;
