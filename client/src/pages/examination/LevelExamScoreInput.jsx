import {
  Autocomplete,
  Button,
  Container,
  Dialog,
  DialogContent,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';
import { LoadingButton } from '@mui/lab';
import _ from 'lodash';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSubjectsForLevel } from '../../api/levelAPI';
import { useParams } from 'react-router-dom';
import Transition from '../../components/animations/Transition';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import {
  alertError,
  alertSuccess,
} from '../../context/actions/globalAlertActions';
import { readXLSX } from '../../config/readXLSX';
import { readCSV } from '../../config/readCSV';
import { NoteRounded } from '@mui/icons-material';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import AnimatedContainer from '../../components/animations/AnimatedContainer';
import { EMPTY_IMAGES } from '../../config/images';
import { postBulkExams } from '../../api/ExaminationAPI';
import { generateGrade } from '../../config/generateGrade';
import { UserContext } from '../../context/providers/userProvider';

const LevelExamScoreInput = ({ open, setOpen }) => {
  const CSV_FILE_TYPE = 'text/csv';
  const XLSX_FILE_TYPE =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  const XLS_FILE_TYPE = 'application/vnd.ms-excel';

  const { schoolSessionState, schoolSessionDispatch } =
    useContext(SchoolSessionContext);
  const {
    userState: { session },
  } = useContext(UserContext);
  const { palette } = useTheme();
  const { levelId } = useParams();
  const queryClient = useQueryClient();
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldError, setFieldError] = useState('');
  const [mainError, setMainError] = useState('');
  const [subject, setSubject] = useState('');

  const subjects = useQuery({
    queryKey: ['subjects'],
    queryFn: () => getSubjectsForLevel(levelId),
    enabled: !!levelId,
  });

  useEffect(() => {
    const cols = [
      'ID',
      'Student',
      'Class Score',
      'Exams Score',
      'Total Score',
      'Grade',
      'Remarks',
    ];
    const modifiedColumns = cols.map((col) => {
      return {
        title: col,
        field: _.camelCase(col),
        hidden: col === 'ID',
      };
    });
    setColumns(modifiedColumns);
  }, []);

  useEffect(() => {
    if (data?.length > 0) {
      const modifiedData = data?.map((item) => {
        return {
          ...item,
          subject,
        };
      });
      setData(modifiedData);
    }
  }, [subject]);

  //LOAD Results from file excel,csv
  function handleLoadFile(e) {
    if (subject === '') {
      setFieldError('Please select a Subject!');
      setIsLoading(false);
      return;
    }
    setMainError(false);
    setIsLoading(true);
    const files = e.target.files[0];

    try {
      const reader = new FileReader();
      files.type === CSV_FILE_TYPE
        ? reader.readAsBinaryString(files)
        : reader.readAsArrayBuffer(files);

      reader.onload = async function (event) {
        let results = [];

        if (files.type === XLSX_FILE_TYPE || files.type === XLS_FILE_TYPE) {
          results = readXLSX(event.target.result);
        }

        if (files.type === CSV_FILE_TYPE) {
          results = readCSV(event.target.result);
        }
        if (results.length !== 0) {
          const modifiedResults = results.map((item) => {
            const classScore = Number(Object.values(item)[2] || 0);
            const examsScore = Number(Object.values(item)[3] || 0);

            if (classScore > 50 || examsScore > 50) {
              setMainError(
                'It seems there is some inconsistencies in your results.Class score or Exams score cannot be more than 50 marks!'
              );
              setIsLoading(false);
              setData([]);
              throw 'It seems there is some inconsistencies in your results.Class score or Exams score cannot be more than 50';
            }

            return {
              id: Object.values(item)[0],
              student: Object.values(item)[1],
              subject,
              classScore,
              examsScore,
              ...generateGrade(classScore, examsScore),
              session: session?.sessionId,
              term: session?.termId,
              level: levelId,
            };
          });

          const values = await Promise.all(modifiedResults);
          setData(values);
        }
      };
    } catch (error) {
      setMainError(error);
    } finally {
      setIsLoading(false);
    }
  }

  //CLOSE File Dialog
  const handleCloseDialog = () => {
    Swal.fire({
      title: 'Exiting',
      text: 'Do you want to exit?',
      confirmButtonColor: palette.primary.main,
      showCancelButton: true,
      backdrop: false,
      // background:'#ccc'
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        setOpen(false);
      }
    });
  };

  //CLOSE File Dialog
  const discardChanges = () => {
    Swal.fire({
      title: 'Discarding',
      text: 'Discard Changes?',
      confirmButtonColor: palette.primary.main,
      showCancelButton: true,
      backdrop: false,
      // background:'#ccc'
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        setData([]);
      }
    });
  };

  const { mutateAsync } = useMutation({
    mutationFn: postBulkExams,
  });

  const handlePostResults = () => {
    setFieldError('');
    setIsLoading(true);

    Swal.fire({
      title: 'Importing results',
      text: `Do you want to import results in ${subject}?`,
      confirmButtonColor: palette.primary.main,
      showCancelButton: true,
      backdrop: false,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutateAsync(data, {
          onSettled: () => {
            queryClient.invalidateQueries(['all-results']);
            setIsLoading(false);
          },
          onSuccess: (data) => {
            schoolSessionDispatch(alertSuccess(data));
            schoolSessionDispatch({ type: 'closeAddResultFileDialog' });
          },
          onError: (error) => {
            schoolSessionDispatch(alertError(error));
          },
        });
      }
      setIsLoading(false);
    });
  };

  return (
    <Dialog TransitionComponent={Transition} open={open} fullScreen fullWidth>
      <CustomDialogTitle title='Exams Scores for' onClose={handleCloseDialog} />

      <Stack spacing={2} py={3} width='100%'>
        <FormLabel
          htmlFor='resultFile'
          title='Import results'
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid lightgray',
            width: 300,
            padding: 1,
            gap: 1,
            color: 'primary.main',
            alignSelf: 'center',
            fontSize: 11,
            cursor: 'pointer',
          }}
        >
          <NoteRounded />
          <Typography variant='caption'>
            {isLoading ? 'Please Wait...' : 'Select File'}
          </Typography>

          <Input
            type='file'
            id='resultFile'
            name='resultFile'
            hidden
            inputProps={{
              accept: '.xlsx,.xls,.csv',
            }}
            onChange={(event) => handleLoadFile(event)}
            onClick={(e) => {
              e.target.value = null;
              e.currentTarget.value = null;
            }}
          />
        </FormLabel>

        <Stack
          width='100%'
          direction={{ xs: 'column', md: 'row' }}
          justifyContent='space-between'
          alignItems='center'
          spacing={2}
          px={14}
        >
          <Autocomplete
            options={subjects.data?.subjects}
            loading={subjects.isLoading}
            getOptionLabel={(option) => option || ''}
            isOptionEqualToValue={(option, value) =>
              value === undefined || value === '' || value === option
            }
            value={subject}
            onChange={(e, value) => setSubject(value)}
            sx={{ minWidth: 350 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Subject'
                size='small'
                sx={{
                  maxWidth: 320,
                }}
                error={fieldError !== ''}
                helperText={fieldError}
                required
                FormHelperTextProps={{
                  sx: {
                    color: 'error.main',
                  },
                }}
              />
            )}
          />
          {data?.length > 0 && (
            <AnimatedContainer>
              <Stack direction='row' spacing={3}>
                <Button onClick={discardChanges}>Cancel</Button>
                <LoadingButton variant='contained' onClick={handlePostResults}>
                  Save Results
                </LoadingButton>
              </Stack>
            </AnimatedContainer>
          )}
        </Stack>
      </Stack>

      <DialogContent>
        <Container>
          {mainError && (
            <FormHelperText sx={{ color: 'red' }}>{mainError}</FormHelperText>
          )}

          <CustomizedMaterialTable
            icon={EMPTY_IMAGES.score}
            search={true}
            exportFileName={`${subject} - `}
            isLoading={isLoading}
            title={subject}
            columns={columns}
            data={data}
            pa
            actions={[]}
          />
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default LevelExamScoreInput;
