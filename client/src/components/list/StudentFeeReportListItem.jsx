import React, { useContext, useState } from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import PropTypes from 'prop-types';
import { StudentContext } from '../../context/providers/StudentProvider';
import StudentFeesHistory from '../../pages/fees/StudentFeesHistory';
import { ListItemButton, ListItemText } from '@mui/material';

const StudentFeeReportListItem = ({ item, studentId }) => {
  const { studentDispatch } = useContext(StudentContext);

  const [openFeesHistory, setOpenFeesHistory] = useState(false);

  //View Student Current fee info

  const handleViewFeesDetailsByTerm = (feeId, level) => {
    studentDispatch({
      type: 'setCurrentStudentFeeInfo',
      payload: {
        id: studentId,
        level: level,
        feeId,
      },
    });
    setOpenFeesHistory(true);
  };

  return (
    <>
      <List
        subheader={
          <ListSubheader
            sx={{
              bgcolor: 'primary.main',
              color: 'secondary.main',
            }}
          >
            {item[0]}
          </ListSubheader>
        }
      >
        {item[1]?.map(({ term, levelId, levelType, id }) => {
          return (
            <>
              <ListItemButton
                key={id}
                onClick={() => handleViewFeesDetailsByTerm(id, levelId)}
              >
                <ListItemText
                  primary={levelType}
                  secondary={term}
                  primaryTypographyProps={{
                    fontSize: 14,
                  }}
                  secondaryTypographyProps={{
                    fontSize: 13,
                    color: 'primary.main',
                    fontWeight: 'bold',
                  }}
                />
              </ListItemButton>
            </>
          );
        })}
      </List>

      <StudentFeesHistory open={openFeesHistory} setOpen={setOpenFeesHistory} />
    </>
  );
};

StudentFeeReportListItem.propTypes = {
  item: PropTypes.array,
  studentId: PropTypes.string,
};

export default StudentFeeReportListItem;
