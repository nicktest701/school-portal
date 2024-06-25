import {
  Autocomplete,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import useLevel from '../../components/hooks/useLevel';

const LevelFeeInformation = () => {
  const [currentLevel, setCurrentLevel] = useState({
    _id: '',
    type: '',
  });
  const { levelsOption, levelLoading } = useLevel();

  return (
    <Container sx={{ paddingY: 2 }}>
      <Typography variant='h5'>Class Fee Information</Typography>
      <Typography variant='caption'>
        Manage all student fee information
      </Typography>

      <Stack paddingY={3}>
        <Autocomplete
          sx={{ width: 250 }}
          loading={levelLoading}
          fullWidth
          options={levelsOption}
          disableClearable
          closeText=' '
          noOptionsText='No Level Available'
          isOptionEqualToValue={(option, value) =>
            value._id === undefined ||
            value._id === '' ||
            option._id === value._id
          }
          getOptionLabel={(option) => option.type || ''}
          value={currentLevel}
          onChange={(e, value) => setCurrentLevel(value)}
          onClose={() => {}}
          renderInput={(params) => (
            <TextField {...params} label='Select Level' size='small' />
          )}
        />
      </Stack>

      <CustomizedMaterialTable
        columns={[]}
        data={[]}
        actions={[]}
        options={{
          pageSize: 10,
        }}
      />
    </Container>
  );
};

export default LevelFeeInformation;
