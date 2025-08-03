import React from "react";
import {
  List,
  ListSubheader,
  ListItemText,
  ListItem,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate, useSearchParams } from "react-router-dom";

const StudentAcademicReportListItem = ({ item }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(item);

  const handleViewExamsDetailsByTerm = (id) => {
    navigate(`/academics/result/${id}`);
    // setSearchParams((params) => {
    //   params.set("report", id);
    //   return params;
    // });
  };
  return (
    <>
      <List
        subheader={
          <ListSubheader
            sx={{ color: "secondary.main", bgcolor: "primary.main" }}
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
              onClick={() => handleViewExamsDetailsByTerm(_id)}
              secondaryAction={<Button>View</Button>}
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
