
import { Outlet } from 'react-router-dom';
import TeacherEdit from './TeacherEdit';
import TeacherView from './TeacherView';

const Teacher = () => {
  return (
    <>
      <Outlet />
      <TeacherView />
      <TeacherEdit />
    </>
  );
};

export default Teacher;
