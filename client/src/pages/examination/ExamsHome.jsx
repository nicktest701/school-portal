import { PersonRounded, StyleOutlined } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Divider, Stack, Tab, Typography } from '@mui/material';
import React, { useState } from 'react';

import Back from '../../components/Back';
import CustomParticle from '../../components/animations/CustomParticle';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import { EXAMS_COLUMNS } from '../../mockup/columns/sessionColumns';
import { useNavigate } from 'react-router-dom';
import useLevel from '../../components/hooks/useLevel';

const ExamsHome = () => {
  const navigate = useNavigate();

  const [tab, setTab] = useState('1');
  const { levelsOption, levelLoading } = useLevel();

  const handleRowClick = (levelId) => {
    navigate(`level/${levelId}`);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '400px',
        color: 'primary.contrastText',
        background: 'linear-gradient(to top right,#ffc09f,#012e54)',
      }}
    >
      <CustomParticle />
      <Container
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Back />
        <Container
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column-reverse', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            paddingY: 2,
            color: 'primary.contrastText',
          }}
        >
          <Stack color='primary.contrastText'>
            <Typography variant='h5'>Examination Portal</Typography>
            <Typography>
              Track,manage and control academic and class activities
            </Typography>
          </Stack>
          <StyleOutlined color='inherit' sx={{ width: 50, height: 50 }} />
        </Container>

        <Box paddingY={3}>
          <TabContext value={tab}>
            <TabList onChange={(e, value) => setTab(value)}>
              <Tab
                value='1'
                label='Levels'
                icon={<PersonRounded />}
                iconPosition='start'
                color='#fff'
              />
            </TabList>
            <Divider />
            <TabPanel value='1'>
              <Container>
                <Stack
                  spacing={1}
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent={{ xs: 'center', sm: 'space-between' }}
                  alignItems='center'
                ></Stack>

                <CustomizedMaterialTable
                  title='Current Levels'
                  isLoading={levelLoading}
                  columns={EXAMS_COLUMNS}
                  data={levelsOption !== undefined ? levelsOption : []}
                  actions={[]}
                  onRowClick={(rowData) => handleRowClick(rowData?._id)}
                />
              </Container>
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </Box>
  );
};

export default ExamsHome;
