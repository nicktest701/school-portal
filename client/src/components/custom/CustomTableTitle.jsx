import React from "react";
import { ListItemText, Stack } from "@mui/material";
import PropTypes from "prop-types";
function CustomTableTitle({ title, subtitle }) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      columnGap={1}
      justifyContent="center"
      alignItems="center"
      p={2}
      className="hide-on-print"
    >
      <ListItemText
        primary={title}
        primaryTypographyProps={{
          fontSize: { xs: 18, sm: 20 },
          fontWeight: "bold",
        }}
        secondary={subtitle}
      />
    </Stack>
  );
}

CustomTableTitle.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
export default CustomTableTitle;
