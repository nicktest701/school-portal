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
} from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";

const title = {
  subject: "Subject",
  classScore: "Class",
  examsScore: "Exams",
  totalScore: "Total",
  grade: "Grade",
  remarks: "Remarks",
};

const ExamsScoreTable = ({ data, setData }) => {
  //Remove Subject from Score List
  const handleRemoveSubject = (id) => {
    setData((prev) => {
      const filteredScoreList = prev.filter(
        ({ subject }) => subject?._id !== id
      );
      return filteredScoreList;
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {Object.values(title).map((header, index) => (
              <TableCell key={index}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {Object.keys(title).map((key) => (
                <TableCell key={key}>{row[key]}</TableCell>
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
  );
};

export default ExamsScoreTable;
