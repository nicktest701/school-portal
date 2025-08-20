import React from "react";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import { ListItemButton, ListItemText } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const StudentFeeReportListItem = ({ item }) => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  //View Student Current fee info
  const handleViewFeesDetailsByTerm = (feeId) => {
    navigate(`/student/view/${studentId}/fees?fid=${feeId}`, {
      state: {
        prevPath: `/student/view/${studentId}`,
      },
    });
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
              onClick={() => handleViewFeesDetailsByTerm(_id, level)}
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
