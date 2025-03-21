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
  Button,
} from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";
import { gradeColor } from "@/config/gradeColor";

const GradeTable = ({ data, removeGrade }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Highest Mark</TableCell>
            <TableCell>Lowest Mark</TableCell>
            <TableCell>Grade</TableCell>
            <TableCell>Remarks</TableCell>
            {removeGrade && <TableCell>Action</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.highestMark}</TableCell>
              <TableCell>{row.lowestMark}</TableCell>
              <TableCell>{row.grade}</TableCell>
              <TableCell>
                <Button
                  size="small"
                  sx={{
                    px: 2,
                    mr: 4,
                    bgcolor: gradeColor(row.highestMark).bg,
                    color: gradeColor(row.highestMark).color,
                  }}
                >
                  {row.remarks}
                </Button>
              </TableCell>
              {removeGrade && (
                <TableCell>
                  <IconButton onClick={() => removeGrade(row.id)}>
                    <DeleteRounded color="error" />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GradeTable;
