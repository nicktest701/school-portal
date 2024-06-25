import React, { useContext, useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import ButtonGroup from '@mui/material/ButtonGroup';
import PublishIcon from '@mui/icons-material/Publish';

import { SchoolSessionContext } from '../../../context/providers/SchoolSessionProvider';
import { readCSV } from '../../../config/readCSV';
import { readXLSX } from '../../../config/readXLSX';
import PreviousSession from '../PreviousSession';
import { ArrowBackRounded, NoteRounded, School } from '@mui/icons-material';
import PersonalInformation from './PersonalInformation';
import ParentInfo from './ParentInfo';
import MedicalInformation from './MedicalInformation';
import AcademicInformation from './AcademicInformation';
import PhotoUpload from './PhotoUpload';
import { Box, IconButton } from '@mui/material';
import CustomStepper from '../../../components/custom/CustomStepper';
import CustomTitle from '../../../components/custom/CustomTitle';

const CSV_FILE_TYPE = 'text/csv';
const XLSX_FILE_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
const XLS_FILE_TYPE = 'application/vnd.ms-excel';

const StudentInfo = () => {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  const [mode, setMode] = useState('personal-info');

  const [openPreviousSession, setOpenPreviousSession] = useState(false);

  const confirmMessage =
    'Are you sure you want to leave this page? Your changes may not be saved.';

  useEffect(() => {
    const beforeUnloadHandler = (e) => {
      e.preventDefault();
      e.returnValue = confirmMessage;
    };

    window.addEventListener('beforeunload', beforeUnloadHandler);

    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
    };
  }, []);

  //LOAD Students from file excel,csv
  function handleLoadFile(e) {
    const files = e.target.files[0];

    try {
      const reader = new FileReader();
      files.type === CSV_FILE_TYPE
        ? reader.readAsBinaryString(files)
        : reader.readAsArrayBuffer(files);

      reader.onload = function (event) {
        let students = [];

        if (files.type === XLSX_FILE_TYPE || files.type === XLS_FILE_TYPE) {
          students = readXLSX(event.target.result);
        }

        if (files.type === CSV_FILE_TYPE) {
          students = readCSV(event.target.result);
        }
        if (students.length !== 0) {
       
          schoolSessionDispatch({
            type: 'openAddStudentFileDialog',
            payload: { data: students, type: 'file' },
          });
        }
      };
    } catch (error) {
      //console.log(error.message);
    }
  }

  const getPage = () => {
    let prevPage = mode;
    switch (mode) {
      case 'photo-info':
        prevPage = 'personal-info';
        break;
      case 'parent-info':
        prevPage = 'photo-info';
        break;
      case 'medical-info':
        prevPage = 'parent-info';
        break;
      case 'academic-info':
        prevPage = 'medical-info';
        break;
      default:
        prevPage = 'photo-info';
    }

    return prevPage;
  };

  return (
    <>
      {/* <Prompt when={true} message={confirmMessage} /> */}
      <>
        <CustomTitle
          title='New Student'
          subtitle='  Track,manage and control academic and class activities'
          icon={<School sx={{ width: 30, height: 30 }} />}
          color='primary.main'
        />

        {/* Stepper  */}
        <CustomStepper />
        <Box>
          {mode !== 'personal-info' && (
            <IconButton onClick={() => setMode(getPage())}>
              <ArrowBackRounded />
            </IconButton>
          )}

          <ButtonGroup
            size='small'
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              pt: 2,
            }}
          >
            <Button>
              <FormLabel
                htmlFor='studentFile'
                title='Import students'
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',

                  gap: 1,
                  color: 'primary.main',
                  fontSize: 11,
                  cursor: 'pointer',
                }}
              >
                <NoteRounded />
                <Typography variant='caption'>From file</Typography>

                <Input
                  type='file'
                  id='studentFile'
                  name='studentFile'
                  hidden
                  inputProps={{
                    accept: '.xlsx,.xls,.csv',
                  }}
                  onChange={handleLoadFile}
                  onClick={(e) => {
                    e.target.value = null;
                    e.currentTarget.value = null;
                  }}
                />
              </FormLabel>
            </Button>
            <Button
              startIcon={<PublishIcon />}
              onClick={() => setOpenPreviousSession(true)}
            >
              From Previous Sessions
            </Button>
          </ButtonGroup>
        </Box>

        <Container sx={{ py: 2, border: '1px solid lightgray' }}>
          {mode === 'personal-info' && (
            <PersonalInformation mode={mode} setMode={setMode} />
          )}
          {mode === 'photo-info' && (
            <PhotoUpload mode={mode} setMode={setMode} />
          )}
          {mode === 'parent-info' && (
            <ParentInfo mode={mode} setMode={setMode} />
          )}

          {mode === 'medical-info' && (
            <MedicalInformation mode={mode} setMode={setMode} />
          )}

          {mode === 'academic-info' && (
            <AcademicInformation setMode={setMode} />
          )}
        </Container>
      </>
      <PreviousSession
        open={openPreviousSession}
        setOpen={setOpenPreviousSession}
      />
    </>
  );
};

StudentInfo.propTypes = {};

export default StudentInfo;
