import React, { useState } from "react";
import _ from "lodash";
import { v4 as uuid } from "uuid";

import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Stack,
  Link,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import * as XLSX from "xlsx";
import { gradeColor } from "@/config/gradeColor";
import { downloadTemplate } from "@/api/userAPI";

const Grade = ({ setValue, data }) => {
  const [uploadedFiles, setUploadedFiles] = useState(data?.ratings);
  const [filteredData, setFilteredData] = useState(data?.ratings);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      parseFile(uploadedFile);
    }
  };

  // Parse Excel/CSV file
  const parseFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
        header: 1,
      });

      if (sheetData.length > 0) {
        // Function to filter out empty or undefined rows

        const modifiedGrades = sheetData.filter((row) =>
          Object.values(row).some(
            (value) => value !== undefined && value !== ""
          )
        );

        const headers = modifiedGrades[0].map((header) => _.camelCase(header));
        const rows = modifiedGrades.slice(1);

        const results = rows.map((row) => {
          const rowData = {};
          headers.forEach((header, index) => {
            rowData.id = rowData[header] = row[index];
          });
          return rowData;
        });

        setFilteredData(results);
        setUploadedFiles(results);
        setValue("exams.grade", {
          name: uuid(),
          ratings: results,
        });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Delete a file from the list
  const handleDeleteFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
    setValue(
      "exams.grade",

      { name: uuid(), ratings: uploadedFiles.filter((_, i) => i !== index) }
    );
  };

  // Clear all uploaded data
  const handleClearAll = () => {
    setUploadedFiles([]);
    setValue("exams.grade", {});
  };

  // Handle Search Functionality
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setFilteredData(uploadedFiles);
    } else {
      const filteredResults = uploadedFiles.filter((row) =>
        Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(query)
        )
      );
      setFilteredData(filteredResults);
    }
  };

  const handleDownloadTemplate = async () => {
    await downloadTemplate("grades");
  };

  return (
    <Paper sx={{ p: 2, boxShadow: 1, borderRadius: 2 }}>
      <Typography variant="h6" fontWeight="bold">
        Grading System (optional)
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Define and customize grade thresholds, assign weightage to assessments,
        and configure automated grade calculations.
      </Typography>

      <Stack spacing={2} py={2} justifyContent="center">
        <TextField
          type="file"
          accept=".csv,.xlsx"
          label="Select File"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          inputProps={{
            accept: ".xlsx,.xls,.csv",
          }}
          fullWidth
          onChange={handleFileChange}
        />
        <Link
          sx={{ cursor: "pointer", alignSelf: "start" }}
          onClick={handleDownloadTemplate}
          variant="caption"
        >
          Download Grade template here
        </Link>
      </Stack>
      {data?.ratings?.length > 0 && (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            py={2}
          >
            <h3>Selected Files</h3>
            <Button
              onClick={handleClearAll}
              variant="contained"
              color="secondary"
              style={{ marginTop: 10 }}
            >
              Clear All
            </Button>
          </Stack>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search..."
            onChange={handleSearch}
            InputProps={{ startAdornment: <SearchIcon /> }}
            sx={{ my: 2 }}
          />

          <TableContainer
            component={Paper}
            sx={{ maxHeight: 500, overflowY: "auto" }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Highest Mark</TableCell>
                  <TableCell>Lowest Mark</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Remarks</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData?.map((row, index) => (
                  <TableRow
                    sx={{
                      transition: "all 0.3s ease-in-out",
                    }}
                    key={index}
                  >
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
                    <TableCell>
                      <IconButton onClick={() => handleDeleteFile(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Paper>
  );
};

export default Grade;
