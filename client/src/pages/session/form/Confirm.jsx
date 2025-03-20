import React from "react";
import { Button, Paper, Typography } from "@mui/material";

const Confirm = ({ isPending }) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5">Confirm</Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        fontStyle="italic"
        mb={2}
      >
        Please review the details you have provided before proceeding. Ensure
        all information is accurate, as this will be used for further
        processing. If any changes are needed, go back and update the necessary
        fields.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        loading={isPending}
        // onClick={}
        type="submit"
      >
        {isPending ? "Please Wait.." : "Create Session"}
      </Button>
    </Paper>
  );
};

export default Confirm;
