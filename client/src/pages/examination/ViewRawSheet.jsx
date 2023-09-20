import { Autocomplete, Dialog, DialogContent, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getSubjectsForLevel } from '../../api/levelAPI';
import MaterialTable from 'material-table';
import { tableIcons } from '../../config/tableIcons';

const ViewRawSheet = ({ open, setOpen, students }) => {
  const { levelId } = useParams();

  const [data, setData] = useState([]);
  const [subject, setSubject] = useState('English Language');

  const subjects = useQuery(
    ['subjects', levelId],
    () => getSubjectsForLevel(levelId),
    {
      enabled: !!levelId,
    }
  );

  useEffect(() => {
    const modifiedStudents = students?.map(({ _id, fullName }) => {
      return {
        _id,
        fullName,
      };
    });

    setData(modifiedStudents);
  }, [students]);

  return (
    <Dialog open={open} maxWidth='lg' fullScreen>
      <CustomDialogTitle title='Score Sheet' onClose={() => setOpen(false)} />
      <DialogContent>
        <Autocomplete
          options={subjects?.data?.subjects}
          loading={subjects.isLoading}
          getOptionLabel={(option) => option || ''}
          isOptionEqualToValue={(option, value) =>
            value === undefined || value === '' || value === option
          }
          value={subject}
          onChange={(e, value) => setSubject(value)}
          sx={{ minWidth: 300, py: 3 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Subject'
              size='small'
              sx={{
                maxWidth: 300,
              }}
              // error={fieldError !== ''}
              // helperText={fieldError}
              required
              FormHelperTextProps={{
                sx: {
                  color: 'error.main',
                },
              }}
            />
          )}
        />

        <MaterialTable
          exportFileName={subject}
          icons={tableIcons}
          columns={[
            {
              title: 'No',
              render: (rowData) => rowData.tableData.id + 1,
              width: 50,
            },
            {
              title: 'ID',
              field: '_id',
              export: true,
              hidden: true,
            },
            {
              title: 'Student',
              field: 'fullName',
              width: 300,
            },
            {
              title: 'Class  Score',
              field: 'classScore',
            },
            {
              title: 'Exams  Score',
              field: 'examsScore',
            },
            {
              title: 'Total  Score',
              field: 'totalScore',
            },
            // {
            //   title: 'Position',
            //   field: 'position',
            // },
            {
              title: 'Grade',
              field: 'grade',
            },
          ]}
          data={data ?? []}
          title={subject}
          options={{
            search: false,
            exportAllData: true,
            exportButton: true,
            pageSize: 10,
            paginationType:'stepped',
            pageSizeOptions: [10, 20, 40, 60, 100],
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ViewRawSheet;
