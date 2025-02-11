import React from "react";
import {
  List,
  ListSubheader,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";


const StudentAcademicReportListItem = ({ item }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleViewExamsDetailsByTerm = (id) => {
    setSearchParams((params) => {
      params.set("report", id);
      return params;
    });
  };
  return (
    <>
      <List
        subheader={
          <ListSubheader sx={{ color: "primary.main", bgcolor: "whitesmoke" }}>
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
                  color: "primary.main",
                  fontWeight: "bold",
                }}
              />

            </ListItemButton>
          );
        })}
      </List>
    </>
  );
};
StudentAcademicReportListItem.propTypes = {
  item: PropTypes.array,
};

export default StudentAcademicReportListItem;
