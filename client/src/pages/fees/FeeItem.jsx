import {
  Button,
  Divider,
  ListItem,
  ListItemText,
} from "@mui/material";
import React from "react";
import { currencyFormatter } from "@/config/currencyFormatter";

const FeeItem = ({ data, removeFee }) => {
  return (
    <>
      <ListItem
        secondaryAction={
          <Button
            size="small"
            sx={{ cursor: "pointer" }}
            onClick={() => removeFee(data?.fee)}
          >
            Remove
          </Button>
        }
      >
        <ListItemText secondary={data?.fee} />
        <ListItemText secondary={currencyFormatter(data.amount)} />
      </ListItem>
      <Divider />
    </>
  );
};

export default FeeItem;
