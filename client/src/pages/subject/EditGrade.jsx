import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  Stack,
  TextField,
} from '@mui/material';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import React, { useContext, useState } from 'react';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';
import { Formik } from 'formik';
import { gradesValidationSchema } from '../../config/validationSchema';
import GradeItem from './GradeItem';
import { GRADES, REMARKS } from '../../mockup/columns/sessionColumns';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getGrade, putGrade } from '../../api/gradeAPI';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import {
  alertError,
  alertSuccess,
} from '../../context/actions/globalAlertActions';
import { LoadingButton } from '@mui/lab';

function EditGrade() {
  const {
    schoolSessionState: {
      editGrades: { open, data },
    },
    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);

  const queryClient = useQueryClient();
  const [grades, setGrades] = useState([]);
  const [name, setName] = useState('');
  const initialValues = {
    lowestMark: 0,
    highestMark: 0,
    grade: '',
    remarks: '',
  };

  useQuery({
    queryKey: ['grade', data?._id],
    queryFn: () => getGrade(data?._id),
    enabled: !!data?._id,
    initialData: data,
    onSuccess: (data) => {
      setName(data?.name);
      setGrades(data?.ratings);
    },
  });

  const onSubmit = (values, option) => {
    values.id = uuid();

    const newGrades = _.values(
      _.merge(_.keyBy([...grades, values], 'remarks'))
    );
    setGrades(newGrades);
    option.resetForm();
  };

  const handleRemoveGrade = (gradeId) => {
    const filteredGrades = grades.filter(({ id }) => id !== gradeId);
    setGrades(filteredGrades);
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: putGrade,
  });

  const saveGrades = () => {
    const values = {
      _id: data?._id,
      name,
      ratings: grades,
    };

    mutateAsync(values, {
      onSettled: () => {
        queryClient.invalidateQueries(['grades']);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
        setGrades([]);
        handleCloseDialog();
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };



  

  const handleCloseDialog = () => {
    schoolSessionDispatch({
      type: 'editGrade',
      payload: { open: false, data: {} },
    });
  };

  return (
    <Dialog open={open}>
      <CustomDialogTitle
        title='New Grading System'
        subtitle='Add new grades and remarks'
        onClose={handleCloseDialog}
      />

      <DialogContent>
        <Stack spacing={3} py={2}>
          <TextField
            label='Name of Grading System'
            size='small'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Formik
            initialValues={initialValues}
            validationSchema={gradesValidationSchema}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              touched,
              setFieldValue,
              handleChange,
              handleSubmit,
            }) => {
              return (
                <Stack direction='row' spacing={1}>
                  <TextField
                    label='Lowest Mark'
                    type='number'
                    inputMode='numeric'
                    size='small'
                    value={values.lowestMark}
                    onChange={handleChange('lowestMark')}
                    error={Boolean(touched.lowestMark && errors.lowestMark)}
                    helperText={errors.lowestMark}
                  />
                  <TextField
                    label='Highest Mark'
                    type='number'
                    inputMode='numeric'
                    size='small'
                    value={values.highestMark}
                    onChange={handleChange('highestMark')}
                    error={Boolean(touched.highestMark && errors.highestMark)}
                    helperText={errors.highestMark}
                  />

                  <Autocomplete
                    freeSolo
                    options={GRADES}
                    getOptionLabel={(option) => option || ''}
                    defaultValue={values.grade}
                    value={values.grade}
                    onChange={(e, value) => setFieldValue('grade', value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Grade'
                        size='small'
                        // value={values.grade}
                        // onChange={handleChange('grade')}
                        error={Boolean(touched.grade && errors.grade)}
                        helperText={touched.grade && errors.grade}
                      />
                    )}
                  />
                  <Autocomplete
                    freeSolo
                    fullWidth
                    options={REMARKS}
                    getOptionLabel={(option) => option || ''}
                    defaultValue={values.remarks}
                    value={values.remarks}
                    onChange={(e, value) => setFieldValue('remarks', value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='remarks'
                        size='small'
                        // value={values.remarks}
                        // onChange={handleChange('remarks')}
                        error={Boolean(touched.remarks && errors.remarks)}
                        helperText={touched.remarks && errors.remarks}
                      />
                    )}
                  />
                  <Button
                    size='small'
                    variant='contained'
                    onClick={handleSubmit}
                  >
                    Add
                  </Button>
                </Stack>
              );
            }}
          </Formik>
          <Divider>
            <Chip label='Grades' />
          </Divider>
        </Stack>
        <List>
          <ListItem divider>
            <Stack
              direction='row'
              spacing={2}
              justifyContent='space-between'
              width='80%'
            >
              <FormLabel>Highest Mark</FormLabel>
              <FormLabel>Lowest Mark</FormLabel>
              <FormLabel>Grade</FormLabel>
              <FormLabel>Remarks</FormLabel>
              <ListItemSecondaryAction>
                <FormLabel>Action</FormLabel>
              </ListItemSecondaryAction>
            </Stack>
          </ListItem>
          {grades.map((item) => (
            <GradeItem
              key={item?.id}
              {...item}
              removeGrade={handleRemoveGrade}
            />
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <LoadingButton
          loading={isLoading}
          variant='contained'
          disabled={grades.length === 0}
          onClick={saveGrades}
        >
          Save Changes
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default EditGrade;
