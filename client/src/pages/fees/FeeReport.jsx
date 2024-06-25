import { SchoolRounded } from '@mui/icons-material';
import { Avatar, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import _ from 'lodash';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import { STUDENT_FEES_HISTORY_COLUMNS } from '../../mockup/columns/sessionColumns';
import history_icon from '../../assets/images/header/history_ico.svg';
const school_info = JSON.parse(localStorage.getItem('@school_info'));
function FeeReport({ student }) {
  return (
    <div>
      <Stack
        spacing={1}
        sx={{
          maxWidth: '8.5in',
          minHeight: '11in',
          margin: 'auto',
          padding: '8px',
        }}
      >
        {/* school details */}
        <Stack
          direction='row'
          justifyContent='flex-start'
          alignItems='center'
          columnGap={2}
          pb={2}
        >
          {school_info?.badge ? (
            <Avatar
              alt='school logo'
              loading='lazy'
              srcSet={`${import.meta.env.VITE_BASE_URL}/images/users/${
                school_info?.badge
              }`}
              sx={{
                width: 40,
                height: 40,
              }}
            />
          ) : (
            <SchoolRounded sx={{ width: 40, height: 40 }} />
          )}
          <Stack justifyContent='flex-start' alignItems='flex-start'>
            <Typography variant='h6'>
              {_.startCase(school_info?.name)}
            </Typography>
            <Typography variant='caption'>{school_info?.address}</Typography>
            <Typography variant='caption'>{school_info?.location}</Typography>
            <Typography variant='caption' fontStyle='italic'>
              {school_info?.motto}
            </Typography>
          </Stack>
        </Stack>
        <Divider/>
        <Typography
          paragraph
          sx={{
            textAlign: 'center',
            textDecoration: 'underline',
            color: 'primary',
            width: '100%',
            padding: '4px',
          }}
          variant='h6'
        >
          Fees Report
        </Typography>

        {/* avatar */}
        <Stack justifyContent='center' alignItems='center' spacing={1} pt={2}>
          <Avatar
            src={
              student?.profile === '' ||
              student?.profile === undefined ||
              student?.profile === null
                ? null
                : student?.profile
              // : `${import.meta.env.VITE_BASE_URL}/images/students/${
              //     student?.profile
              //   }`
            }
            sx={{ width: 40, height: 40, alignSelf: 'center' }}
          />
          <Typography >{student?.fullName}</Typography>
          <Typography variant='caption'>
            {student?.levelType}
            {/* {student?.term} */}
          </Typography>
        </Stack>

        <div style={{ flexGrow: 1 }}>
          <CustomizedMaterialTable
            title='Fees History'
            icon={history_icon}
            addButtonImg={history_icon}
            addButtonMessage='No Fees History Found'
            exportFileName={student?.fullName}
            columns={STUDENT_FEES_HISTORY_COLUMNS}
            data={student?.payment}
            actions={[]}
            options={{
              paging: false,
              selection: false,
              columnsButton: false,
            }}
            style={{
              border: 'none',
            }}
          />
        </div>

        <Typography
          style={{
            fontSize: '10px',
            fontStyle: 'italic',
          }}
        >
          Powered by FrebbyTech Consults (0543772591)
        </Typography>
      </Stack>
    </div>
  );
}

export default FeeReport;
