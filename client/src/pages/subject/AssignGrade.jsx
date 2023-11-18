import React, { useContext, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Autocomplete,
  TextField,
  List,
  Typography,
  ListItem,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';

import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';

import {
  alertError,
  alertSuccess,
} from '../../context/actions/globalAlertActions';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import LevelSubjectItem from '../../components/items/LevelSubjectItem';
import useLevel from '../../components/hooks/useLevel';
import { assignGradeToLevel } from '../../api/levelAPI';

const AssignGrade = () => {
  const {
    schoolSessionState: {
      assignGrades: {
        open,
        data: { name, ratings },
      },
    },
    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);
  const queryClient = useQueryClient();
  const [levels, setLevels] = useState([]);

  const [levelList, setLevelList] = useState([]);

  const { levelsOption, levelLoading } = useLevel();

  const handleAddLevel = () => {
    const newLevels = _.values(
      _.merge(_.keyBy([...levelList, ...levels], '_id'))
    );

    setLevelList(newLevels);

    setLevels([]);
  };

  const handleRemoveLevel = (searchLevel) => {
    setLevelList((prev) => {
      const filteredLevels = prev.filter(({ type }) => type !== searchLevel);

      return filteredLevels;
    });
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: assignGradeToLevel,
  });

  const handleSaveLevels = () => {
    const ids = _.map(levelList, '_id');

    const info = {
      grade: ratings,
      levels: ids,
    };

    mutateAsync(info, {
      onSettled: () => {
        queryClient.invalidateQueries(['levels']);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
        setLevelList([]);
        handleClose();
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  const handleClose = () => {
    schoolSessionDispatch({
      type: 'assignGrade',
      payload: { open: false, data: {} },
    });
  };

  // console.log(levelsOption);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
      <CustomDialogTitle
        title='Assign Grade'
        subtitle='Add the selected grading system to your levels'
        onClose={handleClose}
      />
      <DialogContent>
        <Stack spacing={2} paddingY={2}>
          <Typography variant='h6' color='secondary'>
            {name}
          </Typography>

          <Stack direction='row' spacing={2} alignItems='center'>
            <Autocomplete
              multiple
              freeSolo
              fullWidth
              defaultValue={[]}
              loading={levelLoading}
              loadingText='Loading Levels.Please Wait...'
              options={levelsOption}
              disableCloseOnSelect
              getOptionLabel={(option) => option?.type || ''}
              renderOption={(props, option, state) => {
                return (
                  <ListItem
                    {...props}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Checkbox checked={state?.selected} />
                    <ListItemText primary={option?.type} />
                  </ListItem>
                );
              }}
              value={levels}
              onChange={(e, value) => setLevels(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Select Level to assign'
                  size='small'
                />
              )}
            />
            <Button variant='contained' size='small' onClick={handleAddLevel}>
              Add
            </Button>
          </Stack>
          <List sx={{ maxHeight: 400 }}>
            {_.isEmpty(levelList) ? (
              <Typography>No Level selected</Typography>
            ) : (
              levelList.map(({ _id, type }) => {
                return (
                  <LevelSubjectItem
                    key={_id}
                    name={type}
                    removeSubject={handleRemoveLevel}
                  />
                );
              })
            )}
          </List>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <LoadingButton
          disabled={levelList.length === 0}
          variant='contained'
          onClick={handleSaveLevels}
          loading={isLoading}
        >
          {isLoading ? 'Please wait' : 'Assign Grade'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AssignGrade;
