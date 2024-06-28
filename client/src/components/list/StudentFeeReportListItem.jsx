import React from "react";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import PropTypes from "prop-types";
import { ListItemButton, ListItemText } from "@mui/material";
import { v4 as uuid } from "uuid";
import { useSearchParams, useNavigate } from "react-router-dom";

const StudentFeeReportListItem = ({ item }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  //View Student Current fee info
  const handleViewFeesDetailsByTerm = (feeId, level) => {
    navigate(
      `/fee/payment/student?level_id=${level}&_id=${searchParams.get(
        "_id"
      )}&fid=${feeId}`,
      {
        state: {
          prevPath: "/fee/history",
        },
      }
    );
  };

  return (
    <>
      <List
        subheader={
          <ListSubheader
            sx={{
              bgcolor: "primary.main",
              color: "secondary.main",
            }}
          >
            {item[0]}
          </ListSubheader>
        }
      >
        {item[1]?.map(({ term, levelId, levelType, id }) => {
          const uniqueId = uuid();

          return (
            <>
              <ListItemButton
                key={uniqueId}
                onClick={() => handleViewFeesDetailsByTerm(id, levelId)}
              >
                <ListItemText
                  primary={levelType}
                  secondary={term}
                  // primaryTypographyProps={{
                  //   fontSize: 14,
                  // }}
                  secondaryTypographyProps={{
                    fontSize: 13,
                    color: "primary.main",
                    fontWeight: "bold",
                  }}
                />
              </ListItemButton>
            </>
          );
        })}
      </List>

      {/* <StudentFeesHistory open={openFeesHistory} setOpen={setOpenFeesHistory} /> */}
    </>
  );
};

StudentFeeReportListItem.propTypes = {
  item: PropTypes.array,
  studentId: PropTypes.string,
};

export default StudentFeeReportListItem;
