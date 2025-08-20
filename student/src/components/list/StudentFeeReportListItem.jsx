import React from "react";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import { Button, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

const StudentFeeReportListItem = ({ item }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  //View Student Current fee info
  const handleViewFees = () => {
    navigate(`/fees/payment/${user?._id}`, {
      state: {
        prevPath: "/fees/payment",
      },
    });
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
        {item[1]?.map(({ term, level, _id }) => {
          return (
            <ListItem
              key={_id}
              secondaryAction={<Button>View</Button>}
              onClick={handleViewFees}
              sx={{
                "&:hover": {
                  backgroundColor: "whitesmoke",
                  cursor:'pointer'
                },
              }}
            >
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
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default StudentFeeReportListItem;
