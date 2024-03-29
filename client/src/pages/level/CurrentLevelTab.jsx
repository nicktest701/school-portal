import React from 'react';
import { Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { STUDENTS_COLUMN } from '../../mockup/columns/studentColumns';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import { EMPTY_IMAGES } from '../../config/images';
import EmptyDataContainer from '../../components/EmptyDataContainer';
import FileDialog from '../../components/modals/FileDialog';
import useLevelById from '../../components/hooks/useLevelById';
import student_icon from '../../assets/images/header/student_ico.svg';
import SummarizeRoundedIcon from '@mui/icons-material/SummarizeRounded';
import { useState } from 'react';

import AttendanceHistory from './AttendanceHistory';
import { History } from '@mui/icons-material';

const CurrentLevelTab = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [openAttendanceHistory, setOpenAttendanceHistory] = useState(false);

  //Get Students in Current Level id
  const { students, rollNumber, levelLoading } = useLevelById(id);

  // useEffect(() => {
  //   if (students) {
  //     const modifiedStudents = students.map((stud) => {
  //       return {
  //         _id: stud?._id,
  //         profile: stud?.profile,
  //         fullName: stud?.fullName,
  //         status: 'present',
  //       };
  //     });

  //     localStorage.setItem(id, JSON.stringify(modifiedStudents));
  //   }
  // }, [id, students]);

  // //Go to student profile
  // const handleGotoNewStudent = () => {
  //   navigate(`/level/student/new`, {
  //     state: {
  //       id,
  //       type,
  //     },
  //   });
  // };

  //Go to student profile
  // const handleGotoStudentProfile = (rowData) => {
  //   const id = rowData.levelId;
  //   const type = rowData.levelName;
  //   navigate(`/student/profile/${id}/${type}/${rowData._id}`, {
  //     state: {
  //       id,
  //       type,
  //     },
  //   });
  // };

  const handleOpenAttendance = () => {
    navigate(`/level/attendance/${id}/${type}`);
  };

  const attendanceAction = [
    {
      icon: () => <SummarizeRoundedIcon />,
      position: 'toolbar',
      tooltip: 'New Attendance',
      onClick: handleOpenAttendance,
      isFreeAction: true,
    },
    {
      icon: () => <History />,
      position: 'toolbar',
      tooltip: 'Attendance History',
      onClick: () => setOpenAttendanceHistory(true),
      isFreeAction: true,
    },
  ];

  return (
    <>
      <Container>
        {students?.length === 0 ? (
          <EmptyDataContainer
            img={EMPTY_IMAGES.student}
            message='😑 No Student available.Add your first student to this level'
            buttonText='New Student'
            // onClick={handleGotoNewStudent}
          />
        ) : (
          <CustomizedMaterialTable
            search={true}
            isLoading={levelLoading}
            title={type}
            subtitle={`${rollNumber} Students`}
            exportFileName={type || ''}
            columns={STUDENTS_COLUMN}
            data={students}
            actions={[...attendanceAction]}
            // showImportButton={true}
            // importButtonText="Import Students"
            icon={student_icon}
            // onRowClick={handleGotoStudentProfile}
          />
        )}
      </Container>
      {/* <NewAttendance
        open={openAttendance}
        setOpen={setOpenAttendance}
        student={students}
      /> */}
      <AttendanceHistory
        open={openAttendanceHistory}
        setOpen={setOpenAttendanceHistory}
      />
      <FileDialog />
    </>
  );
};

export default CurrentLevelTab;
