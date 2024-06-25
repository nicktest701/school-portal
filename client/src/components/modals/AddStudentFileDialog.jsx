import React, { useContext, useState } from 'react';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from '@mui/material';

import Swal from 'sweetalert2';
import LoadingButton from '@mui/lab/LoadingButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';

import { postManyStudents } from '../../api/studentAPI';
import useLevel from '../hooks/useLevel';
import {
  alertError,
  alertSuccess,
} from '../../context/actions/globalAlertActions';
import { UserContext } from '../../context/providers/UserProvider';
import { IMPORT_STUDENT_COLUMNS } from '../../mockup/columns/studentColumns';
import CustomizedMaterialTable from '../tables/CustomizedMaterialTable';
import { EMPTY_IMAGES } from '../../config/images';
import CustomDialogTitle from '../dialog/CustomDialogTitle';

function AddStudentFileDialog() {
  const {
    userState: { session },
  } = useContext(UserContext);

  //Params
  const queryClient = useQueryClient();

  const [fieldError, setFieldError] = useState('');
  const [fieldValue, setFieldValue] = useState({ _id: '', type: '' });

  const { schoolSessionState, schoolSessionDispatch } =
    useContext(SchoolSessionContext);
  const fileData = schoolSessionState.addStudentFileData;

  //Get All levels
  const { levelsOption } = useLevel();

  //CLOSE File Dialog
  const handleCloseDialog = () => {
    Swal.fire({
      title: 'Exiting',
      text: 'Do you want to exit?',
      showCancelButton: true,
      // backdrop: false,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        schoolSessionDispatch({ type: 'closeAddStudentFileDialog' });
      }
    });
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: postManyStudents,
  });
  const handlePostStudents = () => {
    setFieldError('');

    if (fieldValue._id === '') {
      setFieldError('Please select a level!');

      return;
    }

    const studentInfo = {
      students: fileData?.data,
      session: {
        sessionId: session.sessionId,
        termId: session.termId,
        levelId: fieldValue._id,
      },
      type: fileData.type,
    };

    Swal.fire({
      title: 'Importing students',
      text: `Do you want to import students in ${fieldValue.type}?`,
      showCancelButton: true,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutateAsync(studentInfo, {
          onSettled: () => {
            queryClient.invalidateQueries(['all-students']);
          },
          onSuccess: (data) => {
            schoolSessionDispatch(alertSuccess(data));
            schoolSessionDispatch({ type: 'closeAddStudentFileDialog' });
          },
          onError: (error) => {
            schoolSessionDispatch(alertError(error));
          },
        });
      }
    });
  };

  return (
    <Dialog open={fileData.open} fullScreen fullWidth>
      <CustomDialogTitle
        title='Students'
        subtitle='import students from file or previous academic year'
        onClose={handleCloseDialog}
      />

      <DialogActions sx={{ paddingX: 3 }}>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <LoadingButton
          variant='contained'
          loading={isLoading}
          onClick={handlePostStudents}
        >
          Import Students
        </LoadingButton>
      </DialogActions>

      <Autocomplete
        size='small'
        options={levelsOption}
        noOptionsText='No Level available'
        getOptionLabel={(option) => option.type || ''}
        isOptionEqualToValue={(option, value) =>
          value._id === undefined ||
          value._id === '' ||
          value._id === option._id
        }
        value={fieldValue}
        onChange={(e, value) => setFieldValue(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Select Level'
            size='small'
            error={Boolean(fieldError)}
            helperText={fieldError}
            required
            FormHelperTextProps={{
              sx: {
                color: 'error.main',
              },
            }}
          />
        )}
        sx={{ width: 250, marginLeft: 3 }}
      />

      <DialogContent>
        {fileData.data?.length === 0 ? (
          <Typography>No data available</Typography>
        ) : (
          <CustomizedMaterialTable
            title={fieldValue?.type || 'Students'}
            icon={EMPTY_IMAGES.student}
            columns={IMPORT_STUDENT_COLUMNS}
            data={fileData?.data}
            options={{
              pageSize: 10,
              pageSizeOptions: [10, 20, 30, 50],
            }}
            actions={[]}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AddStudentFileDialog;
