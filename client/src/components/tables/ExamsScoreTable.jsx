import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
} from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";

const ExamsScoreTable = ({ data, setData }) => {

  const title = {
    subject: "Subject",
    classScore: "Class Score",
    examsScore: "Exams Score",
    totalScore: "Total",
    grade: "Grade",
    remarks: "Remarks",
  };

  //Remove Subject from Score List
  const handleRemoveSubject = (id) => {
    setData((prev) => {
      const filteredScoreList = prev.filter(({ _id }) => _id !== id);
      return filteredScoreList;
    });
  };

  return (
    <Box sx={{ maxWidth: { xs: "100%", md: "100%" }, overflowX: "auto" }}>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              {Object.values(title).map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {Object.keys(title).map((key) => (
                  <TableCell key={key} sx={{ fontSize: 12 }}>
                    {row[key]}
                  </TableCell>
                ))}
                <TableCell>
                  <IconButton onClick={() => handleRemoveSubject(row._id)}>
                    <DeleteRounded color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ExamsScoreTable;
