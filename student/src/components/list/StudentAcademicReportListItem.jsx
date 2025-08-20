import React from "react";
import {
  List,
  ListSubheader,
  ListItemText,
  ListItem,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const StudentAcademicReportListItem = ({ item }) => {
  const navigate = useNavigate();

  const handleViewExamsDetailsByTerm = (id) => {
    navigate(`/academics/result/${id}`);
  };
  return (
    <>
      <List
        subheader={
          <ListSubheader
            sx={{
              color: "#ffffff",
              background: "linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)",
            }}
          >
            {item[0]}
          </ListSubheader>
        }
        sx={{ paddingY: 1 }}
      >
        {item[1]?.map(({ term, _id, levelName }) => {
          return (
            <ListItem
              key={_id}
              secondaryAction={<Button>View</Button>}
              onClick={() => handleViewExamsDetailsByTerm(_id)}
              sx={{
                "&:hover": {
                  backgroundColor: "whitesmoke",
                  cursor: "pointer",
                },
              }}
            >
              <ListItemText
                primary={levelName}
                secondary={term}
                slotProps={{
                  secondary: {
                    fontSize: 13,
                    color: "primary.main",
                    fontWeight: "bold",
                  },
                }}
              />
            </ListItem>
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
