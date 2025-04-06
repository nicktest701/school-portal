import React from "react";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import PropTypes from "prop-types";
import { ListItemButton, ListItemText } from "@mui/material";
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
        sx={{ paddingY: 1 }}
      >
        {item[1]?.map(({ term, level, _id }) => {
          return (
            <ListItemButton
              key={_id}
              // onClick={() => handleViewFeesDetailsByTerm(id, levelId)}
            >
              {/* {JSON.stringify(item[1])} */}
              <ListItemText
                primary={level}
                secondary={term}
                slotProps={{
                  secondary: {
                    fontSize: 13,
                    color: "primary.main",
                    fontWeight: "bold",
                  },
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      {/* <StudentFeesHistory open={openFeesHistory} setOpen={setOpenFeesHistory} /> */}
    </>
  );
};

export default StudentFeeReportListItem;
