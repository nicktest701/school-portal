import { Typography } from "@mui/material";
import React from "react";

const StudentFooter = () => {
  return (
    <footer>
          <Typography variant='body2'>
            Copyright &copy; {new Date().getFullYear()}| FrebbyTech Consults
          </Typography>
        </footer>
  );
};

export default StudentFooter;
