import React, { useContext } from 'react';
import {
  List,
  ListSubheader,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import PropTypes from 'prop-types';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';

const StudentAcademicReportListItem = ({ item }) => {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  const handleViewExamsDetailsByTerm = (id) => {
    schoolSessionDispatch({
      type: 'openViewExamsRecord',
      payload: { open: true, id },
    });
  };
  return (
    <List
      subheader={
        <ListSubheader
          sx={{ bgcolor: 'primary.main', color: 'secondary.main' }}
        >
          {item[0]}
        </ListSubheader>
      }
      sx={{ paddingY: 1 }}
    >
      {item[1]?.map(({ term, _id, levelName }) => {
        return (
          <ListItemButton
            key={_id}
            onClick={() => handleViewExamsDetailsByTerm(_id)}
          >
            <ListItemText
              primary={levelName}
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
        );
      })}
    </List>
  );
};
StudentAcademicReportListItem.propTypes = {
  item: PropTypes.array,
};

export default StudentAcademicReportListItem;
