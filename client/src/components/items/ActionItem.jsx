import { MenuRounded } from '@mui/icons-material';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import { Stack } from '@mui/material';
import React from 'react';

function ActionItem({
  viewProps,
  editProps,
  deleteProps,
  handleView,
  handleEdit,
  handleDelete,
}) {
  return (
    <Stack direction='row' spacing={2}>
      {handleView && (
        <MenuRounded
          className='ico'
          onClick={handleView}
          {...viewProps}
          sx={{
            color: 'secondary.main !important',
          }}
        />
      )}
      {handleEdit && (
        <Edit className='ico' onClick={handleEdit} {...editProps} />
      )}
      {handleDelete && (
        <Delete className='ico' onClick={handleDelete} {...deleteProps} />
      )}
    </Stack>
  );
}

export default ActionItem;
