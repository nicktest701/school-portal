import { PersonRounded } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Divider, Stack, Tab } from '@mui/material';
import React, { useState } from 'react';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import { EXAMS_COLUMNS } from '../../mockup/columns/sessionColumns';
import { useNavigate } from 'react-router-dom';
import useLevel from '../../components/hooks/useLevel';
import exams_icon from '../../assets/images/header/exams_ico.svg';
import { EMPTY_IMAGES } from '../../config/images';
import CustomTitle from '../../components/custom/CustomTitle';

const ExamsHome = () => {
  const navigate = useNavigate();

  const [tab, setTab] = useState('1');
  const { levelsOption, levelLoading } = useLevel();

  const handleRowClick = (levelId, type) => {
    console.log(type);
    navigate(`level/${levelId}/${type}`, {
      state: {
        level: type,
      },
    });
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: 350,
        color: 'primary.contrastText',
        background: 'linear-gradient(to top right,#ffc09f,#012e54)',
      }}
    >
      <Container
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <CustomTitle
          title='Examination Portal'
          subtitle=' Track,manage and control academic and class activities'
          img={exams_icon}
          color='text.main'
        />

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
            <CustomizedMaterialTable
              title='Current Levels'
              icon={exams_icon}
              isLoading={levelLoading}
              columns={EXAMS_COLUMNS}
              data={levelsOption !== undefined ? levelsOption : []}
              actions={[]}
              onRowClick={({ _id, type }) => handleRowClick(_id, type)}
              addButtonImg={EMPTY_IMAGES.student}
              addButtonMessage='😑 No Students recently added !!!!'
            />
          </TabPanel>
        </TabContext>
      </Container>
    </Box>
  );
};

export default ExamsHome;
