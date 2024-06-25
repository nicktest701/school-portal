import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
} from '@mui/material';
import _ from 'lodash';
import Swal from 'sweetalert2';
import LoadingButton from '@mui/lab/LoadingButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import MaterialTable from 'material-table';
import { tableIcons } from '../../config/tableIcons';
import { useLocation } from 'react-router-dom';
import { postManyStudents } from '../../api/studentAPI';
import { UserContext } from '../../context/providers/UserProvider';
import {
  alertError,
  alertSuccess,
} from '../../context/actions/globalAlertActions';

function FileDialog() {
  const {
    userState: { session },
  } = useContext(UserContext);

  //Params
  const { state } = useLocation();
  const { palette } = useTheme();
  const queryClient = useQueryClient();
  const [columns, setColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { schoolSessionState, schoolSessionDispatch } =
    useContext(SchoolSessionContext);
  const fileData = schoolSessionState.fileData;

  useEffect(() => {
    if (fileData.data.length > 0) {
      const modifiedColumns = fileData.columns.map((column) => {
        return {
          title: _.upperCase(column),
          field: column,
        };
      });
      setColumns(modifiedColumns);
    }
    setIsLoading(false);
  }, [fileData]);

  //CLOSE File Dialog
  const handleCloseDialog = () => {
    Swal.fire({
      title: 'Exiting',
      text: 'Do you want to exit?',

      showCancelButton: true,
      backdrop: false,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        schoolSessionDispatch({ type: 'closeFileDialog' });
      }
    });
  };

  const { mutateAsync } = useMutation({
    mutationFn: postManyStudents,
  });
  const handlePostStudents = () => {
    setIsLoading(true);
    const data = {
      students: fileData.data,
      session: {
        sessionId: session.sessionId,
        termId: session.termId,
        levelId: state.levelId,
      },
      type: fileData.type,
    };

    Swal.fire({
      title: 'Importing students',
      text: 'Do you want to import ?',
      showCancelButton: true,
      backdrop: false,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutateAsync(data, {
          onSettled: () => {
            queryClient.invalidateQueries(['current-students']);
            setIsLoading(false);
          },
          onSuccess: (data) => {
            schoolSessionDispatch(alertSuccess(data));
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
    <Dialog open={fileData.open} fullScreen fullWidth>
      <DialogTitle>Preview</DialogTitle>
      <DialogActions sx={{ paddingX: 3 }}>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <LoadingButton
          variant='contained'
          loading={isLoading}
          onClick={handlePostStudents}
        >
          Save
        </LoadingButton>
      </DialogActions>
      <DialogContent>
        {fileData.data?.length === 0 ? (
          <Typography>No data available</Typography>
        ) : (
          <MaterialTable
            title='Students'
            isLoading={isLoading}
            icons={tableIcons}
            columns={columns}
            data={fileData.data}
            options={{
              pageSize: 10,
              pageSizeOptions: [10, 20, 30, 50],
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default FileDialog;
