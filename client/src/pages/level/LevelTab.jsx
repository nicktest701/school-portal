import React, { useContext, useState } from 'react';
import Delete from '@mui/icons-material/Delete';
import {  Box, Link, Stack,  useTheme } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import AddLevel from './AddLevel';
import { SCHOOL_LEVELS } from '../../mockup/columns/sessionColumns';
import AddCurrentSubjects from '../../components/modals/AddCurrentSubjects';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import { useNavigate } from 'react-router-dom';
import { deleteLevel } from '../../api/levelAPI';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import { EMPTY_IMAGES } from '../../config/images';
import useLevel from '../../components/hooks/useLevel';
import { UserContext } from '../../context/providers/userProvider';
import level_icon from '../../assets/images/header/level_ico.svg';


const LevelTab = () => {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const {
    userState: { session },
  } = useContext(UserContext);

  const navigate = useNavigate();
  const { palette } = useTheme();
  const queryClient = useQueryClient();

  const [openAddCurrentLevel, setOpenAddCurrentLevel] = useState(false);
  const [openAddSubjects, setOpenAddSubjects] = useState(false);

  //Get Session id

  const { levelsOption, levelLoading, levelRefetch } = useLevel();
  const { mutateAsync } = useMutation(deleteLevel);

  const handleDeleteLevel = (id) => {
    const values = {
      id,
      sessionId: session?.sessionId,
      termId: session?.termId,
    };
    Swal.fire({
      title: 'Removing Level',
      text: 'Do you want to remove level?',
      confirmButtonColor: palette.primary.main,
      showCancelButton: true,
      backdrop: false,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutateAsync(values, {
          onSettled: () => {
            queryClient.invalidateQueries(['levels']);
          },
          onSuccess: (data) => {
            schoolSessionDispatch({
              type: 'showAlert',
              payload: {
                severity: 'info',
                message: data,
              },
            });
          },
          onError: (error) => {
            schoolSessionDispatch({
              type: 'showAlert',
              payload: {
                severity: 'error',
                message: error,
              },
            });
          },
        });
      }
    });
  };

  const newLevelColumns = [
    ...SCHOOL_LEVELS,
    {
      field: null,
      title: 'Class',
      width: '40%',
      render: (rowData) => (
        <Stack direction='row' spacing={5}>
          <Link
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              navigate(`/level/current/${rowData._id}/${rowData.type}`, {
                replace: true,
                state: {
                  levelId: rowData._id,
                  levelName: rowData.type,
                },
              });
            }}
          >
            Go to Class
          </Link>
          <Link
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              schoolSessionDispatch({
                type: 'currentLevel',
                payload: rowData,
              });
              // //console.log(rowData);
              setOpenAddSubjects(true);
            }}
          >
            Add Subjects
          </Link>
        </Stack>
      ),
    },
    {
      field: null,
      title: '',
      render: (rowData) => (
        <Delete
          className='ico'
          sx={{ cursor: 'pointer' }}
          onClick={() => handleDeleteLevel(rowData._id)}
        />
      ),
    },
  ];

  return (
    <Box pt={2}>
      <CustomizedMaterialTable
        title='Levels'
        icon={level_icon}
        search={true}
        isLoading={levelLoading}
        columns={newLevelColumns}
        data={levelsOption}
        actions={[]}
        showAddButton={true}
        addButtonText='New Level'
        addButtonImg={EMPTY_IMAGES.level}
        addButtonMessage="😑 Oops! It seems you don't have any level at the moment.Create a new one"
        onAddButtonClicked={() => setOpenAddCurrentLevel(true)}
        handleRefresh={levelRefetch}
      />
      <AddLevel open={openAddCurrentLevel} setOpen={setOpenAddCurrentLevel} />
      <AddCurrentSubjects open={openAddSubjects} setOpen={setOpenAddSubjects} />
    </Box>
  );
};

export default LevelTab;
